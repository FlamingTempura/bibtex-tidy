import { match, strictEqual } from "node:assert";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { BIN_PATH, tmpfile } from "./support/cli.ts";
import { readFile } from "node:fs/promises";

const input = `@article{a,
 month={8},
 title={A},
 doi={doi},
}`;

const configInvalid = `
test:
invalid
`;

const configOne = `
months:
`;

const outputOne = `@article{a,
  month         = aug,
  title         = {A},
  doi           = {doi}
}
`;

const configTwo = `
months:
space: 8
`;

const outputTwo = `@article{a,
    month         = aug,
    title         = {A},
    doi           = {doi}
}
`;

const configThree = `
months:
omit: comment, title, url, doi
`;

const outputThree = `@article{a,
  month         = aug
}
`;


test("CLI should not accept a non yaml file as a config", async () => {
	const path = await tmpfile(input);
	const proc = spawnSync(BIN_PATH, [path, "--config", "test.other"], { encoding: "utf8" });
	strictEqual(proc.status, 1);
  match(proc.stderr, /Expects a yaml file for the config/);
});

test("CLI should not accept an invalid yaml config", async () => {
	const infile = await tmpfile(input);
  const config = await tmpfile(configInvalid, "config.yaml");
	const proc = spawnSync(BIN_PATH, [infile, "--config", config], { encoding: "utf8" });
	strictEqual(proc.status, 1);
});


test("CLI should parse and apply a valid config", async () => {
	const infile = await tmpfile(input);
  const config = await tmpfile(configOne, "config.yaml");
	const proc = spawnSync(BIN_PATH, [infile, "-m", "--config", config], { encoding: "utf8" });
  match(proc.stdout, /Tidying.../);
  strictEqual(await readFile(infile, "utf8"), outputOne);
});

test("Configuration should be overriden by actual CLI options", async () => {
	const infile = await tmpfile(input);
  const config = await tmpfile(configTwo, "config.yaml");
	const proc = spawnSync(BIN_PATH, [infile, "-m", "--space", "4", "--config", config], { encoding: "utf8" });
  match(proc.stdout, /Tidying.../);
  strictEqual(await readFile(infile, "utf8"), outputTwo);
});


test("Configuration should be parsed properly when an option has multiple inputs", async () => {
	const infile = await tmpfile(input);
  const config = await tmpfile(configThree, "config.yaml");
	const proc = spawnSync(BIN_PATH, [infile, "-m", "--config", config], { encoding: "utf8" });
  match(proc.stdout, /Tidying.../);
  strictEqual(await readFile(infile, "utf8"), outputThree);
});
