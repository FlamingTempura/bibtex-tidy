import { spawnSync } from "node:child_process";
import { BIN_PATH, tmpfile } from "./support/cli.ts";

const input = `@article{a,
    number={1}
}`;

const output = `@article{a,
  number        = {1}
}
`;

test("input paths with spaces", async () => {
	const path = await tmpfile(input, "foo bar.bib");
	const proc = spawnSync(BIN_PATH, [path, "--v2"], { encoding: "utf8" });
	expect(proc.stdout).toBe(output);
});
