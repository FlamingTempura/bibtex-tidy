import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import yaml from "yaml";
import type { Options } from "../../src/optionUtils.ts";
import type { Warning } from "../../src/types.ts";

type Spec = {
	title: string;
	input: string;
	expected?: string;
	options: Options;
	warnings?: Warning[];
};

const SPEC_DIR = join(import.meta.dirname, "..", "spec");

export type SpecFile = {
	filename: string;
	specs: Spec[];
};

export async function loadSpecFiles(): Promise<SpecFile[]> {
	const filenames = (await readdir(SPEC_DIR))
		.filter((filename) => filename.endsWith(".spec.yaml"))
		.sort();

	return Promise.all(
		filenames.map(async (filename) => {
			const text = await readFile(join(SPEC_DIR, filename), "utf8");
			const specs = yaml
				.parseAllDocuments(text)
				.map((document) => document.toJSON() as Spec);
			return { filename, specs };
		}),
	);
}
