import { match, strictEqual } from "node:assert";
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

test("CLI should modify input file when --modify is specified", async () => {
	const path = await tmpfile(input);
	const proc1 = spawnSync(BIN_PATH, [path, "--modify"], { encoding: "utf8" });
	match(proc1.stdout, /Tidying.../);
	strictEqual(await readFile(path, "utf8"), output);
});

test("CLI should modify input file when --m is specified", async () => {
	const path = await tmpfile(input);
	const proc1 = spawnSync(BIN_PATH, [path, "-m"], { encoding: "utf8" });
	match(proc1.stdout, /Tidying.../);
	strictEqual(await readFile(path, "utf8"), output);
});

test("CLI should allow modifying multiple input files", async () => {
	const path1 = await tmpfile(input);
	const path2 = await tmpfile(input);
	const proc1 = spawnSync(BIN_PATH, [path1, path2, "-m"], { encoding: "utf8" });
	match(proc1.stdout, /Tidying.../);
	strictEqual(await readFile(path1, "utf8"), output);
	strictEqual(await readFile(path2, "utf8"), output);
});

test("CLI should not allow an output path and modified mode", async () => {
	const path = await tmpfile(input);
	const proc1 = spawnSync(BIN_PATH, [path, "-m", "--output", "foo"], {
		encoding: "utf8",
	});
	match(
		proc1.stderr,
		/--modify\/-m is not valid when specifying an output file/,
	);
	strictEqual(await readFile(path, "utf8"), input);
});
