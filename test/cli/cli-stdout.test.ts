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

test("CLI should output to stdout if no out file specified", async () => {
	const proc = spawnSync(BIN_PATH, [], { input, encoding: "utf8" });
	expect(proc.stdout).toBe(output);
});
