import {
	Options,
	normalizeOptions,
	UniqueKey,
	OptionsNormalized,
} from './optionUtils';
import {
	generateAST,
	BlockNode,
	FieldNode,
	TextNode,
	EntryNode,
} from './bibtex-parser';
import {
	titleCase,
	escapeSpecialCharacters,
	alphaNum,
	wrapText,
	convertCRLF,
	unwrapText,
	addEnclosingBraces,
	escapeURL,
	removeEnclosingBraces,
	limitAuthors,
	formatPageRange,
} from './utils';

type SortIndex = Map<string, string>;

type DuplicateKeyWarning = {
	code: 'DUPLICATE_KEY';
	message: string;
};

type MissingKeyWarning = {
	code: 'MISSING_KEY';
	message: string;
};

type DuplicateEntryWarning = {
	code: 'DUPLICATE_ENTRY';
	message: string;
};

type Warning = DuplicateKeyWarning | MissingKeyWarning | DuplicateEntryWarning;

type BibTeXTidyResult = {
	bibtex: string;
	warnings: Warning[];
	entries: any[];
};

//prettier-ignore
const MONTHS: Set<string> = new Set([
	'jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'
]);

function tidy(input: string, options_: Options = {}): BibTeXTidyResult {
	const options = normalizeOptions(options_);
	const {
		omit,
		tab,
		align,
		sort,
		sortFields,
		merge,
		space,
		duplicates,
		trailingCommas,
		removeDuplicateFields,
		removeEmptyFields,
		lowercase,
	} = options;

	const indent: string = tab ? '\t' : ' '.repeat(space);
	const uniqCheck: Map<UniqueKey, boolean> = new Map();

	if (duplicates) {
		for (const key of duplicates) {
			uniqCheck.set(key, !!merge);
		}
	}

	if (!uniqCheck.has('key')) {
		// always check key uniqueness
		uniqCheck.set('key', false);
	}

	const omitFields: Set<string> = new Set(omit);

	input = convertCRLF(input);

	// Parse the bibtex and retrieve the items (includes comments, entries, strings, preambles)
	const ast = generateAST(input);

	// Set of entry keys, used to check for duplicate key warnings
	const keys: Map<string, EntryNode> = new Map();
	const dois: Map<string, EntryNode> = new Map();
	const citations: Map<string, EntryNode> = new Map();
	const abstracts: Map<string, EntryNode> = new Map();

	// Map of items to sort values e.g. { year: 2009, author: 'West', ... }
	const sortIndexes: Map<TextNode | BlockNode, SortIndex> = new Map();
	// Warnings to be output at the end
	const warnings: Warning[] = [];

	const duplicateEntries = new Set<EntryNode>();

	const fieldMaps = new Map<BlockNode, Map<string, string | undefined>>();

	for (const child of ast.children) {
		if (child.type === 'text') continue;
		const item = child.block;
		if (item?.type !== 'entry') continue;

		if (!item.key) {
			warnings.push({
				code: 'MISSING_KEY',
				message: `${item.type} entry does not have an entry key.`,
			});
		}

		const fieldMap = new Map<string, string | undefined>(
			item.fields.map((field) => [
				field.name.toLocaleLowerCase(),
				field.value?.concat.map((value) => value.value).join(' # '),
			])
		);
		fieldMaps.set(child, fieldMap);

		for (const [key, doMerge] of uniqCheck) {
			let duplicateOf: EntryNode | undefined;
			switch (key) {
				case 'key':
					if (!item.key) continue;
					duplicateOf = keys.get(item.key);
					if (!duplicateOf) keys.set(item.key, item);
					break;
				case 'doi':
					const doi = alphaNum(fieldMap.get('doi') ?? '');
					if (!doi) continue;
					duplicateOf = dois.get(doi);
					if (!duplicateOf) dois.set(doi, item);
					break;
				case 'citation':
					const ttl = fieldMap.get('title');
					const aut = fieldMap.get('author');
					if (!ttl || !aut) continue;
					const cit: string =
						alphaNum(aut.split(/,| and/)[0]) + ':' + alphaNum(ttl);
					duplicateOf = citations.get(cit);
					if (!duplicateOf) citations.set(cit, item);
					break;
				case 'abstract':
					const abstract = alphaNum(fieldMap.get('abstract') ?? '');
					const abs = abstract?.slice(0, 100);
					if (!abs) continue;
					duplicateOf = abstracts.get(abs);
					if (!duplicateOf) abstracts.set(abs, item);
					break;
			}

			if (!duplicateOf) continue;

			if (doMerge) {
				duplicateEntries.add(item);
				warnings.push({
					code: 'DUPLICATE_ENTRY',
					message: `${item.key} appears to be a duplicate of ${duplicateOf.key} and was removed.`,
					//entry: item,
					//duplicateOf,
				});
				switch (merge) {
					case 'last':
						duplicateOf.key = item.key;
						duplicateOf.fields = item.fields;
						break;
					case 'combine':
					case 'overwrite':
						for (const field of item.fields) {
							const existing = duplicateOf.fields.find(
								(f) =>
									f.name.toLocaleLowerCase() === field.name.toLocaleLowerCase()
							);
							if (!existing) {
								duplicateOf.fields.push(field);
							} else if (merge === 'overwrite') {
								existing.value = field.value;
							}
						}
						break;
					// TODO: case 'keep-both'
				}
			} else {
				warnings.push({
					code: 'DUPLICATE_KEY',
					message: `${item.key} is a duplicate entry key.`,
				});
			}
			break;
		}
	}

	// sort needs to happen after merging all entries is complete
	if (sort) {
		// comments, preambles, and strings which should be kept with an entry
		const precedingMeta: (TextNode | BlockNode)[] = [];

		// first, create sort indexes
		for (const item of ast.children) {
			if (item.type === 'text' || item.block?.type !== 'entry') {
				// if string, preamble, or comment, then use sort index of previous entry
				precedingMeta.push(item);
				continue;
			}
			const sortIndex: SortIndex = new Map();
			for (let key of sort) {
				// dash prefix indicates descending order, deal with this later
				if (key.startsWith('-')) key = key.slice(1);
				let val: string;
				if (key === 'key') {
					val = item.block.key || '';
				} else if (key === 'type') {
					val = item.command;
				} else {
					val = fieldMaps.get(item)?.get(key) ?? '';
				}
				sortIndex.set(key, val.toLowerCase());
			}
			sortIndexes.set(item, sortIndex);
			// update comments above to this index
			while (precedingMeta.length > 0) {
				sortIndexes.set(precedingMeta.pop()!, sortIndex);
			}
		}

		// Now iterate through sort keys and sort entries
		for (let i = sort.length - 1; i >= 0; i--) {
			const desc = sort[i].startsWith('-');
			const key = desc ? sort[i].slice(1) : sort[i];
			ast.children.sort((a, b) => {
				// if no value, then use \ufff0 so entry will be last
				const ia = sortIndexes.get(a)?.get(key) ?? '\ufff0';
				const ib = sortIndexes.get(b)?.get(key) ?? '\ufff0';
				return (desc ? ib : ia).localeCompare(desc ? ia : ib);
			});
		}
	}

	// output the tidied bibtex
	let bibtex: string = '';
	for (const child of ast.children) {
		if (child.type === 'text') {
			bibtex += formatComment(child.text, options);
		} else {
			if (!child.block) throw new Error('FATAL!');

			switch (child.block.type) {
				case 'preamble':
				case 'string':
					// keep preambles as they were
					bibtex += `${child.block.raw}\n`;
					break;

				case 'comment':
					bibtex += formatComment(child.block.raw, options);
					break;

				case 'entry':
					if (duplicateEntries.has(child.block)) continue;

					const itemType = lowercase
						? child.command.toLocaleLowerCase()
						: child.command;
					bibtex += `@${itemType}{`;
					if (child.block.key) bibtex += `${child.block.key},`;

					if (sortFields) {
						child.block.fields.sort((a, b) => {
							const orderA = sortFields.indexOf(a.name.toLocaleLowerCase());
							const orderB = sortFields.indexOf(b.name.toLocaleLowerCase());
							if (orderA === -1 && orderB === -1) return 0;
							if (orderA === -1) return 1;
							if (orderB === -1) return -1;
							if (orderB < orderA) return 1;
							if (orderB > orderA) return -1;
							return 0;
						});
					}

					const fieldSeen = new Set<string>();
					for (let i = 0; i < child.block.fields.length; i++) {
						const field = child.block.fields[i];
						const nameLowerCase = field.name.toLocaleLowerCase();
						const name = lowercase ? nameLowerCase : field.name;

						if (field.name === '') continue;
						if (omitFields.has(nameLowerCase)) continue;
						if (removeDuplicateFields && fieldSeen.has(nameLowerCase)) continue;
						fieldSeen.add(nameLowerCase);

						if (!field.value || field.value.concat.length === 0) {
							if (removeEmptyFields) continue;
							bibtex += `\n${indent}${name}`;
						} else {
							const value = formatValue(field, options);
							if (removeEmptyFields && (value === '{}' || value === '""'))
								continue;
							bibtex += `\n${indent}${name
								.trim()
								.padEnd(align - 1)} = ${value}`;
						}

						if (i < child.block.fields.length - 1 || trailingCommas)
							bibtex += ',';
					}
					bibtex += `\n}\n`;
					break;
			}
		}
	}

	if (!bibtex.endsWith('\n')) bibtex += '\n';

	return { bibtex, warnings, entries: [] };
}

