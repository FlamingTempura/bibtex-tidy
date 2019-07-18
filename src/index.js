/* jshint node: true, esversion: 6, unused: true */
'use strict';

import parser from 'bibtex-parse';
import unicode from './unicode.tsv'; // source: https://raw.githubusercontent.com/pkgw/worklog-tools/master/unicode_to_latex.py

const defaultFieldOrder = [
	'title', 'shorttitle', 'author', 'year', 'month', 'day', 'journal',
	'booktitle', 'location', 'on',  'publisher', 'address', 'series',
	'volume', 'number', 'pages', 'doi', 'isbn', 'issn', 'url', 
	'urldate', 'copyright', 'category', 'note', 'metadata'
];

const options = { 
	omit: {
		name: 'Remove specified fields',
		description: 'Provide a list of fields which should be removed from every bibliography entry.',
		type: 'array',
		value: []
	},
	curly: {
		name: 'Enclose values in curly braces',
		description: 'Setting this to true will cause all property values to be enclosed in braces. Quoted values will be converted to braces.',
		type: 'boolean',
		value: false
	},
	numeric: {
		name: 'Use numeric values where possible',
		description: 'Setting this to true will strip quotes and braces from numeric/month values. For example, {1998} will become 1998.',
		type: 'boolean',
		value: false
	},
	space: { 
		name: 'Indent with spaces',
		description: 'Providing a number causes all fields to be prefixed with the corresponding number of spaces. This is ignored if tab is true.',
		type: 'number',
		value: 2
	},
	tab: { 
		name: 'Indent with tabs',
		description: 'If this is set then all fields will be prefixed with a tab.',
		type: 'boolean',
		value: false
	},
	align: {
		name: 'Align values',
		description: 'Insert whitespace between fields and values so that values are visually aligned.',
		type: 'number',
		value: 14
	},
	sort: {
		name: 'Sort bibliography entries',
		description: 'Sort entries alphabetically by id (or other provided fields).',
		type: 'array',
		value: false
	},
	merge: { 
		name: 'Merge duplicate entries',
		description: 'Two entries are considered duplicates in the following cases: (a) their DOIs are identical, (b) their abstracts are identical, or (c) their authors and titles are both identical. The firstmost entry is kept and any extra properties from duplicate entries are incorporated.',
		type: 'boolean',
		value: false
	},
	stripEnclosingBraces: {
		name: 'Strip double-braced values.',
		description: 'Where an entire value is enclosed in double braces, remove the extra braces. For example, convert {{Journal of Tea}} to {Journal of Tea}.',
		type: 'boolean',
		value: false
	},
	dropAllCaps: { 
		name: 'Drop all caps',
		description: 'Where values are all caps, make them title case. For example, convert {JOURNAL OF TEA} to {Journal of Tea}.',
		type: 'boolean',
		value: false
	},
	escape: {
		name: 'Escape special characters',
		description: 'Escape special characters, such as umlaut. This ensures correct typesetting with latex.',
		type: 'boolean',
		value: true
	},
	sortFields: {
		name: 'Sort fields',
		description: `Sort the fields within entries. The default sort order is ${defaultFieldOrder.join(', ')}. Alternatively you can specify space delimited properties.`,
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
for (let k of Object.keys(options)) {
	defaults[k] = options[k].value;
}

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const escapeSpecialCharacters = str => {
	for (let [regexp, latex] of unicode) {
		str = str.replace(regexp, latex);
	}
	return str;
};

const titleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

const stripWhitespace = str => String(str).replace(/\W/g, '').toLowerCase();

const get = (item, name) => {
	let field = item.fields.find(f => f.name.toUpperCase() === name.toUpperCase());
	return field ? field : null;
};

const getValue = (item, name) => {
	let field = get(item, name);
	return field ? field.value : null;
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
		options.sortFields = options.sortProperties;
	}
	if (options.sortFields === true) {
		options.sortFields = defaultFieldOrder;
	}
	if (options.omit === false || (!(options.omit instanceof Array))) {
		options.omit = [];
	}
	if (options.align === false) {
		options.align = 1;
	}

	let items = parser.parse(input),
		hashes = [],
		keys = [],
		warnings = [],
		preceedingMeta = []; // comments, preambles, and strings which should be kept with an entry
	for (let item of items) {
		if (item.itemtype !== 'entry') {// if string, preamble, or comment, then use sortIndex of previous entry
			preceedingMeta.push(item);
		} else {

			if (!item.key) {
				warnings.push({ code: 'MISSING_KEY', message: `${item.key} does not have an entry key.`, entry: item });
			} else if (keys.includes(item.key)) {
				warnings.push({ code: 'DUPLICATE_KEY', message: `${item.key} is a duplicate entry key.`, entry: item });
			}
			keys.push(item.key);

			if (options.merge) {
				let hash = {
						entry: item,
						doi: get(item, 'doi') ? stripWhitespace(getValue(item, 'doi')) : null,
						abstract: get(item, 'abstract') ? stripWhitespace(getValue(item, 'abstract')).slice(0, 100) : null,
						authorTitle: (get(item, 'author') ? String(getValue(item, 'author')).match(/([^\s]+)\s*(,|and |et |$)/)[1] : '') + ':' + // surname (comes before comma or 'and')
							(stripWhitespace(getValue(item, 'title')) || '').slice(0, 50)
					},
					duplicate = hashes.find(h => {
						return hash.doi ? hash.doi === h.doi :
							hash.abstract ? hash.abstract === h.abstract :
							hash.authorTitle === h.authorTitle;
					});
				if (duplicate) {
					warnings.push({ code:'DUPLICATE_ENTRY', message: `${item.key} appears to be a duplicate of ${duplicate.entry.key} and was removed.`, entry: item, duplicateOf: duplicate.entry });
					duplicate.entry.fields.push(...item.fields);
					item.duplicate = true;
				} else {
					hashes.push(hash);
				}
			}

			if (options.sort) {
				let sortIndex = options.sort
					.map(k => String(item[k] || getValue(item, k) || '\ufff0').toLowerCase()) // if no value, then use \ufff0 so entry will be last
					.join(' ');
				for (let i in preceedingMeta) {
					preceedingMeta[i].sortIndex = `${sortIndex} ${i}`;
				}
				item.sortIndex = `${sortIndex} ${preceedingMeta.length}`;
				preceedingMeta = [];
			}
		}
	}

	if (options.sort) { // an array of keys to sort by
		items = items.sort((a, b) => a.sortIndex < b.sortIndex ? -1 : a.sortIndex > b.sortIndex ? 1 : 0);
	}

	let bibtex = '',
		indent = options.tab ? '\t' : Array(options.space).fill(' ').join('');
	for (let item of items) {
		if (item.duplicate) { continue; }
		if (item.itemtype === 'string') {
			bibtex += `@string{${item.name} = ${item.raw}}\n`; // keep strings as they were
		} else if (item.itemtype === 'preamble') {
			bibtex += `@preamble{${item.raw}}\n`; // keep preambles as they were
		} else if (item.itemtype === 'comment') {
			let comment = options.tidyComments ? item.comment.trim() : item.comment.replace(/^[ \t]*\n|\n[ \t]*$/g, '');
			if (comment && !options.stripComments) {
				bibtex += `${comment}\n`;
			}
		} else { // entry
			let props = item.fields
				.map(field => field.name.toLowerCase())
				.filter(k => !options.omit.includes(k));

			props = Array.from(new Set(props)); // remove duplicate properties

			if (options.sortFields) {
				props = props.sort((a, b) => {
					let indexA = options.sortFields.indexOf(a),
						indexB = options.sortFields.indexOf(b);
					return indexA > -1 && indexB > -1 ? indexA - indexB : indexA > -1 ? -1 : indexB > -1 ? 1 : 0;
				});
			}
			props = props.map(k => {
				let v = get(item, k),
					output;
				if (v.datatype === 'concatinate') {
					output = v.value.map(({ value, datatype }) => renderValue(value, datatype)).join(' # ');
				} else {
					let val = String(v.value).replace(/\s*\n\s*/g, ' ').trim(); // remove whitespace
					if (options.stripEnclosingBraces) {
						val = val.replace(/^\{(.*)\}$/g, '$1');
					}
					if (options.dropAllCaps && val.match(/^[^a-z]+$/)) {
						val = titleCase(val);
					}
					if (options.escape) {
						val = escapeSpecialCharacters(val);
					}
					if (k === 'url' && options.encodeUrls) {
						val = val.replace(/\\_/g, '%5F');
					}
					if (k === 'pages') {
						val = val.replace(/(\d)\s*-\s*(\d)/, '$1--$2'); // replace single dash with double dash in page range
					}
					output = renderValue(val, v.datatype, options.curly);
					if (options.numeric) {
						if (val.match(/^[0-9]+$/)) {
							output = String(Number(val)).toLowerCase();
						} else if (k === 'month' && months.includes(val.slice(0, 3).toLowerCase())) {
							output = val.slice(0, 3).toLowerCase();
						}
					}
				}
				return `${indent}${k.padEnd(options.align - 1)} = ${output}`;
			});

			bibtex += `@${item.type.toLowerCase()}{${item.key ? `${item.key},` : ''}\n${props.join(',\n')}\n}\n`;
		}
	}

	let entries = items.filter(item => item.itemtype === 'entry');

	return { bibtex, warnings, entries };
};

const renderValue = (value, datatype, forceBrace) => {
	return datatype === 'braced' || forceBrace ? `{${value}}` :
		datatype === 'quoted' ? `"${value}"` : value;
};

export default { tidy, options };