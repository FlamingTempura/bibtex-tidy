import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { BIN_PATH, tmpfile } from "./support/cli.ts";

const input = `@article{a,
    number={1},
    title={A}
}`;

const output = `@article{a,
  number        = {1},
  title         = {A}
}
`;

test("CLI should output to specified file", async () => {
	const infile = await tmpfile(input);
	const outfile = await tmpfile("");
	spawnSync(BIN_PATH, [infile, "--output", outfile], { encoding: "utf8" });
	expect(await readFile(infile, "utf8")).toBe(input);
	expect(await readFile(outfile, "utf8")).toBe(output);
});

test("CLI should output to specified file (from stdin)", async () => {
	const outfile = await tmpfile("");
	spawnSync(BIN_PATH, ["--output", outfile], {
		input,
		encoding: "utf8",
	});
	expect(await readFile(outfile, "utf8")).toBe(output);
});

test("CLI should output unsupported escape warnings when writing to a file", async () => {
	const outfile = await tmpfile("");
	const proc = spawnSync(BIN_PATH, ["--escape=new", "--output", outfile], {
		input: "@misc{q, author={↳}}",
		encoding: "utf8",
	});

	expect(await readFile(outfile, "utf8")).toBe(
		`@misc{q,\n  author        = {↳}\n}\n`,
	);
	expect(proc.stderr).toContain("UNSUPPORTED_ESCAPE:");
	expect(proc.stderr).toContain("Cannot escape character ↳ (U+21B3)");
});
