import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { BIN_PATH, tmpfile } from "../support/cli.ts";

const input = "@article{a,number={1},title={A}}";

test("CLI should allowing creating backup in modify mode", async () => {
	const path = await tmpfile(input);
	spawnSync(BIN_PATH, [path, "--modify", "--backup"], { encoding: "utf8" });
	expect(await readFile(`${path}.original`, "utf8")).toBe(input);
});

test("CLI should error if creating backup in non-modify mode", async () => {
	const path = await tmpfile(input);
	const proc = spawnSync(BIN_PATH, [path, "--output", "foo.bib", "--backup"], {
		encoding: "utf8",
	});
	expect(await readFile(path, "utf8")).toBe(input);
	expect(proc.stderr).toMatch(
		/--backup is only permitted when --modify\/-m is provided/,
	);
	expect(proc.stdout).toBe("");
	expect(proc.status).toBe(1);
});

test("CLI should create backup by default in legacy modify mode", async () => {
	const path = await tmpfile(input);
	spawnSync(BIN_PATH, [path], { encoding: "utf8" });
	expect(await readFile(`${path}.original`, "utf8")).toBe(input);
});
