import { spawnSync } from "node:child_process";
import { BIN_PATH } from "./support/cli.ts";

test("CLI help", async () => {
	const proc1 = spawnSync(BIN_PATH, [], {
		encoding: "utf8",
		//HACK to prevent stdin being detected
		env: { ...process.env, PRE_COMMIT: "1" },
	});

	const proc2 = spawnSync(BIN_PATH, ["--help"], { encoding: "utf8" });

	expect(proc1.stdout).toBe(proc2.stdout);
	expect(proc1.stdout).toMatch(/cleaner and formatter/i);
	expect(proc1.stdout).toMatch(/Examples/i);
	expect(proc1.stdout).toMatch(/--space/i);
});
