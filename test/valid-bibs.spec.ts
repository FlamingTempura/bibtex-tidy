import { bibtexTidy, test } from './utils';
import fs from 'fs';

const validfiles = fs.readdirSync(`${__dirname}/bibliographies`);
for (const file of validfiles) {
	if (!file.endsWith('.bib')) continue;
	const bibtex = fs.readFileSync(`${__dirname}/bibliographies/${file}`, 'utf8');
	test(`valid bib: ${file}`, async () => {
		// try to tidy the file. if there's an error, the test handler with fail.
		await bibtexTidy(bibtex, {}, ['api']);
	});
}
