import {
	Options,
	normalizeOptions,
	OptionsNormalized,
	DuplicateRule,
} from './optionUtils';
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
import { parseAuthors } from './parseAuthors';

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
		? generateKeys(ast, valueLookup)
		: undefined;

	const bibtex = formatBibtex(ast, options, newKeys);

	return { bibtex, warnings, count: getEntries(ast).length };
}

function generateKeys(
	ast: RootNode,
	valueLookup: Map<EntryNode, Map<string, string | undefined>>
): Map<EntryNode, string> {
	const keys = new Map<EntryNode, string>();
	const keyCounts = new Map<string, number>();
	for (const node of ast.children) {
		if (isEntryNode(node)) {
			const newKey = generateKey(valueLookup.get(node.block));
			if (newKey) {
				const keyCount = (keyCounts.get(newKey) ?? 0) + 1;
				keys.set(node.block, newKey + (keyCount > 1 ? keyCount : ''));
				keyCounts.set(newKey, keyCount);
			}
		}
	}
	return keys;
}

function generateKey(
	valueLookup: Map<string, string | undefined> | undefined
): string | undefined {
	const authors = parseAuthors(
		valueLookup?.get('author')?.replace(/["{}]/g, '') ?? ''
	);
	const lastName = authors[0]?.lastName.toLowerCase();
	const year = valueLookup?.get('year')?.replace(/[^0-9]/g, '');
	const title = valueLookup?.get('title') ?? valueLookup?.get('booktitle');
	const titleFirstWord = title
		?.toLowerCase()
		.replace(/^.*?([a-z]+)[^a-z].*$/s, '$1');
	if (!lastName || !year) return;
	return [lastName, year, titleFirstWord ?? ''].join('');
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
