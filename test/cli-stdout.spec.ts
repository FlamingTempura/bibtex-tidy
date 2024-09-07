import { strictEqual } from "node:assert";
import { spawnSync } from "node:child_process";
import { BIN_PATH } from "./targets/cli";
import { bibtex, test } from "./utils";

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

test("CLI should output to stdout if no out file specified", async () => {
	const proc = spawnSync(BIN_PATH, [], { input, encoding: "utf8" });
	strictEqual(proc.stdout, output);
});
