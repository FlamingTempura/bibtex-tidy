import { Options, normalizeOptions, OptionsNormalized } from './optionUtils';
import {
	generateAST,
	EntryNode,
	BlockNode,
	TextNode,
	RootNode,
} from './bibtex-parser';
import { convertCRLF } from './utils';
import { formatValue, formatBibtex } from './format';
import { sortEntries, sortEntryFields } from './sort';
import { checkForDuplicates } from './duplicates';

export type Warning = {
	code: 'MISSING_KEY' | 'DUPLICATE_KEY' | 'DUPLICATE_ENTRY';
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
			message: `${entry.type} entry does not have an entry key.`,
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

	const bibtex = formatBibtex(ast, options);

	return { bibtex, warnings, count: getEntries(ast).length };
}

function isEntryNode(
	node: TextNode | BlockNode
): node is BlockNode & { block: EntryNode } {
	return node.type !== 'text' && node.block?.type === 'entry';
}

export function getEntries(ast: RootNode): EntryNode[] {
	return ast.children.filter(isEntryNode).map((node) => node.block);
}

function generateValueLookup(
	ast: RootNode,
	options: OptionsNormalized
): Map<EntryNode, Map<string, string | undefined>> {
	return new Map(
		getEntries(ast).map((entry) => [
			entry,
			new Map(
				entry.fields.map((field) => [
					field.name.toLocaleLowerCase(),
					formatValue(field, options),
				])
			),
		])
	);
}

export default { tidy };
