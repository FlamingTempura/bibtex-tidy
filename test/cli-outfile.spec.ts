import { strictEqual } from "node:assert";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { BIN_PATH } from "./targets/cli";
import { bibtex, test, tmpfile } from "./utils";

const input = bibtex`
@article{a,
    number={1},
    title={A}
}`;

const output = bibtex`
@article{a,
  number        = {1},
  title         = {A}
}
`;

test("CLI should output to specified file", async () => {
	const infile = await tmpfile(input);
	const outfile = await tmpfile("");
	spawnSync(BIN_PATH, [infile, "--output", outfile], { encoding: "utf8" });
	strictEqual(await readFile(infile, "utf8"), input);
	strictEqual(await readFile(outfile, "utf8"), output);
});

test("CLI should output to specified file (from stdin)", async () => {
	const outfile = await tmpfile("");
	spawnSync(BIN_PATH, ["--output", outfile], {
		input,
		encoding: "utf8",
	});
	strictEqual(await readFile(outfile, "utf8"), output);
});
