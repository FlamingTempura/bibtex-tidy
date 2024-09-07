import { match } from "node:assert";
import { spawnSync } from "node:child_process";
import { BIN_PATH } from "./targets/cli";
import { test } from "./utils";

test("CLI version", async () => {
	const proc = spawnSync(BIN_PATH, ["--version"], { encoding: "utf8" });
	match(proc.stdout, /^v\d+\.\d+.\d+\n$/);
});
