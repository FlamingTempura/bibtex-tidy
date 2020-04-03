import parser from 'bibtex-parse';
import unicode from './unicode.tsv'; // source: https://raw.githubusercontent.com/pkgw/worklog-tools/master/unicode_to_latex.py

type EntryHash = {
	entry: BibTeXEntry;
	doi: string | null;
	abstract: string | null;
	authorTitle: string;
};

type Index = { [key: string]: string };

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

type Options = {
	/**
	 * Remove fields - Remove specified fields from bibliography entries.
	 * @example --omit=id,name
	 */
	omit?: string[];
	/**
	 * Enclose values in curly braces - Enclose all property values in braces.
	 * Quoted values will be converted to braces. For example, "Journal of Tea"
	 * will become {Journal of Tea}.
	 */
	curly?: boolean;
	/**
	 * Use numeric values where possible - Strip quotes and braces from
	 * numeric/month values. For example, {1998} will become 1998.
	 */
	numeric?: boolean;
	/**
	 * Indent with spaces - Prefix all fields with the specified number of
	 * spaces (ignored if tab is set).
	 * @example --space=2 (default)
	 * @example --space=4
	 * */
	space?: true | number;
	/**
	 * Indent with tabs - Prefix all fields with a tab.
	 * */
	tab?: boolean;
	/**
	 * Align values - Insert whitespace between fields and values so that values are visually aligned.
	 * @example --align=14 (default)
	 * @example --no-align'
	 * */
	align?: false | number;
	/**
	 * Sort bibliography entries - Sort entries by specified fields. For descending order, prefix the field with a dash (-).
	 * @example--sort (sort by id)',
	 * @example --sort=-year,name (sort year descending then name ascending)',
	 * @example --sort=name,year'
	 * */
	sort?: boolean | string[];
	/** Merge duplicate entries - Two entries are considered duplicates in the
	 *	following cases: (a) their DOIs are identical, (b) their abstracts are
	 *	identical, or (c) their authors and titles are both identical. The
	 *	firstmost entry is kept and any extra properties from duplicate entries
	 *	are incorporated.
	 *	@example --merge (merge using any strategy)
	 *	@example --merge doi (merge only if DOIs are identicals)
	 *	@example --merge key (merge only if IDs are identicals)
	 *	@example --merge abstract (merge only if abstracts are similar)
	 *	@example --merge citation (merge only if author and titles are similar)
	 *	@example --merge doi, key (use doi and key strategies)
	 * */
	merge?: boolean | ('doi' | 'key' | 'abstract' | 'citation')[];
	/**
	 * Strip double-braced values - Where an entire value is enclosed in double
	 * braces, remove the extra braces. For example, {{Journal of Tea}} will
	 * become {Journal of Tea}.
	 * */
	stripEnclosingBraces?: boolean;
	/**
	 * Drop all caps - Where values are all caps, make them title case. For
	 * example, {JOURNAL OF TEA} will become {Journal of Tea}.
	 * */
	dropAllCaps?: boolean;
	/**
	 * Escape special characters - Escape special characters, such as umlaut.
	 * This ensures correct typesetting with latex.
	 * @example --escape (default)
	 * @example --no-escape
	 * */
	escape?: boolean;
	/**
	 * Sort fields - Sort the fields within entries. The default sort order is
	 * XXX. Alternatively, you can specify field names delimed by spaces or
	 * commas.
	 * @example --sort-fields=name,author
	 * */
	sortFields?: boolean | string[];
	/**
	 * Alias of sort fields (legacy)
	 */
	sortProperties?: boolean | string[];
	/**
	 * Remove comments - Remove all comments from the bibtex source
	 * */
	stripComments?: boolean;
	/**
	 * Encode URLs - Replace invalid URL characters with percent encoded values.
	 * */
	encodeUrls?: boolean;
	/**
	 * Tidy comments - Remove whitespace surrounding
	 * */
	tidyComments?: boolean;
};

const DEFAULTS: Options = {
	omit: [],
	curly: false,
	numeric: false,
	space: 2,
	tab: false,
	align: 14,
	sort: false,
	merge: false,
	stripEnclosingBraces: false,
	dropAllCaps: false,
	escape: true,
	sortFields: false,
	stripComments: false,
	encodeUrls: false,
	tidyComments: true
};

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
	let escapeMode: boolean;
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
		const c = str
			.charCodeAt(i)
			.toString(16)
			.padStart(4, '0');
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
const justAlphaNum = (str: string = ''): string => {
	return String(str)
		.replace(/[^0-9A-Za-z]/g, '')
		.toLocaleLowerCase();
};

