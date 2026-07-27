import { getEntries, walkAst } from "../ast.ts";
import { checkForDuplicates } from "../duplicates.ts";
import type { MergeStrategy, OptionsNormalized } from "../optionUtils.ts";
import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createMergeEntriesTransform(
	duplicatesOpt: OptionsNormalized["duplicates"],
	merge?: MergeStrategy,
): Transform {
	// Must happen after generate keys, before sorting entries
	return {
		name: "merge-entries",
		dependencies: ["generate-keys", "sort-entries"],

		apply: (ast) => {
			// TODO: Make checkForDuplicates pure, then separate the merge logic
			// into its own pure operation. Then _ can be removed.
			const cloned = walkAst(ast, {
				_: (node, ctx) => [(ctx.next()[0] ?? node).with({})],
			});
			const duplicates = checkForDuplicates(
				getEntries(cloned),
				duplicatesOpt,
				merge,
			);
			const result = walkAst(cloned, {
				block: (node) =>
					isNodeType(node.block, "entry") && duplicates.entries.has(node.block)
						? []
						: [node],
			});

			return { ast: result, warnings: duplicates.warnings };
		},
	};
}
