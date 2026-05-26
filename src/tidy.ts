import { ASTProxy } from "./ASTProxy.ts";
import { logAST } from "./debug.ts";
import { formatBibtex } from "./format.ts";
import type { Options } from "./optionUtils.ts";
import { normalizeOptions } from "./optionUtils.ts";
import { parseBibTeX } from "./parsers/bibtexParser.ts";
import { generateTransformPipeline } from "./pipeline.ts";
import type { BibTeXTidyResult, Warning } from "./types.ts";
import { convertCRLF } from "./utils.ts";

const verbose = false;

export function tidy(input: string, options_: Options = {}): BibTeXTidyResult {
	const options = normalizeOptions(options_);
	const inputFixed = convertCRLF(input);
	const ast = parseBibTeX(inputFixed);
	const cache = new ASTProxy(ast);
	const pipeline = generateTransformPipeline(options);

	const warnings: Warning[] = cache
		.entries()
		.filter((entry) => !entry.key)
		.map((entry) => ({
			code: "MISSING_KEY",
			message: `${entry.parent.command} entry does not have a citation key.`,
		}));

	if (verbose) {
		console.log(logAST(ast));
	}

	for (const transform of pipeline) {
		const result = transform.apply(cache);
		if (verbose) {
			console.log(`\n\n## Applying transform: ${transform.name}`);
			console.log(logAST(ast));
		}
		if (result) warnings.push(...result);
	}

	const bibtex = formatBibtex(ast);

	return { bibtex, warnings, count: cache.entries().length };
}