const getValueStr = (item: BibTeXEntry, name: string): string => {
	const field = item.fields.find((f: BibTexField) => {
		return f.name.toLocaleUpperCase() === name.toLocaleUpperCase();
	});
	return String(field?.value || '');
};

const stringifyValue = (
	field: BibTexField,
	opts: {
		stripEnclosingBraces: boolean;
		dropAllCaps: boolean;
		encodeUrls: boolean;
		curly: boolean;
		escape: boolean;
		numeric: boolean;
		doubledash: boolean;
		month: boolean;
	}
): string => {
	let output;
	if (field.datatype === 'concatinate') {
		return field.value
			.map((field: BibTexField) => stringifyValue(field, opts))
			.join(' # ');
	}
	let val = String(field.value)
		.replace(/\s*\n\s*/g, ' ')
		.trim(); // remove whitespace

	// if a field's value has double braces {{blah}}, lose the inner brace
	if (opts.stripEnclosingBraces) val = val.replace(/^\{([^{}]*)\}$/g, '$1');

	// if a field's value is all caps, convert it to title case
	if (opts.dropAllCaps && val.match(/^[^a-z]+$/)) val = titleCase(val);

	// url encode must happen before escape special characters
	if (opts.encodeUrls) val = val.replace(/\\?_/g, '\\%5F');

	// escape special characters like %
	if (opts.escape) val = escapeSpecialCharacters(val);

	// replace single dash with double dash in page range
	if (opts.doubledash) val = val.replace(/(\d)\s*-\s*(\d)/g, '$1--$2');

	val = val.trim();

	if (opts.numeric) {
		const dig3 = val.slice(0, 3).toLowerCase();
		if (val.match(/^[1-9][0-9]*$/)) {
			return val;
		} else if (opts.month && MONTHS.has(dig3)) {
			return dig3.toLowerCase();
		}
	}

	if (field.datatype === 'braced' || opts.curly) return `{${val}}`;
	if (field.datatype === 'quoted') return `"${val}"`;

	return val;
};

const generateHash = (entry: BibTeXEntry): EntryHash => {
	const doi = getValueStr(entry, 'doi');
	const abstract = getValueStr(entry, 'abstract');
	const title = getValueStr(entry, 'title');
	const firstAuthorSurname = getValueStr(entry, 'author').split(/,| and/)[0];
	// console.log(
	// 	doi ?? justAlphaNum(doi),
	// 	justAlphaNum(firstAuthorSurname) + ':' + justAlphaNum(title).slice(0, 50)
	// );
	return {
		entry,
		doi: doi ?? justAlphaNum(doi),
		abstract: abstract ?? justAlphaNum(abstract).slice(0, 100),
		authorTitle:
			justAlphaNum(firstAuthorSurname) + ':' + justAlphaNum(title).slice(0, 50)
	};
};

