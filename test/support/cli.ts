import { randomBytes } from "node:crypto";
import { mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const TMP_DIR = tmpdir();
export const BIN_PATH =
	process.env.BIBTEX_TIDY_BIN ??
	join(import.meta.dirname, "..", "..", "bin", "bibtex-tidy");

mkdirSync(TMP_DIR, { recursive: true });

export async function tmpfile(
	bibtex: string,
	filename?: string,
): Promise<string> {
	const file = join(
		TMP_DIR,
		filename ?? `tmp${randomBytes(16).toString("hex")}.bib`,
	);
	await writeFile(file, bibtex);
	return file;
}
