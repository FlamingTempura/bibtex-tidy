import { match, strictEqual } from "node:assert";
import { spawnSync } from "node:child_process";
import { BIN_PATH } from "./targets/cli";
import { test } from "./utils";

test("CLI help", async () => {
	const proc1 = spawnSync(BIN_PATH, [], {
		encoding: "utf8",
		stdio: ["inherit", "pipe", "pipe"],
	});
	const proc2 = spawnSync(BIN_PATH, ["--help"], { encoding: "utf8" });

	strictEqual(proc1.stdout, proc2.stdout);
	match(proc1.stdout, /cleaner and formatter/i);
	match(proc1.stdout, /Examples/i);
	match(proc1.stdout, /--space/i);
});
