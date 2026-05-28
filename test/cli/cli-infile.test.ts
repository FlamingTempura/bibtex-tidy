import { spawnSync } from "node:child_process";
import { BIN_PATH, tmpfile } from "./support/cli.ts";

const input = `@article{a,
    number={1},
    title={A}
}`;

const output = `@article{a,
  number        = {1},
  title         = {A}
}
`;

test("CLI should accept input from a file (v2 flag)", async () => {
	const path = await tmpfile(input);
	const proc = spawnSync(BIN_PATH, [path, "--v2"], { encoding: "utf8" });
	expect(proc.stdout).toBe(output);
});

test("CLI should not allow multiple input files without --modify (v2 flag)", async () => {
	const path1 = await tmpfile(input);
	const path2 = await tmpfile(input);
	const proc = spawnSync(BIN_PATH, [path1, path2, "--v2"], {
		encoding: "utf8",
	});
	expect(proc.status).toBe(1);
	expect(proc.stderr).toMatch(/Only one input file permitted unless using --modify\/-m/);
});
