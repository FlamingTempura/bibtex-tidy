import { Cache } from "./cache";
import { checkForDuplicates } from "./duplicates";
import { formatBibtex } from "./format";
import { generateKeys } from "./generateKeys";
import { normalizeOptions } from "./optionUtils";
import type { DuplicateRule, Options } from "./optionUtils";
import {
	type EntryNode,
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
