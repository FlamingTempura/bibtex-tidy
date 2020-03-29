/* jshint node: true, esversion: 6, unused: true */
'use strict';

import parser from 'bibtex-parse';

import unicode from './unicode.tsv'; // source: https://raw.githubusercontent.com/pkgw/worklog-tools/master/unicode_to_latex.py

const DEFAULT_FIELD_ORDER = [
	'title',
	'shorttitle',
	'author',
	'year',
	'month',
	'day',
	'journal',
	'booktitle',
	'location',
	'on',
	'publisher',
	'address',
	'series',
	'volume',
	'number',
	'pages',
	'doi',
	'isbn',
	'issn',
	'url',
	'urldate',
	'copyright',
	'category',
	'note',
	'metadata'
];

const MONTHS = new Set([
	'jan',
	'feb',
	'mar',
	'apr',
	'may',
	'jun',
	'jul',
	'aug',
	'sep',
	'oct',
	'nov',
	'dec'
]);

const OPTIONS = {
	omit: {
		name: 'Remove fields',
		description: 'Remove specified fields from bibliography entries.',
		cliExamples: ['--omit=id,name'],
		type: 'array',
		value: []
	},
	curly: {
		name: 'Enclose values in curly braces',
		description:
			'Enclose all property values in braces. Quoted values will be converted to braces. For example, "Journal of Tea" will become {Journal of Tea}.',
		type: 'boolean',
		value: false
	},
	numeric: {
		name: 'Use numeric values where possible',
		description:
			'Strip quotes and braces from numeric/month values. For example, {1998} will become 1998.',
		type: 'boolean',
		value: false
	},
	space: {
		name: 'Indent with spaces',
		description:
			'Prefix all fields with the specified number of spaces (ignored if tab is set).',
		cliExamples: ['--space=2 (default)', '--space=4'],
		type: 'number',
		value: 2
	},
	tab: {
		name: 'Indent with tabs',
		description: 'Prefix all fields with a tab.',
		type: 'boolean',
		value: false
	},
	align: {
		name: 'Align values',
		description:
			'Insert whitespace between fields and values so that values are visually aligned.',
		type: 'number',
		cliExamples: ['--align=14 (default)', '--no-align'],
		value: 14
	},
	sort: {
		name: 'Sort bibliography entries',
		description:
			'Sort entries by specified fields. For descending order, prefix the field with a dash (-).',
		cliExamples: [
			'--sort (sort by id)',
			'--sort=-year,name (sort year descending then name ascending)',
			'--sort=name,year'
		],
		type: 'array',
		value: false
	},
	merge: {
		name: 'Merge duplicate entries',
		description:
			'Two entries are considered duplicates in the following cases: (a) their DOIs are identical, (b) their abstracts are identical, or (c) their authors and titles are both identical. The firstmost entry is kept and any extra properties from duplicate entries are incorporated.',
		type: 'boolean',
		value: false
	},
	stripEnclosingBraces: {
		name: 'Strip double-braced values.',
		description:
			'Where an entire value is enclosed in double braces, remove the extra braces. For example, {{Journal of Tea}} will become {Journal of Tea}.',
		type: 'boolean',
		value: false
	},
	dropAllCaps: {
		name: 'Drop all caps',
		description:
			'Where values are all caps, make them title case. For example, {JOURNAL OF TEA} will become {Journal of Tea}.',
		type: 'boolean',
		value: false
	},
	escape: {
		name: 'Escape special characters',
		description:
			'Escape special characters, such as umlaut. This ensures correct typesetting with latex.',
		cliExamples: ['--escape (default)', '--no-escape'],
		type: 'boolean',
		value: true
	},
	sortFields: {
		name: 'Sort fields',
		description: `Sort the fields within entries. The default sort order is ${DEFAULT_FIELD_ORDER.join(
			', '
		)}. Alternatively, you can specify field names delimed by spaces or commas.`,
		cliExamples: ['--sort-fields=name,author'],
		type: 'array',
		value: false
	},
	stripComments: {
		name: 'Remove comments',
		description: 'Remove all comments from the bibtex source.',
		type: 'boolean',
		value: false
	},
	encodeUrls: {
		name: 'Encode URLs',
		description: 'Replace invalid URL characters with percent encoded values.',
		type: 'boolean',
		value: false
	},
	tidyComments: {
		name: 'Tidy comments',
		description: 'Remove whitespace surrounding comments.',
		type: 'boolean',
		value: true
	}
};

