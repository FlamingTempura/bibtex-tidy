import { equal } from "node:assert";
import { spawn } from "node:child_process";
import { join } from "node:path";
import test from "node:test";
import { optionsToCLIArgs } from "../../../src/optionsToCLIArgs.ts";
import type { CLIOptions } from "../../../src/optionUtils.ts";
import type { Spec } from "./utils.ts";

const BIN_PATH = join("bin", "bibtex-tidy");

type CLIResult = {
	output: string;
	warnings: string[];
};

/**
 * Run bibtex-tidy through command line. Unlike API, this accepts multiple
 * bibtex files.
 */
async function testCLI(
	input: string,
	options: CLIOptions = {},
): Promise<CLIResult> {
	const result = await new Promise<{ stdout: string; stderr: string }>(
		(resolve, reject) => {
			const proc = spawn(BIN_PATH, optionsToCLIArgs(options), {
				timeout: 100000,
				stdio: "pipe",
			});
			proc.stdin.write(input);
			proc.stdin.end();
			let stdout = "";
			let stderr = "";

			proc.stdout.on("data", (data) => {
				stdout += data.toString();
			});
			proc.stderr.on("data", (data) => {
				stderr += data.toString();
			});
			proc.on("error", reject);
			proc.on("exit", (code) => {
				if (code !== 0) {
					reject(new Error(`CLI error: ${proc.stderr}`));
				} else {
					resolve({ stdout, stderr });
				}
			});
		},
	);

	const warnings = result.stderr
		.split("\n")
		.filter((line) => line.includes(": ") && !line.startsWith("NOTICE:"))
		.map((line) => line.split(":")[0] ?? line);

	return { output: result.stdout, warnings };
}

export function runTest(spec: Spec) {
	test(`${spec.title} - CLI`, async () => {
		const result = await testCLI(spec.input, spec.options);
		if (spec.expected) {
			equal(result.output, spec.expected);
		}
		// if (spec.warnings) {
		// 	equal(result.warnings.length, spec.warnings.length);
		// 	for (let i = 0; i < spec.warnings.length; i++) {
		// 		for (const key in spec.warnings[i]) {
		// 			equal(result.warnings[i][key], spec.warnings[i][key]);
		// 		}
		// 	}
		// }
	});
}
