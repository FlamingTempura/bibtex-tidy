import { spawn } from "node:child_process";
import { join } from "node:path";
import { optionsToCLIArgs } from "../../src/optionsToCLIArgs.ts";
import type { CLIOptions } from "../../src/optionUtils.ts";
import { loadSpecFiles } from "../support/spec-loader.ts";

const BIN_PATH = join("bin", "bibtex-tidy");

type CLIResult = {
	output: string;
	warnings: string[];
};

async function testCLI(
	input: string,
	options: CLIOptions = {},
): Promise<CLIResult> {
	const result = await new Promise<{ stdout: string; stderr: string }>(
		(resolve, reject) => {
			const proc = spawn(BIN_PATH, optionsToCLIArgs(options), {
				timeout: 100_000,
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
			proc.on("close", (code) => {
				if (code !== 0) {
					reject(new Error(`CLI error: ${stderr}`));
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

const specFiles = await loadSpecFiles();

describe("CLI E2E specs", () => {
	for (const { filename, specs } of specFiles) {
		for (const [index, spec] of specs.entries()) {
			test(`${filename} document ${index + 1}: ${spec.title}`, async () => {
				const result = await testCLI(spec.input, spec.options);

				if (spec.expected) {
					expect(result.output).toBe(spec.expected);
				}
			});
		}
	}
});
