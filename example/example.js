/* jshint esversion: 6 */
const bibtexTidy = require('..');
const fs = require('fs');
const path = require('path');

const options = {
	curly: true,
	numeric: true,
	merge: true,
	sort: true,
	omit: ['weird-key']
};

let bib = fs.readFileSync(path.join(__dirname, 'input.bib'), 'utf8'),
	tidied = bibtexTidy.tidy(bib, options);

fs.writeFileSync(path.join(__dirname, 'output.bib'), tidied.bibtex, 'utf8');
