import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { BIN_PATH, tmpfile } from "./support/cli.ts";

const input = `
@article{a,
    number={1},
    title={A}
}`;

const output = `@article{a,
  number        = {1},
  title         = {A}
}
`;

test("CLI should modify input file when --modify is specified", async () => {
	const path = await tmpfile(input);
	const proc = spawnSync(BIN_PATH, [path, "--modify"], { encoding: "utf8" });
	expect(proc.stdout).toMatch(/Tidying.../);
	expect(await readFile(path, "utf8")).toBe(output);
});

test("CLI should modify input file when --m is specified", async () => {
	const path = await tmpfile(input);
	const proc = spawnSync(BIN_PATH, [path, "-m"], { encoding: "utf8" });
	expect(proc.stdout).toMatch(/Tidying.../);
	expect(await readFile(path, "utf8")).toBe(output);
});

test("CLI should allow modifying multiple input files", async () => {
	const path1 = await tmpfile(input);
	const path2 = await tmpfile(input);
	const proc = spawnSync(BIN_PATH, [path1, path2, "-m"], { encoding: "utf8" });
	expect(proc.stdout).toMatch(/Tidying.../);
	expect(await readFile(path1, "utf8")).toBe(output);
	expect(await readFile(path2, "utf8")).toBe(output);
});

test("CLI should not allow an output path and modified mode", async () => {
	const path = await tmpfile(input);
	const proc = spawnSync(BIN_PATH, [path, "-m", "--output", "foo"], {
		encoding: "utf8",
	});
	expect(proc.stderr).toMatch(/--modify\/-m is not valid when specifying an output file/);
	expect(await readFile(path, "utf8")).toBe(input);
});
