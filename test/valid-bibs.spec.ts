import { bibtexTidy, test } from './utils';
import fs from 'fs';
import { strictEqual } from 'assert';

const validfiles = fs.readdirSync(`${__dirname}/bibliographies`);
for (const file of validfiles) {
	if (!file.endsWith('.bib')) continue;
	const bibtex = fs.readFileSync(`${__dirname}/bibliographies/${file}`, 'utf8');
	test(`valid bib: ${file}`, async () => {
		// try to tidy the file. if there's an error, the test handler with fail.
		const result = await bibtexTidy(
			bibtex,
			{ escape: false, removeDuplicateFields: false },
			['api']
		);
		// check that output is semantically the same as the input
		strictEqual(alphaNumOnly(result.bibtex ?? ''), alphaNumOnly(bibtex));
	});
}

function alphaNumOnly(str: string): string {
	return (
		str
			.replace(/\W/g, '')
			.toLowerCase()
			.match(/.{1,50}/g)
			?.join('\n') ?? ''
	);
}