function formatComment(
	comment: string,
	{ stripComments, tidyComments }: OptionsNormalized
): string {
	if (stripComments) return '';
	if (tidyComments) {
		// tidy comments by trimming whitespace and ending with one newline
		const trimmed = comment.trim();
		if (trimmed === '') return '';
		return trimmed + '\n';
	} else {
		// make sure that comment whitespace does not flow into the first line of an entry
		return comment.replace(/^[ \t]*\n|[ \t]*$/g, '');
	}
}

function formatValue(
	field: FieldNode,
	options: OptionsNormalized
): string | undefined {
	const {
		curly,
		numeric,
		align,
		stripEnclosingBraces,
		dropAllCaps,
		escape,
		encodeUrls,
		wrap,
		maxAuthors,
		tab,
		space,
		enclosingBraces,
	} = options;

	if (!field.value) throw new Error('FATAL ');

	const nameLowerCase = field.name.toLocaleLowerCase();

	const indent: string = tab ? '\t' : ' '.repeat(space);
	const enclosingBracesFields: Set<string> = new Set(
		(enclosingBraces || []).map((field) => field.toLocaleLowerCase())
	);

	return field.value.concat
		.map(({ type, value }) => {
			const isNumeric = value.match(/^[1-9][0-9]*$/);
			if (isNumeric && curly) {
				type = 'braced';
			}
			if (type === 'literal' || (numeric && isNumeric)) {
				return value;
			}
			const dig3 = value.slice(0, 3).toLowerCase();
			if (!curly && numeric && nameLowerCase === 'month' && MONTHS.has(dig3)) {
				return dig3;
			}
			value = unwrapText(value);
			// if a field's value has double braces {{blah}}, lose the inner brace
			if (stripEnclosingBraces) {
				value = removeEnclosingBraces(value);
			}
			// if a field's value is all caps, convert it to title case
			if (dropAllCaps && !value.match(/[a-z]/)) {
				value = titleCase(value);
			}
			// url encode must happen before escape special characters
			if (nameLowerCase === 'url' && encodeUrls) {
				value = escapeURL(value);
			}
			// escape special characters like %
			if (escape) {
				value = escapeSpecialCharacters(value);
			}
			if (nameLowerCase === 'pages') {
				value = formatPageRange(value);
			}
			if (nameLowerCase === 'author' && maxAuthors) {
				value = limitAuthors(value, maxAuthors);
			}
			// if the user requested, wrap the value in braces (this forces bibtex
			// compiler to preserve case)
			if (
				enclosingBracesFields.has(nameLowerCase) &&
				(type === 'braced' || curly)
			) {
				value = addEnclosingBraces(value, true);
			}

			value = value.trim();

			if (type === 'braced' || curly) {
				const lineLength = `${indent}${align}{${value}}`.length;
				const multiLine = value.includes('\n\n');
				// If the value contains multiple paragraphs, then output the value at a separate indent level, e.g.
				// abstract     = {
				//   Paragraph 1
				//
				//   Paragraph 2
				// }
				if ((wrap && lineLength > wrap) || multiLine) {
					let paragraphs = value.split('\n\n');
					const valIndent = indent.repeat(2);

					if (wrap) {
						const wrapCol = wrap;
						paragraphs = paragraphs.map((paragraph) =>
							wrapText(paragraph, wrapCol - valIndent.length).join(
								'\n' + valIndent
							)
						);
					}

					value =
						'\n' +
						valIndent +
						paragraphs.join(`\n\n${valIndent}`) +
						'\n' +
						indent;
				}
				return addEnclosingBraces(value);
			} else {
				return `"${value}"`;
			}
		})
		.join(' # ');
}

export default { tidy };

export type { Warning, BibTeXTidyResult };
