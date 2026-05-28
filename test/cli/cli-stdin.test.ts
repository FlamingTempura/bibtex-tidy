import { spawnSync } from "node:child_process";
import { BIN_PATH } from "./support/cli.ts";

const input = `@article{a,
    number={1},
    title={A}
}`;

const output = `@article{a,
  number        = {1},
  title         = {A}
}
`;

test("CLI should accept stdin", async () => {
	const proc = spawnSync(BIN_PATH, [], { input, encoding: "utf8" });
	expect(proc.stdout).toBe(output);
});

test("CLI should throw if specifying --backup with stdin", async () => {
	const proc = spawnSync(BIN_PATH, ["--backup"], { input, encoding: "utf8" });
	expect(proc.stderr).toMatch(
		/--backup is only valid when specifying input files/,
	);
	expect(proc.stdout).toBe("");
	expect(proc.status).toBe(1);
});

test("CLI should throw if specifying --modify with stdin", async () => {
	const proc = spawnSync(BIN_PATH, ["--modify"], { input, encoding: "utf8" });
	expect(proc.stderr).toMatch(
		/--modify\/-m is only valid when specifying input files/,
	);
	expect(proc.stdout).toBe("");
	expect(proc.status).toBe(1);
});
