import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import yaml from "yaml";

export function resolve(
	specifier: string,
	ctx: { parentURL: string },
	next: (...args: unknown[]) => unknown,
) {
	if (specifier.endsWith(".spec.yaml")) {
		return { url: new URL(specifier, ctx.parentURL).href, shortCircuit: true };
	}
	return next(specifier, ctx, next);
}

export async function load(
	url: string,
	ctx: unknown,
	next: (...args: unknown[]) => unknown,
) {
	if (!url.endsWith(".spec.yaml")) return next(url, ctx, next);

	const text = await readFile(fileURLToPath(url), "utf8");
	const scenarios = yaml.parseAllDocuments(text);

	const platforms = ["api", "cli"];

	const js = `
    const specs = ${JSON.stringify(scenarios)};
		${platforms
			.map(
				(platform) => `
			import { runTest as ${platform} } from './support/${platform}-runner.mts';
			for (const spec of specs) ${platform}(spec);
		`,
			)
			.join("")}
    
  `;

	return { format: "module", source: js, shortCircuit: true };
}
