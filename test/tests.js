/* jshint esversion: 6 */
const { test } = require('tap');
const { tidy } = require('..');
const fs = require('fs');
const path = require('path');

test('tidy (curly, numeric, merge, sort, omit)', t => {
	t.plan(1);

	const options = {
		curly: true,
		numeric: true,
		merge: true,
		sort: true,
		omit: ['weird-key']
	};

	let bib = fs.readFileSync(path.join(__dirname, '../example/input.bib'), 'utf8'),
		expected = fs.readFileSync(path.join(__dirname, 'expected-output1.bib'), 'utf8'),
		tidied = tidy(bib, options);

	t.same(tidied.bibtex, expected);
});


test('tidy (tabs, metadata)', t => {
	t.plan(1);

	const options = {
		tab: true,
		metadata: true,
		merge: false,
		numeric: false
	};

	let bib = fs.readFileSync(path.join(__dirname, '../example/input.bib'), 'utf8'),
		expected = fs.readFileSync(path.join(__dirname, 'expected-output2.bib'), 'utf8'),
		tidied = tidy(bib, options);

	t.same(tidied.bibtex, expected);
});
