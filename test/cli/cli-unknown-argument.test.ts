import { spawnSync } from "node:child_process";
import { BIN_PATH } from "../support/cli.ts";

test("CLI should warn if an unknown argument is provided", async () => {
	const proc = spawnSync(BIN_PATH, ["--foobar"], { encoding: "utf8" });
	expect(proc.status).toBe(1);
	expect(proc.stderr).toMatch(/Unknown option: --foobar/);
});
