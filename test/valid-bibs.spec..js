import { test } from './utils';
import fs from 'fs';

const validfiles = fs.readdirSync(`${__dirname}/bibliographies`).slice(0, 10);
for (const file of validfiles) {
	if (!file.endsWith('.bib')) continue;
	const bibtex = fs.readFileSync(`${__dirname}/bibliographies/${file}`, 'utf8');
	test(`valid bib: ${file}`, (t, tidy) => {
		// try to tidy the file. if there's an error, the test handler with fail.
		tidy(bibtex, {
			omit: Math.random > 0.5 ? ['author'] : null,
			escape: Math.random() > 0.5,
			curly: Math.random() > 0.5,
			numeric: Math.random() > 0.5,
			space: Math.random() > 0.5 ? 2 : 4,
			tab: Math.random() > 0.5,
			align: Math.random() > 0.5 ? 0 : 10,
			sort: Math.random() > 0.5,
			merge: Math.random() > 0.5,
			stripEnclosingBraces: Math.random() > 0.5,
			dropAllCaps: Math.random() > 0.5,
			sortFields: Math.random() > 0.5,
			stripComments: Math.random() > 0.5,
			encodeUrls: Math.random() > 0.5,
			tidyComments: Math.random() > 0.5
		});
	});
}