const tidy = (
	input: string,
	options: Options = {}
): {
	bibtex: string;
	warnings: Warning[];
	entries: BibTeXEntry[];
} => {
	options = { ...DEFAULTS, ...options }; // make a copy of options with defaults

	if (options.sort === true) options.sort = ['key'];
	if (options.space === true) options.space = 2;
	if (options.sortProperties) options.sortFields = options.sortProperties;
	if (options.sortFields === true) options.sortFields = DEFAULT_FIELD_ORDER;

	const indent: string = options.tab ? '\t' : ' '.repeat(options.space);
	const align: number = options.align === false ? 1 : options.align;
	const sort: string[] | null = options.sort || null;
	const sortFields: string[] | null = options.sortFields || null;
	const omit: Set<string> = new Set(options.omit || []);
	const curly: boolean = options.curly;
	const numeric: boolean = options.numeric;
	const merge: boolean = !!options.merge;
	const stripEnclosingBraces: boolean = options.stripEnclosingBraces;
	const dropAllCaps: boolean = options.dropAllCaps;
	const escape: boolean = options.escape;
	const encodeUrls: boolean = options.encodeUrls;
	const stripComments: boolean = options.stripComments;
	const tidyComments: boolean = options.tidyComments;

	const items: BibTeXItem[] = parser.parse(input);
	const indexes: Map<BibTeXItem, Index> = new Map();
	const duplicates: Set<BibTeXItem> = new Set();

	const hashes = [];
	const keys = new Set();
	const warnings: Warning[] = [];
	let preceedingMeta: BibTeXItem[] = []; // comments, preambles, and strings which should be kept with an entry

	for (const item of items) {
		if (item.itemtype !== 'entry') {
			// if string, preamble, or comment, then use sort index of previous entry
			preceedingMeta.push(item);
			continue;
		}
		if (!item.key) {
			warnings.push({
				code: 'MISSING_KEY',
				message: `${item.key} does not have an entry key.`,
				entry: item
			});
		} else if (keys.has(item.key)) {
			warnings.push({
				code: 'DUPLICATE_KEY',
				message: `${item.key} is a duplicate entry key.`,
				entry: item
			});
		}
		keys.add(item.key);

		if (merge) {
			const hash = generateHash(item);
			const duplicate = hashes.find(
				h =>
					(hash.doi ? hash.doi === h.doi : false) ||
					(hash.abstract ? hash.abstract === h.abstract : false) ||
					hash.authorTitle === h.authorTitle
			);
			if (duplicate) {
				warnings.push({
					code: 'DUPLICATE_ENTRY',
					message: `${item.key} appears to be a duplicate of ${duplicate.entry.key} and was removed.`,
					entry: item,
					duplicateOf: duplicate.entry
				});
				duplicate.entry.fields.push(...item.fields);
				duplicates.add(item);
			} else {
				hashes.push(hash);
			}
		}

		if (sort) {
			const index: Index = {};
			for (let key of sort) {
				// dash prefix indicates descending order, deal with this later
				if (key.startsWith('-')) key = key.slice(1);
				const value: string =
					key === 'key'
						? item.key
						: key === 'type'
						? item.type
						: getValueStr(item, key);
				// if no value, then use \ufff0 so entry will be last
				index[key] = value.toLowerCase() || '\ufff0';
			}
			indexes.set(item, index);
			// update comments above to this index
			while (preceedingMeta.length > 0) {
				indexes.set(preceedingMeta.pop(), index);
			}
		}
	}

	if (sort) {
		for (let i = sort.length - 1; i >= 0; i--) {
			const desc = sort[i].startsWith('-');
			const key = desc ? sort[i].slice(1) : sort[i];
			items.sort((a: BibTeXEntry, b: BibTeXEntry) => {
				const ia = indexes.get(a)?.[key] || '\ufff0';
				const ib = indexes.get(b)?.[key] || '\ufff0';
				return (desc ? ib : ia).localeCompare(desc ? ia : ib);
			});
		}
	}

	let bibtex: string = '';
	for (const item of items) {
		if (duplicates.has(item)) continue;
		if (item.itemtype === 'string') {
			bibtex += `@string{${item.name} = ${item.raw}}\n`; // keep strings as they were
		} else if (item.itemtype === 'preamble') {
			bibtex += `@preamble{${item.raw}}\n`; // keep preambles as they were
		} else if (item.itemtype === 'comment') {
			let comment;
			if (tidyComments) {
				if (item.comment.trim()) {
					comment = item.comment.trim() + '\n';
				}
			} else {
				comment = item.comment.replace(/^[ \t]*\n|[ \t]*$/g, '');
			}
			if (comment && !stripComments) {
				bibtex += comment;
			}
		} else if (item.itemtype === 'entry') {
			const fields: Map<string, BibTexField> = new Map();
			for (const field of item.fields) {
				const lname = field.name.toLocaleLowerCase();
				if (omit.has(lname) || fields.has(lname)) continue;
				fields.set(lname, field);
			}

			let fieldnames: string[] = [...fields.keys()];
			if (sortFields) {
				fieldnames = fieldnames.sort((a: string, b: string) => {
					const indexA = sortFields.indexOf(a);
					const indexB = sortFields.indexOf(b);
					if (indexA > -1 && indexB > -1) return indexA - indexB;
					if (indexA > -1) return -1;
					if (indexB > -1) return 1;
					return 0;
				});
			}

			const fieldstrings = fieldnames.map((k: string) => {
				const field = fields.get(k);
				let val = stringifyValue(field, {
					stripEnclosingBraces,
					encodeUrls: k === 'url' && encodeUrls,
					curly,
					doubledash: k === 'pages',
					dropAllCaps,
					escape,
					numeric,
					month: k === 'month'
				});
				return `${indent}${k.padEnd(align - 1)} = ${val}`;
			});

			bibtex += `@${item.type.toLowerCase()}{${
				item.key ? `${item.key},` : ''
			}\n${fieldstrings.join(',\n')}\n}\n`;
		}
	}

	const entries = items.filter(
		(item: BibTeXItem) => item.itemtype === 'entry'
	) as BibTeXEntry[];

	if (!bibtex.endsWith('\n')) bibtex += '\n';

	return { bibtex, warnings, entries };
};

export default { tidy };
