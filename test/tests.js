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
		sortProperties: true,
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
		numeric: false,
		sortProperties: true
	};

	let bib = fs.readFileSync(path.join(__dirname, '../example/input.bib'), 'utf8'),
		expected = fs.readFileSync(path.join(__dirname, 'expected-output2.bib'), 'utf8'),
		tidied = tidy(bib, options);

	t.same(tidied.bibtex, expected);
});

test('escape characters', t => {
	t.plan(1);

	let bibtex = `@article{a,
  booktitle     = {bl%ah},
  title         = {bl@ah},
  author        = {bl&ah},
  thing         = {blæh}
}`;

	let bibtexClean = `@article{a,
  booktitle     = {bl\\%ah},
  title         = {bl\\@ah},
  author        = {bl\\&ah},
  thing         = {bl\\ae{}h}
}`;

	t.same(tidy(bibtex).bibtex, bibtexClean);
});

test('strip enclosing nested brace', t => {
	t.plan(1);

	let bibtex = `@article{a,
  booktitle     = {{blah}},
  journal     = {not {blah}},
  month = {{nov}},
  thing = {BLAH BLAH 1990}
}`;

	let bibtexClean = `@article{a,
  booktitle     = {blah},
  journal       = {not {blah}},
  month         = nov,
  thing         = {Blah Blah 1990}
}`;
	const options = {
		stripEnclosingBraces: true,
		dropAllCaps: true,
		numeric: true
	};

	t.same(tidy(bibtex, options).bibtex, bibtexClean);
});

test('invalid month', t => {
	t.plan(1);

	let bibtex = `@article{a,
  month = {nov 12}
}`;

	let bibtexClean = `@article{a,
  month         = {nov 12}
}`;

	t.same(tidy(bibtex, { numeric: true }).bibtex, bibtexClean);
});