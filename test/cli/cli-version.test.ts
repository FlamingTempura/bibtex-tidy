import { spawnSync } from "node:child_process";
import { BIN_PATH } from "./support/cli.ts";

test("CLI version", async () => {
	const proc = spawnSync(BIN_PATH, ["--version"], { encoding: "utf8" });
	expect(proc.stdout).toMatch(/^v\d+\.\d+.\d+\n$/);
});
