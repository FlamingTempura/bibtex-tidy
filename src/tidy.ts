import { getEntries } from "./ast.ts";
import { logAST } from "./debug.ts";
import { formatBibtex } from "./format.ts";
import type { Options } from "./optionUtils.ts";
import { normalizeOptions } from "./optionUtils.ts";
import { isNodeType, parseBibTeX } from "./parsers/bibtexParser.ts";
import { generateTransformPipeline } from "./pipeline.ts";
import type { BibTeXTidyResult, Warning } from "./types.ts";
import { convertCRLF } from "./utils.ts";

const verbose = false;

export function tidy(input: string, options_: Options = {}): BibTeXTidyResult {
	const options = normalizeOptions(options_);
	const inputFixed = convertCRLF(input);
	let ast = parseBibTeX(inputFixed);
	const pipeline = generateTransformPipeline(options);

	const warnings: Warning[] = ast.children.flatMap((child) =>
		isNodeType(child, "block") &&
		isNodeType(child.block, "entry") &&
		!child.block.key
			? [
					{
						code: "MISSING_KEY" as const,
						message: `${child.command} entry does not have a citation key.`,
					},
				]
			: [],
	);

	if (verbose) {
		console.log(logAST(ast));
	}

	for (const transform of pipeline) {
		const result = transform.apply(ast);
		ast = result.ast;
		if (verbose) {
			console.log(`\n\n## Applying transform: ${transform.name}`);
			console.log(logAST(ast));
		}
		if (result.warnings) warnings.push(...result.warnings);
	}

	const bibtex = formatBibtex(ast);

	return { bibtex, warnings, count: getEntries(ast).length };
}
