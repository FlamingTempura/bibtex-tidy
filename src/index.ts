import { optionDocs } from './documentation';
import { Options, UniqueKey } from './options';
import { parse, BibTeXItem, BibTeXEntry, ValueString } from './bibtex-parser';
import { unicode } from './unicode';

type SortIndex = Map<string, string>;

type DuplicateKeyWarning = {
	code: 'DUPLICATE_KEY';
	message: string;
	entry: BibTeXItem;
};

type MissingKeyWarning = {
	code: 'MISSING_KEY';
	message: string;
	entry: BibTeXItem;
};

type DuplicateEntryWarning = {
	code: 'DUPLICATE_ENTRY';
	message: string;
	entry: BibTeXItem;
	duplicateOf: BibTeXItem;
};

type Warning = DuplicateKeyWarning | MissingKeyWarning | DuplicateEntryWarning;

type BibTeXTidyResult = {
	bibtex: string;
	warnings: Warning[];
	entries: BibTeXEntry[];
};

const DEFAULT_ENTRY_ORDER: string[] = ['key']; // if sort = true
const DEFAULT_MERGE_CHECK: UniqueKey[] = ['doi', 'citation', 'abstract'];

//prettier-ignore
const DEFAULT_FIELD_ORDER: string[] = [
	'title', 'shorttitle', 'author', 'year', 'month', 'day', 'journal',
	'booktitle', 'location', 'on', 'publisher', 'address', 'series',
	'volume', 'number', 'pages', 'doi', 'isbn', 'issn', 'url',
	'urldate', 'copyright', 'category', 'note', 'metadata'
];

//prettier-ignore
const MONTHS: Set<string> = new Set([
	'jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'
]);

const specialCharacters = new Map(unicode);

const escapeSpecialCharacters = (str: string): string => {
	let newstr: string = '';
	let escapeMode: boolean = false;
	for (let i = 0; i < str.length; i++) {
		if (escapeMode) {
			escapeMode = false;
			newstr += str[i];
			continue;
		}
		if (str[i] === '\\') {
			escapeMode = true;
			newstr += str[i];
			continue;
		}
		// iterate through each character and if it's a special char replace with latex code
		const c = str.charCodeAt(i).toString(16).padStart(4, '0');
		newstr += specialCharacters.get(c) || str[i];
	}
	return newstr;
};

const titleCase = (str: string): string => {
	return str.replace(/(\w)(\S*)/g, (u, first, rest) => {
		return first.toLocaleUpperCase() + rest.toLocaleLowerCase();
	});
};

// remove all non-alphanumeric characters
const alphaNum = (str?: string): string | undefined => {
	if (typeof str === 'undefined') return undefined;
	return String(str)
		.replace(/[^0-9A-Za-z]/g, '')
		.toLocaleLowerCase();
};

