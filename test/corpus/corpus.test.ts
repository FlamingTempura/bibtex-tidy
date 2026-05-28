import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { tidy } from "../../bibtex-tidy.js";

const CORPUS_DIR = import.meta.dirname;

function alphaNumOnly(str: string): string {
	return (
		str
			.replace(/\W/g, "")
			.toLowerCase()
			.match(/.{1,50}/g)
			?.join("\n") ?? ""
	);
}

async function findBibFiles(dir: string): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const path = join(dir, entry.name);
			if (entry.isDirectory()) return findBibFiles(path);
			return path.endsWith(".bib") ? [path] : [];
		}),
	);
	return files.flat().sort();
}

const files = await findBibFiles(CORPUS_DIR);

describe("corpus", () => {
	for (const file of files) {
		test(file, async () => {
			const input = await readFile(file, "utf8");

			const result = tidy(input, {
				escape: false,
				removeDuplicateFields: false,
			});

			expect(alphaNumOnly(result.bibtex)).toBe(alphaNumOnly(input));
		});
	}
});
