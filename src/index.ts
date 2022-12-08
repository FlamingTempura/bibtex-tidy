import { generateAST, EntryNode, RootNode } from './bibtex-parser';
import { checkForDuplicates } from './duplicates';
import { formatValue, formatBibtex } from './format';
import { generateKeys } from './generateKeys';
import { normalizeOptions } from './optionUtils';
import type { Options, OptionsNormalized, DuplicateRule } from './optionUtils';
import { sortEntries, sortEntryFields } from './sort';
import { convertCRLF, isEntryNode } from './utils';

export type Warning = (
	| { code: 'MISSING_KEY' }
	| { code: 'DUPLICATE_ENTRY'; rule: DuplicateRule }
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

	input = convertCRLF(input);

	// Parse the bibtex and retrieve the items (includes comments, entries, strings, preambles)
	const ast = generateAST(input);

	const warnings: Warning[] = getEntries(ast)
		.filter((entry) => !entry.key)
		.map((entry) => ({
			code: 'MISSING_KEY',
			message: `${entry.parent.command} entry does not have a citation key.`,
		}));

	const valueLookup = generateValueLookup(ast, options);

	const duplicates = checkForDuplicates(
		ast,
		valueLookup,
		options.duplicates,
		options.merge
	);

	warnings.push(...duplicates.warnings);

	ast.children = ast.children.filter(
		(child) => !isEntryNode(child) || !duplicates.entries.has(child.block)
	);

	// sort needs to happen after merging all entries is complete
	if (options.sort) sortEntries(ast, valueLookup, options.sort);

	if (options.sortFields) sortEntryFields(ast, options.sortFields);

	const newKeys = options.generateKeys
		? generateKeys(ast, valueLookup, options.generateKeys)
		: undefined;

	const bibtex = formatBibtex(ast, options, newKeys);

	return { bibtex, warnings, count: getEntries(ast).length };
}

export function getEntries(ast: RootNode): EntryNode[] {
	return ast.children.filter(isEntryNode).map((node) => node.block);
}

function generateValueLookup(
	ast: RootNode,
	options: OptionsNormalized
): Map<EntryNode, Map<string, string>> {
	return new Map(
		getEntries(ast).map((entry) => [
			entry,
			new Map(
				entry.fields.map((field) => [
					field.name.toLocaleLowerCase(),
					formatValue(field, options) ?? '',
				])
			),
		])
	);
}

export default { tidy };
