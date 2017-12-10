// Re-writes given .bib file in a tidy structure
/* jshint node: true, esversion: 6, unused: true */
'use strict';

import parser from 'bibtex-parse';

const keyOrder = [
	'title', 'shorttitle', 'author', 'year', 'month', 'day', 'journal',
	'booktitle', 'location', 'on',  'publisher', 'address', 'series',
	'volume', 'number', 'pages', 'doi', 'isbn', 'issn', 'url', 
	'urldate', 'copyright', 'category', 'note', 'metadata'
];

const inc = (collection, key) => collection[key] = (collection[key] || 0) + 1;

const occurrences = (string = '', subString = '') => {
	if (subString.length <= 0) { return (string.length + 1); }
	let n = 0,
		pos = 0;
	while (true) {
		pos = string.indexOf(subString, pos);
		if (pos >= 0) {
			++n;
			pos += subString.length;
		} else break;
	}
	return n;
};

const tidy = (input, { omit = [], curly = false, numeric = false, space = 2, tab = false, tex = '', metadata = false, sort = false } = {}) => {
	let result = parser.parse(input),
		entries = result.entries,
		proceedings = {},
		publishers = {},
		journals = {},
		indent = tab ? '\t' : Array(space).fill(' ').join('');

	entries.forEach(entry => {
		if (entry.properties.booktitle) { inc(proceedings, entry.properties.booktitle.value); }
		if (entry.properties.journal) { inc(journals, entry.properties.journal.value); }
		if (entry.properties.publisher) { inc(publishers, entry.properties.publisher.value); }
	});

	if (sort) {
		entries = entries.sort((a, b) => {
			a = a.id.toLowerCase();
			b = b.id.toLowerCase();
			return a < b ? -1 : a > b ? 1 : 0;
		});
	}
	let bibtex = '';
	bibtex += result.commentsBefore.map(c => `%${c}\n`).join('');

	if (result.preamble) {
		let braced = result.preamble.brace === 'curly' ? `{${result.preamble.value}}` : `"${result.preamble.value}"`;
		bibtex += `@preamble{${braced}}\n`;
	}

	bibtex += entries.map(entry => {
		entry.citations = occurrences(tex, entry.id);
		if (metadata) {
			entry.properties.metadata = {
				brace: 'curly',
				value: `citations: ${entry.citations}`
			};
			if (entry.properties.booktitle) { entry.properties.metadata.value += `, bookcount: ${proceedings[entry.properties.booktitle.value]}`; }
			if (entry.properties.journal) { entry.properties.metadata.value += `, journalcount: ${journals[entry.properties.journal.value]}`; }
			if (entry.properties.publisher) { entry.properties.metadata.value += `, publishercount: ${publishers[entry.properties.publisher.value]}`; }
		}
		let props = Object.keys(entry.properties)
			.filter(k => !omit.includes(k))
			.sort((a, b) => {
				return keyOrder.includes(a) && keyOrder.includes(b) ? keyOrder.indexOf(a) - keyOrder.indexOf(b) :
						keyOrder.includes(a) ? -1 :
						keyOrder.includes(b) ? 1 : 0;
			})
			.map(k => {
				let v = entry.properties[k],
					val = String(v.value).replace(/\n/g, ' '),
					braced = v.brace === 'curly' || curly ? `{${val}}` : v.brace === 'quote' ? `"${val}"` : val;
				if (numeric && (String(Number(val)) === val || k === 'month')) {
					braced = String(val).toLowerCase();
				}
				return `${indent}${k.padEnd(14)}= ${braced}`;
			});
		return entry.comments.map(c => `%${c}\n`).join('') +
			`@${entry.type.toLowerCase()}{${entry.id},\n${props.join(',\n')}\n}`;
	}).join('\n');

	bibtex += result.commentsAfter.map(c => `%${c}\n`).join('');

	return { entries, bibtex, proceedings, publishers, journals };
};

export default { tidy };