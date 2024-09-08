import { Cache } from "./cache";
import { checkForDuplicates } from "./duplicates";
import { formatBibtex } from "./format";
import { generateKeys } from "./generateKeys";
import { abbreviateMonthsModifier } from "./modifiers/abbreviateMonthsModifier";
import { dropAllCapsModifier } from "./modifiers/dropAllCapsModifier";
import { encodeUrlsModifier } from "./modifiers/encodeUrlsModifier";
import { escapeCharactersModifier } from "./modifiers/escapeCharactersModifier";
import { formatPageRangeModifier } from "./modifiers/formatPageRangeModifier";
import { limitAuthorsModifier } from "./modifiers/limitAuthorsModifier";
import { removeBracesModifier } from "./modifiers/removeBracesModifier";
import { stripEnclosingBracesModifier } from "./modifiers/stripEnclosingBracesModifier";
import { normalizeOptions } from "./optionUtils";
import type { DuplicateRule, Options } from "./optionUtils";
import {
	type EntryNode,
	LiteralNode,
	type RootNode,
	parseBibTeX,
} from "./parsers/bibtexParser";
import { sortEntries, sortEntryFields } from "./sort";
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

	const cache = new Cache(options);

	const valueModifiers = [
		encodeUrlsModifier,
		limitAuthorsModifier,
		escapeCharactersModifier,
		dropAllCapsModifier,
		formatPageRangeModifier,
		abbreviateMonthsModifier,
		stripEnclosingBracesModifier,
		removeBracesModifier,
	];

	for (const entry of entries) {
		for (const field of entry.fields) {
			for (const modifier of valueModifiers) {
				const params = modifier.condition(
					field.name.toLocaleLowerCase(),
					options,
					entry,
					cache,
				);
				if (!params) continue;
				if (modifier.modifyNode) {
					//@ts-expect-error
					modifier.modifyNode(field, params);
					cache.invalidateEntryValue(entry, field.name);
				}
				for (const node of field.value.concat) {
					if (node.type === "braced" || node.type === "quoted") {
						if (modifier.modifyRenderedValue) {
							//@ts-expect-error
							const newValue = modifier.modifyRenderedValue(node.value, params);
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

	const duplicates = checkForDuplicates(
		entries,
		cache,
		options.duplicates,
		options.merge,
	);

	warnings.push(...duplicates.warnings);

	ast.children = ast.children.filter(
		(child) => !isEntryNode(child) || !duplicates.entries.has(child.block),
	);

	// sort needs to happen after merging all entries is complete
	if (options.sort) sortEntries(ast, cache, options.sort);

	if (options.sortFields) sortEntryFields(entries, options.sortFields);

	const newKeys = options.generateKeys
		? generateKeys(entries, cache, options.generateKeys)
		: undefined;

	const bibtex = formatBibtex(ast, options, newKeys);

	return { bibtex, warnings, count: entries.length };
}
export function getEntries(ast: RootNode): EntryNode[] {
	return ast.children.filter(isEntryNode).map((node) => node.block);
}
