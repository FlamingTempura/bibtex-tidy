import { ASTProxy } from "./cache";
import { formatBibtex } from "./format";

import { normalizeOptions } from "./optionUtils";
import type { DuplicateRule, Options, OptionsNormalized } from "./optionUtils";
import {
	type EntryNode,
	type RootNode,
	parseBibTeX,
} from "./parsers/bibtexParser";
import { generateTransformationPipeline } from "./pipeline";
import { convertCRLF, isEntryNode } from "./utils";

export type Warning = (
	| { code: "MISSING_KEY" }
	| { code: "DUPLICATE_ENTRY"; rule: DuplicateRule }
) & {
	message: string;
};

export type BibTeXTidyResult = {
	bibtex: string;
	warnings: Warning[];
	count: number;
};

export function tidy(input: string, options_: Options = {}): BibTeXTidyResult {
	const options = normalizeOptions(options_);
	const inputFixed = convertCRLF(input);
	const ast = parseBibTeX(inputFixed);
	const entries = getEntries(ast);

	const warnings: Warning[] = entries
		.filter((entry) => !entry.key)
		.map((entry) => ({
			code: "MISSING_KEY",
			message: `${entry.parent.command} entry does not have a citation key.`,
		}));

	const cache = new ASTProxy(ast, options);
	const pipeline = generateTransformationPipeline(options);

	for (const transformation of pipeline) {
		if (!("type" in transformation)) {
			const result = transformation.apply(cache);
			if (result) warnings.push(...result);
		} else if (transformation.type === "RootModifier") {
			const params = transformation.condition(options);
			if (!params) continue;
			//@ts-expect-error
			const result = transformation.modifyRoot(ast, cache, params);
			if (result) warnings.push(...result);
		} else {
			for (const entry of entries) {
				for (const field of entry.fields) {
					const params = transformation.condition(
						field.name.toLocaleLowerCase(),
						options,
						entry,
						cache,
					);
					if (!params) continue;
					if (transformation.modifyNode) {
						//@ts-expect-error
						transformation.modifyNode(field, params);
						cache.invalidateEntryValue(entry, field.name);
					}
					for (const node of field.value.concat) {
						if (node.type === "braced" || node.type === "quoted") {
							if (transformation.modifyRenderedValue) {
								const newValue = transformation.modifyRenderedValue(
									node.value,
									//@ts-expect-error
									params,
								);
								if (newValue !== node.value) {
									node.value = newValue;
									cache.invalidateEntryValue(entry, field.name);
								}
							}
						}
					}
				}
			}
		}
	}

	const bibtex = formatBibtex(ast, options);

	return { bibtex, warnings, count: entries.length };
}
export function getEntries(ast: RootNode): EntryNode[] {
	return ast.children.filter(isEntryNode).map((node) => node.block);
}
