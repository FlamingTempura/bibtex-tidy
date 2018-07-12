/* jshint node: true, esversion: 6, unused: true */
'use strict';

import parser from 'bibtex-parse';

const keyOrder = [
	'title', 'shorttitle', 'author', 'year', 'month', 'day', 'journal',
	'booktitle', 'location', 'on',  'publisher', 'address', 'series',
	'volume', 'number', 'pages', 'doi', 'isbn', 'issn', 'url', 
	'urldate', 'copyright', 'category', 'note', 'metadata'
];

const escape = str => str.replace(/([^\\])%/g, '$1\\%');

const val = (e, prop) => e.properties[prop] && e.properties[prop].value ? e.properties[prop].value.replace(/\W/g, '').toLowerCase() : null;

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

const tidy = (input, { omit = [], curly = false, numeric = false, space = 2, tab = false, tex = '', metadata = false, sort = false, merge = true } = {}) => {
	let result = parser.parse(input),
		entries = result.entries,
		proceedings = {},
		publishers = {},
		journals = {},
		duplicates = [],
		indent = tab ? '\t' : Array(space).fill(' ').join('');

	let hashes = [];
	entries.forEach(entry => {
		if (entry.properties.booktitle) { inc(proceedings, entry.properties.booktitle.value); }
		if (entry.properties.journal) { inc(journals, entry.properties.journal.value); }
		if (entry.properties.publisher) { inc(publishers, entry.properties.publisher.value); }
		if (merge) {
			let hash = {
				entry,
				doi: val(entry, 'doi'),
				abstract: val(entry, 'abstract') ? val(entry, 'abstract').slice(0, 100) : null,
				authorTitle: (val(entry, 'author') ? entry.properties.author.value.match(/([^\s]+)\s*(,|and |et |$)/)[1] : '') + ':' + // surname (comes before comma or 'and')
					(val(entry, 'title') || '').slice(0, 50)
			};
			let duplicate = hashes.find(h => {
				return hash.doi && hash.doi === h.doi ||
					hash.abstract && hash.abstract === h.abstract ||
					hash.authorTitle === h.authorTitle;
			});
			if (duplicate) {
				duplicates.push({ entry, duplicateOf: duplicate.entry });
				Object.keys(entry.properties).forEach(k => {
					if (!duplicate.entry.properties[k]) { duplicate.entry.properties[k] = entry.properties[k]; }
				});
			} else {
				hashes.push(hash);
			}
		}
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

	bibtex += entries
		.filter(entry => !duplicates.find(d => d.entry === entry))
		.map(entry => {
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
						val = escape(String(v.value).replace(/\n/g, ' ')),
						braced = v.brace === 'curly' || curly ? `{${val}}` : v.brace === 'quote' ? `"${val}"` : val;
					if (numeric && (val.match(/^[0-9]+$/) || k === 'month')) {
						braced = String(val).toLowerCase();
					}
					return `${indent}${k.padEnd(14)}= ${braced}`;
				});
			return entry.comments.map(c => `%${c}\n`).join('') +
				`@${entry.type.toLowerCase()}{${entry.id},\n${props.join(',\n')}\n}`;
		})
		.join('\n');

	bibtex += result.commentsAfter.map(c => `%${c}\n`).join('');

	return { entries, bibtex, proceedings, publishers, journals, duplicates };
};

export default { tidy };