import { readFile } from "node:fs/promises";

/**
 * Parses the config from a yaml file, then returns a cli-like line of configs for it to be parsed to actual options.
 */
export async function parseConfig(file: string): Promise<string[]> {
	if (!file.endsWith(".yaml")) {
		console.error("Expects a yaml file for the config");
		process.exit(1);
	}
	return readFile(file, "utf8")
		.then((data) => data.trim().split("\n"))
		.then((lines) =>
			lines.reduce((acc, line, index) => {
				const split = line.split(":");
				if (split.length !== 2) {
					console.error("Invalid syntax on line", index + 1);
					process.exit(1);
				}
				const arr = [];
				if (split[0]) {
					arr.push(`--${split[0]}`);
				}
				if (split[1]) {
					arr.push(...split[1].trim().split(","));
				}
				return acc.concat(arr);
			}, [] as string[]),
		);
}
