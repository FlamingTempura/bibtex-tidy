// When passing "-" as a filename on the command line the output should also go to stdout.
// Expected behaviour: the following command should output the formatted file to stdout.
//
// $ cat mybib.bib | bibtex-tidy --quiet -

import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { BIN_PATH, tmpfile } from "../support/cli.ts";

const input = `@article{a,
    number={1},
    title={A}
}`;

const output = `@article{a,
  number        = {1},
  title         = {A}
}
`;

test('CLI should accept stdin with "-" and show deprecated warning', () => {
	const proc = spawnSync(BIN_PATH, ["-"], { input, encoding: "utf8" });
	expect(proc.stderr).toMatch(
		/Interpreting "-" as stdin. NOTICE: as of v1.10.0 "-" can be omitted and will be invalid in v2. Stdin is read when no input file is specified./,
	);
	expect(proc.stdout).toBe(output);
});

test('CLI should not accept input files when specifying "-"', () => {
	const proc = spawnSync(BIN_PATH, ["-", "foo"], { input, encoding: "utf8" });
	expect(proc.stderr).toMatch(/Input files cannot be specified with "-"/);
});

test("CLI should modify input file by default (deprecated, will not modify in v2)", async () => {
	const path = await tmpfile(input);
	const proc = spawnSync(BIN_PATH, [path], {
		encoding: "utf8",
		stdio: ["inherit", "pipe", "pipe"],
	});
	expect(proc.stdout).toMatch(/Tidying.../);
	expect(proc.stderr).toMatch(
		/NOTICE: In v2 you will need to specify --modify/,
	);
	expect(await readFile(path, "utf8")).toBe(output);
});

test("CLI should create backup in deprecated modify-by-default mode", async () => {
	const path = await tmpfile(input);
	spawnSync(BIN_PATH, [path], {
		encoding: "utf8",
		stdio: ["inherit", "pipe", "pipe"],
	});
	expect(await readFile(`${path}.original`, "utf8")).toBe(input);
});
