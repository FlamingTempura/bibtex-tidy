/* jshint node: true, esversion: 6, unused: true */
'use strict';

import parser from 'bibtex-parse';
import unicode from './unicode.tsv'; // source: https://raw.githubusercontent.com/pkgw/worklog-tools/master/unicode_to_latex.py

const defaultPropertyOrder = [
	'title', 'shorttitle', 'author', 'year', 'month', 'day', 'journal',
	'booktitle', 'location', 'on',  'publisher', 'address', 'series',
	'volume', 'number', 'pages', 'doi', 'isbn', 'issn', 'url', 
	'urldate', 'copyright', 'category', 'note', 'metadata'
];

const options = { 
	omit: {
		name: 'Remove specified properties',
		description: 'Provide a list of properties which should be removed from every bibliography entry.',
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
		title: 'Indent with spaces',
		description: 'Providing a number causes all properties to be prefixed with the corresponding number of spaces. This is ignored if tab is true.',
		type: 'number',
		value: 2
	},
	tab: { 
		name: 'Indent with tabs',
		description: 'If this is set then all properties will be prefixed with a tab.',
		type: 'boolean',
		value: false
	},
	align: {
		name: 'Align values',
		description: 'Insert whitespace between properties and values so that values are visually aligned.',
		type: 'number',
		value: 14
	},
	sort: {
		name: 'Sort bibliography entries',
		description: 'Sort entries alphabetically by id (or other provided properties).',
		type: 'array',
		value: false
	},
	merge: { 
		title: 'Merge duplicate entries',
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
	sortProperties: {
		name: 'Sort properties',
		description: `Sort the properties within entries. The default sort order is ${defaultPropertyOrder.join(', ')}. Alternatively you can specify space delimited properties.`,
		type: 'array',
		value: false
	},
	stripComments: {
		name: 'Remove comments',
		description: 'Remove all comments from the bibtex source.',
		type: 'boolean',
		value: false
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

const val = (e, prop) => e.properties[prop] && e.properties[prop].value ? e.properties[prop].value.replace(/\W/g, '').toLowerCase() : null;

const inc = (collection, key) => collection[key] = (collection[key] || 0) + 1;

const tidy = (input, options = {}) => {
	options = { ...defaults, ...options }; // make a copy of options with defaults

	if (options.sort === true) {
		options.sort = ['id'];
	}
	if (options.sortProperties === true) {
		options.sortProperties = defaultPropertyOrder;
	}
	if (options.omit === false) {
		options.omit = [];
	}
	if (options.align === false) {
		options.align = 1;
	}

	let entries = parser.parse(input),
		bibtex = '',
		duplicates = [],
		indent = options.tab ? '\t' : Array(options.space).fill(' ').join(''),
		hashes = [],
		proceedings = {},
		publishers = {},
		journals = {};
	for (let entry of entries) {
		if (entry.hasOwnProperty('id')) { // ie. not a comment, preamble, or string
			if (entry.properties.booktitle) { inc(proceedings, entry.properties.booktitle.value); }
			if (entry.properties.journal) { inc(journals, entry.properties.journal.value); }
			if (entry.properties.publisher) { inc(publishers, entry.properties.publisher.value); }
			if (options.sort) {
				entry.sortIndex = options.sort.map(k => (entry[k] || val(entry, k) || '\ufff0').toLowerCase()).join(' ') + '9999999999'; // \ufff0 ensures entry will sorted last
			}
			if (options.merge) {
				let hash = {
						entry,
						doi: val(entry, 'doi'),
						abstract: val(entry, 'abstract') ? val(entry, 'abstract').slice(0, 100) : null,
						authorTitle: (val(entry, 'author') ? entry.properties.author.value.match(/([^\s]+)\s*(,|and |et |$)/)[1] : '') + ':' + // surname (comes before comma or 'and')
							(val(entry, 'title') || '').slice(0, 50)
					},
					duplicate = hashes.find(h => hash.doi && hash.doi === h.doi ||
							hash.abstract && hash.abstract === h.abstract ||
							hash.authorTitle === h.authorTitle);
				if (duplicate) {
					duplicates.push({ entry, duplicateOf: duplicate.entry });
					for (let k of Object.keys(entry.properties)) {
						if (!duplicate.entry.properties[k]) {
							duplicate.entry.properties[k] = entry.properties[k];
						}
					}
				} else {
					hashes.push(hash);
				}
			}
		}
	}

	if (options.sort) { // accepts an array of keys to sort by
		let sortIndex;
		entries = entries.reverse()
			.map((entry, i) => {
				if (entry.sortIndex) {
					sortIndex = entry.sortIndex;
				} else {
					entry.sortIndex = sortIndex ? sortIndex.slice(0, -10) + (10000000-i) : 'z';
				}
				return entry;
			})
			.sort((a, b) => a.sortIndex < b.sortIndex ? -1 : a.sortIndex > b.sortIndex ? 1 : 0);
	}

	for (let entry of entries) {
		if (duplicates.find(d => d.entry === entry)) {
			continue;
		}
		if (entry.type === 'string') {
			bibtex += `@string{${entry.raw}}\n`; // keep strings as they were
		} else if (entry.type === 'preamble') {
			bibtex += `@preamble{${entry.raw}}\n`; // keep preambles as they were
		} else if (entry.type === 'comment') {
			let comment = entry.comment.trim();
			if (comment && !options.stripComments) {
				bibtex += `${comment}\n`;
			}
		} else { // entry
			let props = Object.keys(entry.properties).filter(k => !options.omit.includes(k));

			if (options.sortProperties) {
				props = props.sort((a, b) => {
					let indexA = options.sortProperties.indexOf(a),
						indexB = options.sortProperties.indexOf(b);
					return indexA > -1 && indexB > -1 ? indexA - indexB : indexA > -1 ? -1 : indexB > -1 ? 1 : 0;
				});
			}
			props = props.map(k => {
				let v = entry.properties[k],
					output;
				if (v.concatinate) {
					output = v.concatinate.map(({ value, enclosed }) => enclosed ? `"${value}"` : value).join(' # ');
				} else {
					let val = String(v.value).replace(/\s*\n\s*/g, ' ').trim();
					if (options.stripEnclosingBraces) {
						val = val.replace(/^\{(.*)\}$/g, '$1');
					}
					if (options.dropAllCaps && val.match(/^[^a-z]+$/)) {
						val = titleCase(val);
					}
					if (options.escape) {
						val = escapeSpecialCharacters(val);
					}
					if (k === 'pages') {
						val = val.replace(/(\d)\s*-\s*(\d)/, '$1--$2'); // replace single dash with double dash in page range
					}
					output = v.enclosed === 'curly' || options.curly ? `{${val}}` : v.enclosed === 'quote' ? `"${val}"` : val;
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

			bibtex += `@${entry.type.toLowerCase()}{${entry.id},\n${props.join(',\n')}\n}\n`;
		}
	}

	return { bibtex, duplicates, entries: entries.filter(d => d.id), proceedings, publishers, journals };
};

export default { tidy, options };