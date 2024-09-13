import { ASTProxy } from "./ASTProxy";
import { formatBibtex } from "./format";
import { normalizeOptions } from "./optionUtils";
import type { Options } from "./optionUtils";
import {
	type EntryNode,
	type RootNode,
	parseBibTeX,
} from "./parsers/bibtexParser";
import { generateTransformPipeline } from "./pipeline";
import type { BibTeXTidyResult, Warning } from "./types";
import { convertCRLF, isEntryNode } from "./utils";

export function tidy(input: string, options_: Options = {}): BibTeXTidyResult {
	const options = normalizeOptions(options_);
	const inputFixed = convertCRLF(input);
	const ast = parseBibTeX(inputFixed);
	const cache = new ASTProxy(ast, options);
	const pipeline = generateTransformPipeline(options);

	const warnings: Warning[] = cache
		.entries()
		.filter((entry) => !entry.key)
		.map((entry) => ({
			code: "MISSING_KEY",
			message: `${entry.parent.command} entry does not have a citation key.`,
		}));

	for (const Transform of pipeline) {
		const result = Transform.apply(cache);
		if (result) warnings.push(...result);
	}

	const bibtex = formatBibtex(ast, options);

	return { bibtex, warnings, count: cache.entries().length };
}

/**
 * @deprecated
 */
export function getEntries(ast: RootNode): EntryNode[] {
	return ast.children.filter(isEntryNode).map((node) => node.block);
}