const tidy = (
	input: string,
	{
		omit = [],
		curly = false,
		numeric = false,
		tab = false,
		align = 14,
		sort = false,
		merge = false,
		stripEnclosingBraces = false,
		dropAllCaps = false,
		escape = true,
		sortFields = false,
		stripComments = false,
		encodeUrls = false,
		tidyComments = true,
		space = 2,
		duplicates = false,
		trailingCommas = false,
		removeEmptyFields = false,
		lowercase = true,
		sortProperties,
	}: Options = {}
): BibTeXTidyResult => {
	if (sort === true) sort = DEFAULT_ENTRY_ORDER;
	if (space === true) space = 2;
	if (sortProperties) sortFields = sortProperties;
	if (sortFields === true) sortFields = DEFAULT_FIELD_ORDER;
	if (merge === true) merge = 'combine';
	if (duplicates === true) duplicates = DEFAULT_MERGE_CHECK;
	if (align === false) align = 1;
	const indent: string = tab ? '\t' : ' '.repeat(space);
	const uniqCheck: Map<UniqueKey, boolean> = new Map();

	if (merge && !duplicates) duplicates = DEFAULT_MERGE_CHECK;
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
	// Parse the bibtex and retrieve the items (includes comments, entries, strings, preambles)
	const items: BibTeXItem[] = parse(input);
	// Set of entry keys, used to check for duplicate key warnings
	const keys: Map<string, BibTeXEntry> = new Map();
	const dois: Map<string, BibTeXEntry> = new Map();
	const citations: Map<string, BibTeXEntry> = new Map();
	const abstracts: Map<string, BibTeXEntry> = new Map();

	// Map of items to sort values e.g. { year: 2009, author: 'West', ... }
	const sortIndexes: Map<BibTeXItem, SortIndex> = new Map();
	// Map of hashes to entries, used for checking if an entry is a duplicate
	//const uniqIndex: Map<string, BibTeXEntry> = new Map();
	// Warnings to be output at the end
	const warnings: Warning[] = [];

	for (const item of items) {
		if (item.itemtype !== 'entry') continue;
		if (!item.key) {
			warnings.push({
				code: 'MISSING_KEY',
				message: `${item.key} does not have an entry key.`,
				entry: item,
			});
		}

		// Create a map of field to stringified value for quick lookups
		item.fieldMap = new Map<string, ValueString>();
		for (const field of item.fields) {
			const fieldName = lowercase ? field.name.toLocaleLowerCase() : field.name;
			const lname = fieldName.toLocaleLowerCase();
			if (omitFields.has(fieldName) || item.fieldMap.has(fieldName)) continue;
			let val: string;
			if (field.datatype === 'concatinate') {
				val = field.raw;
			} else {
				val = String(field.value)
					.replace(/\s*\n\s*/g, ' ')
					.trim(); // remove whitespace
				// if a field's value has double braces {{blah}}, lose the inner brace
				if (stripEnclosingBraces) val = val.replace(/^\{([^{}]*)\}$/g, '$1');
				// if a field's value is all caps, convert it to title case
				if (dropAllCaps && val.match(/^[^a-z]+$/)) val = titleCase(val);
				// url encode must happen before escape special characters
				if (lname === 'url' && encodeUrls) val = val.replace(/\\?_/g, '\\%5F');
				// escape special characters like %
				if (escape) val = escapeSpecialCharacters(val);
				// replace single dash with double dash in page range
				if (lname === 'pages') val = val.replace(/(\d)\s*-\s*(\d)/g, '$1--$2');
			}
			val = val.trim();
			if (val || !removeEmptyFields) {
				item.fieldMap.set(fieldName, {
					value: val,
					datatype: field.datatype,
				});
			}
		}

		for (const [key, doMerge] of uniqCheck) {
			let duplicateOf: BibTeXEntry | undefined;
			switch (key) {
				case 'key':
					if (!item.key) continue;
					duplicateOf = keys.get(item.key);
					if (!duplicateOf) keys.set(item.key, item);
					break;
				case 'doi':
					const doi = alphaNum(item.fieldMap.get('doi')?.value);
					if (!doi) continue;
					duplicateOf = dois.get(doi);
					if (!duplicateOf) dois.set(doi, item);
					break;
				case 'citation':
					const ttl = item.fieldMap.get('title')?.value;
					const aut = item.fieldMap.get('author')?.value;
					if (!ttl || !aut) continue;
					const cit: string =
						alphaNum(aut.split(/,| and/)[0]) + ':' + alphaNum(ttl);
					duplicateOf = citations.get(cit);
					if (!duplicateOf) citations.set(cit, item);
					break;
				case 'abstract':
					const abstract = alphaNum(item.fieldMap.get('abstract')?.value);
					const abs = abstract?.slice(0, 100);
					if (!abs) continue;
					duplicateOf = abstracts.get(abs);
					if (!duplicateOf) abstracts.set(abs, item);
					break;
			}
			if (!duplicateOf) continue;
			if (doMerge) {
				item.duplicate = true;
				warnings.push({
					code: 'DUPLICATE_ENTRY',
					message: `${item.key} appears to be a duplicate of ${duplicateOf.key} and was removed.`,
					entry: item,
					duplicateOf,
				});
				switch (merge) {
					case 'last':
						duplicateOf.key = item.key;
						duplicateOf.fieldMap = item.fieldMap;
						break;
					case 'combine':
						for (const [k, v] of item.fieldMap) {
							if (!duplicateOf.fieldMap.has(k)) duplicateOf.fieldMap.set(k, v);
						}
						break;
					case 'overwrite':
						duplicateOf.key = item.key;
						for (const [k, v] of item.fieldMap) {
							duplicateOf.fieldMap.set(k, v);
						}
						break;
				}
			} else {
				warnings.push({
					code: 'DUPLICATE_KEY',
					message: `${item.key} is a duplicate entry key.`,
					entry: item,
				});
			}
			break;
		}
	}

	// sort needs to happen after merging all entries is complete
	if (sort) {
		// comments, preambles, and strings which should be kept with an entry
		const preceedingMeta: BibTeXItem[] = [];

		// first, create sort indexes
		for (const item of items) {
			if (item.itemtype !== 'entry') {
				// if string, preamble, or comment, then use sort index of previous entry
				preceedingMeta.push(item);
				continue;
			}
			const sortIndex: SortIndex = new Map();
			for (let key of sort) {
				// dash prefix indicates descending order, deal with this later
				if (key.startsWith('-')) key = key.slice(1);
				let val: string;
				if (key === 'key') {
					val = item.key || '';
				} else if (key === 'type') {
					val = item.type;
				} else {
					val = String(item.fieldMap?.get(key)?.value ?? '');
				}
				sortIndex.set(key, val.toLowerCase());
			}
			sortIndexes.set(item, sortIndex);
			// update comments above to this index
			while (preceedingMeta.length > 0) {
				sortIndexes.set(preceedingMeta.pop()!, sortIndex);
			}
		}

		// Now iterate through sort keys and sort entries
		for (let i = sort.length - 1; i >= 0; i--) {
			const desc = sort[i].startsWith('-');
			const key = desc ? sort[i].slice(1) : sort[i];
			items.sort((a: BibTeXItem, b: BibTeXItem) => {
				// if no value, then use \ufff0 so entry will be last
				const ia = sortIndexes.get(a)?.get(key) ?? '\ufff0';
				const ib = sortIndexes.get(b)?.get(key) ?? '\ufff0';
				return (desc ? ib : ia).localeCompare(desc ? ia : ib);
			});
		}
	}

	// output the tidied bibtex
	let bibtex: string = '';
	for (const item of items) {
		switch (item.itemtype) {
			case 'string':
				// keep strings as they were
				bibtex += `@string{${item.name} = ${item.raw}}\n`;
				break;

			case 'preamble':
				// keep preambles as they were
				bibtex += `@preamble{${item.raw}}\n`;
				break;

			case 'comment':
				if (stripComments) continue;
				if (tidyComments) {
					// tidy comments by trimming whitespace and ending with one newline
					bibtex += item.comment.trim() ? item.comment.trim() + '\n' : '';
				} else {
					// make sure that comment whitespace does not flow into the first line of an entry
					bibtex += item.comment.replace(/^[ \t]*\n|[ \t]*$/g, '');
				}
				break;

			case 'entry':
				if (item.duplicate) continue;
				const itemType = lowercase ? item.type.toLocaleLowerCase() : item.type;
				bibtex += `@${itemType}{`;
				if (item.key) bibtex += `${item.key}`;
				// Create ordered list of fields to output, beginning with those
				// specified in sortFields option, followed by fields in entry.
				// Use Set to prevent duplicates and keep insertion order.
				const sortedFieldNames: Set<string> = new Set([
					...(sortFields || []),
					...item.fieldMap.keys(),
				]);
				for (const k of sortedFieldNames) {
					const field = item.fieldMap.get(k);
					if (!field) continue;
					bibtex += `,\n${indent}${k.padEnd((align as number) - 1)} = `;
					const val = field.value;
					const dig3 = String(val).slice(0, 3).toLowerCase();
					if (numeric && val.match(/^[1-9][0-9]*$/)) {
						bibtex += val;
					} else if (numeric && k === 'month' && MONTHS.has(dig3)) {
						bibtex += dig3;
					} else if (field.datatype === 'braced' || curly) {
						bibtex += `{${val}}`;
					} else if (field.datatype === 'quoted') {
						bibtex += `"${val}"`;
					} else {
						bibtex += val;
					}
				}
				if (trailingCommas) {
					bibtex += ',';
				}
				bibtex += `\n}\n`;
				// @ts-ignore
				delete item.fieldMap; // don't return the map
				break;
		}
	}

	if (!bibtex.endsWith('\n')) bibtex += '\n';

	const entries = items.filter(
		(item: BibTeXItem) => item.itemtype === 'entry'
	) as BibTeXEntry[];

	return { bibtex, warnings, entries };
};

export default { tidy, options: optionDocs };

export type { Warning, BibTeXTidyResult };
