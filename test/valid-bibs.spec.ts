import { strictEqual } from "node:assert";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { bibtexTidy, test } from "./utils";

async function testBibsInDir(path: string): Promise<void> {
	const validfiles = await readdir(path);
	for (const file of validfiles) {
		if (!file.endsWith(".bib")) continue;
		const bibtex = await readFile(join(path, file), "utf8");

		// try to tidy the file. if there's an error, the test handler with fail.
		try {
			const result = await bibtexTidy(
				bibtex,
				{ escape: false, removeDuplicateFields: false },
				["api"],
			);

			// check that output is semantically the same as the input
			strictEqual(alphaNumOnly(result.bibtex ?? ""), alphaNumOnly(bibtex));
		} catch (e) {
			console.error(`Failed on ${join(path, file)}`);
			throw e;
		}
	}
}
function alphaNumOnly(str: string): string {
	return (
		str
			.replace(/\W/g, "")
			.toLowerCase()
			.match(/.{1,50}/g)
			?.join("\n") ?? ""
	);
}

// Credit to https://github.com/retorquere/zotero-better-bibtex
test("Test bibtex files from Better BibTeX", async () => {
	await testBibsInDir(join(__dirname, "bibliographies", "better-bibtex"));
});

// Credit to https://github.com/sciunto-org/python-bibtexparser
test("Test bibtex files from python-bibtexparser", async () => {
	await testBibsInDir(join(__dirname, "bibliographies", "python-bibtexparser"));
});

// Credit to https://github.com/renanbr/bibtex-parser
test("Test bibtex files from php-bibtex-parser", async () => {
	await testBibsInDir(join(__dirname, "bibliographies", "php-bibtex-parser"));
});

// Credit to https://github.com/apcshields/autocomplete-bibtex
test("Test bibtex files from autocomplete-bibtex", async () => {
	await testBibsInDir(join(__dirname, "bibliographies", "autocomplete-bibtex"));
});

// Credit to https://github.com/borisveytsman/BibTeXPerlLibs
test("Test bibtex files from BibTeXPerlLibs", async () => {
	await testBibsInDir(join(__dirname, "bibliographies", "bibtex-perl-libs"));
});

// Credit to https://github.com/plk/biblatex
test("Test bibtex files from biblatex", async () => {
	await testBibsInDir(join(__dirname, "bibliographies", "biblatex"));
});

// Credit to https://github.com/plk/biber
test("Test bibtex files from biber", async () => {
	await testBibsInDir(join(__dirname, "bibliographies", "biber"));
});

test("Test bibtex files from unknown origins", async () => {
	await testBibsInDir(join(__dirname, "bibliographies", "others"));
});
