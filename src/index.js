/* jshint node: true, esversion: 6, unused: true */
'use strict';

import parser from 'bibtex-parse';
import unicode from './unicode.tsv'; // source: https://raw.githubusercontent.com/pkgw/worklog-tools/master/unicode_to_latex.py

const options = { 
	omit: { description: 'Properties to remove (eg. abstract)', value: [] },
	curly: { description: 'Enclose property values in curly brackets', value: false },
	numeric: { description: 'Don\'t enclose numeric/month values', value: false },
	space: { description: 'Indent using n spaces', value: 2 },
	tab: { description: 'Indent using tabs', value: false },
	tex: { description: 'LaTeX contents to search for occurences within', value: '' },
	sort: { description: 'Sort entries alphabetically by id', value: false },
	merge: { description: 'Merge duplicate entries', value: false },
	stripEnclosingBraces: { description: 'Where an entire value is enclosed in double braces, remove the extra braces', value: false },
	dropAllCaps: { description: 'Where values are all caps, make them title case', value: false },
	escapeSpecialCharacters: { description: 'Escape special characters, such as umlaut', value: true },
	sortProperties: { description: 'Sort the properties within entries', value: false }
};

const defaults = {};
Object.entries(options).forEach(([k, { value }]) => defaults[k] = value);

const keyOrder = [
	'title', 'shorttitle', 'author', 'year', 'month', 'day', 'journal',
	'booktitle', 'location', 'on',  'publisher', 'address', 'series',
	'volume', 'number', 'pages', 'doi', 'isbn', 'issn', 'url', 
	'urldate', 'copyright', 'category', 'note', 'metadata'
];

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

const tidy = (input, options = {}) => {
	options = Object.assign({}, defaults, options);

	if (options.sort === true) { // if set to true, just sort by id
		options.sort = ['id'];
	}

	let entries = parser.parse(input),
		bibtex = '',
		duplicates = [],
		indent = options.tab ? '\t' : Array(options.space).fill(' ').join(''),
		hashes = [];
	for (let entry of entries) {
		if (entry.hasOwnProperty('id')) {
			if (options.sort) {
				entry.sortIndex = options.sort.map(k => (entry[k] || val(entry, k) || '').toLowerCase()).join(' ') + '9999999999';
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
			bibtex += `@string{${entry.key} = "${entry.value.value}"}\n`;
		} else if (entry.type === 'preamble') {
			bibtex += `@preamble{${entry.preamble.value}}\n`;
		} else if (entry.type === 'comment') {
			let comment = entry.comment.trim();
			if (comment) {
				bibtex += `${comment}\n`;
			}
		} else { // entry
			let props = Object.keys(entry.properties)
				.filter(k => !options.omit.includes(k));

			if (options.sortProperties) {
				props = props.sort((a, b) => {
					return keyOrder.includes(a) && keyOrder.includes(b) ? keyOrder.indexOf(a) - keyOrder.indexOf(b) :
							keyOrder.includes(a) ? -1 :
							keyOrder.includes(b) ? 1 : 0;
				});
			}
			props = props.map(k => {
				let v = entry.properties[k],
					output;
				if (v.concatinate) {
					output = v.concatinate.map(({ value, enclosed }) => enclosed ? `"${value}"` : value).join(' # ');
				} else {
					let val = String(v.value).replace(/\s*\n\s*/g, ' ').trim()
					if (options.stripEnclosingBraces) {
						val = val.replace(/^\{(.*)\}$/g, '$1');
					}
					if (options.dropAllCaps && val.match(/^[^a-z]+$/)) {
						val = titleCase(val);
					}
					if (options.escapeSpecialCharacters) {
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
				return `${indent}${k.padEnd(14)}= ${output}`;
			});

			bibtex += `@${entry.type.toLowerCase()}{${entry.id},\n${props.join(',\n')}\n}\n`;
		}
	}

	return { bibtex, duplicates };
};

export default { tidy, options };