const defaults = {};
for (const k of Object.keys(OPTIONS)) {
	defaults[k] = OPTIONS[k].value;
}

const specialCharacters = new Map(unicode);

const escapeSpecialCharacters = str => {
	let newstr = '';
	let escapeMode;
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

const titleCase = str =>
	str.replace(
		/\w\S*/g,
		txt => txt.charAt(0).toLocaleUpperCase() + txt.substr(1).toLocaleLowerCase()
	);

// remove all non-alphanumeric characters
const justAlphaNum = (str = '') =>
	String(str)
		.replace(/[^0-9A-Za-z]/g, '')
		.toLocaleLowerCase();

const get = (item, name) =>
	item.fields.find(
		f => f.name.toLocaleUpperCase() === name.toLocaleUpperCase()
	) || null;

const getValue = (item, name, defaultVal = null) => {
	const field = get(item, name);
	return field ? field.value : defaultVal;
};

const getValueStr = (item, name) => String(getValue(item, name) || '');

const generateHash = item => {
	const doi = getValueStr(item, 'doi');
	const abstract = getValueStr(item, 'abstract');
	const title = getValueStr(item, 'title', '');
	const firstAuthorSurname = getValueStr(item, 'author', '').split(/,| and/)[0];
	return {
		entry: item,
		doi: doi ? justAlphaNum(doi) : null,
		abstract: abstract ? justAlphaNum(abstract).slice(0, 100) : null,
		authorTitle: firstAuthorSurname + ':' + justAlphaNum(title).slice(0, 50)
	};
};

const tidy = (input, options = {}) => {
	options = { ...defaults, ...options }; // make a copy of options with defaults

	if (options.sort === true) {
		options.sort = ['key'];
	}
	if (options.space === true) {
		options.space = 2;
	}
	if (options.sortProperties) {
		// legacy
		options.sortFields = options.sortProperties;
	}
	if (options.sortFields === true) {
		options.sortFields = DEFAULT_FIELD_ORDER;
	}
	if (options.omit instanceof Array) {
		options.omit = new Set(options.omit);
	} else if (options.omit === false || !(options.omit instanceof Array)) {
		options.omit = new Set();
	}
	if (options.align === false) {
		options.align = 1;
	}

	const items = parser.parse(input);
	const hashes = [];
	const keys = new Set();
	const warnings = [];
	let preceedingMeta = []; // comments, preambles, and strings which should be kept with an entry
	for (const item of items) {
		if (item.itemtype !== 'entry') {
			// if string, preamble, or comment, then use sort index of previous entry
			preceedingMeta.push(item);
			item.index = {}; // by default, take index of preceeding item
		} else {
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

			if (options.merge) {
				const hash = generateHash(item);
				const duplicate = hashes.find(h => {
					return hash.doi
						? hash.doi === h.doi
						: hash.abstract
						? hash.abstract === h.abstract
						: hash.authorTitle === h.authorTitle;
				});
				if (duplicate) {
					warnings.push({
						code: 'DUPLICATE_ENTRY',
						message: `${item.key} appears to be a duplicate of ${duplicate.entry.key} and was removed.`,
						entry: item,
						duplicateOf: duplicate.entry
					});
					duplicate.entry.fields.push(...item.fields);
					item.duplicate = true;
				} else {
					hashes.push(hash);
				}
			}

			if (options.sort) {
				item.index = {};
				for (let key of options.sort) {
					if (key.startsWith('-')) key = key.slice(1);
					// if no value, then use \ufff0 so entry will be last
					item.index[key] = String(
						item[key] || getValue(item, key) || '\ufff0'
					).toLowerCase();
				}
				for (let i in preceedingMeta) {
					preceedingMeta[i].index = item.index; // update comments above to this index
				}
				preceedingMeta = [];
			}
		}
	}

	if (options.sort) {
		for (let i = options.sort.length - 1; i >= 0; i--) {
			let key = options.sort[i];
			const desc = key.startsWith('-');
			if (desc) key = key.slice(1);
			items.sort((a, b) => {
				return ((desc ? b : a).index[key] || '\ufff0').localeCompare(
					(desc ? a : b).index[key]
				);
			});
		}
	}

	let bibtex = '';
	const indent = options.tab ? '\t' : ' '.repeat(options.space);
	for (const item of items) {
		if (item.duplicate) {
			continue;
		}
		if (item.itemtype === 'string') {
			bibtex += `@string{${item.name} = ${item.raw}}\n`; // keep strings as they were
		} else if (item.itemtype === 'preamble') {
			bibtex += `@preamble{${item.raw}}\n`; // keep preambles as they were
		} else if (item.itemtype === 'comment') {
			const comment = options.tidyComments
				? item.comment.trim()
				: item.comment.replace(/^[ \t]*\n|\n[ \t]*$/g, '');
			if (comment && !options.stripComments) {
				bibtex += `${comment}\n`;
			}
		} else {
			// entry
			let props = new Set();
			for (const { name } of item.fields) {
				const lname = name.toLocaleLowerCase();
				if (!options.omit.has(lname)) props.add(lname);
			}
			props = [...props];

			if (options.sortFields) {
				props = props.sort((a, b) => {
					const indexA = options.sortFields.indexOf(a);
					const indexB = options.sortFields.indexOf(b);
					if (indexA > -1 && indexB > -1) return indexA - indexB;
					if (indexA > -1) return -1;
					if (indexB > -1) return 1;
					return 0;
				});
			}
			props = props.map(k => {
				const v = get(item, k);
				let output;
				if (v.datatype === 'concatinate') {
					output = v.value
						.map(({ value, datatype }) => renderValue(value, datatype))
						.join(' # ');
				} else {
					let val = String(v.value)
						.replace(/\s*\n\s*/g, ' ')
						.trim(); // remove whitespace
					if (options.stripEnclosingBraces) {
						val = val.replace(/^\{([^{}]*)\}$/g, '$1');
					}
					if (options.dropAllCaps && val.match(/^[^a-z]+$/)) {
						val = titleCase(val);
					}
					if (k === 'url' && options.encodeUrls) {
						val = val.replace(/\\?_/g, '\\%5F'); // must happen before escape special characters
					}
					if (options.escape) {
						val = escapeSpecialCharacters(val);
					}
					if (k === 'pages') {
						val = val.replace(/(\d)\s*-\s*(\d)/g, '$1--$2'); // replace single dash with double dash in page range
					}
					val = val.trim();
					output = renderValue(val, v.datatype, options.curly);
					if (options.numeric) {
						const dig3 = val.slice(0, 3).toLowerCase();
						if (val.match(/^[1-9][0-9]*$/)) {
							output = val;
						} else if (k === 'month' && MONTHS.has(dig3)) {
							output = dig3.toLowerCase();
						}
					}
				}
				return `${indent}${k.padEnd(options.align - 1)} = ${output}`;
			});

			bibtex += `@${item.type.toLowerCase()}{${
				item.key ? `${item.key},` : ''
			}\n${props.join(',\n')}\n}\n`;
		}
	}

	const entries = items.filter(item => item.itemtype === 'entry');

	return { bibtex, warnings, entries };
};

const renderValue = (value, datatype, forceBrace) => {
	if (datatype === 'braced' || forceBrace) return `{${value}}`;
	if (datatype === 'quoted') return `"${value}"`;
	return value;
};

export default { tidy, options: OPTIONS };
