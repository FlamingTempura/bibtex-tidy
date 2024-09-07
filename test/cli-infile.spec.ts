import { match, strictEqual } from "node:assert";
import { spawnSync } from "node:child_process";
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

test("CLI should accept input from a file (v2 flag)", async () => {
	const path = await tmpfile(input);
	const proc1 = spawnSync(BIN_PATH, [path, "--v2"], { encoding: "utf8" });
	strictEqual(proc1.stdout, output);
});

test("CLI should not allow multiple input files without --modify (v2 flag)", async () => {
	const path1 = await tmpfile(input);
	const path2 = await tmpfile(input);
	const proc1 = spawnSync(BIN_PATH, [path1, path2, "--v2"], {
		encoding: "utf8",
	});
	strictEqual(proc1.status, 1);
	match(
		proc1.stderr,
		/Only one input file permitted unless using --modify\/-m/,
	);
});
