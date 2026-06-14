import { checkForDuplicates } from "../duplicates.ts";
import type { MergeStrategy, OptionsNormalized } from "../optionUtils.ts";
import { type BlockNode, isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createMergeEntriesTransform(
	duplicatesOpt: OptionsNormalized["duplicates"],
	merge?: MergeStrategy,
): Transform {
	// Must happen after generate keys, before sorting entries
	return {
		name: "merge-entries",
		dependencies: ["generate-keys", "sort-entries"],

		apply: (astProxy) => {
			const duplicates = checkForDuplicates(astProxy, duplicatesOpt, merge);

			astProxy.walk({
				where: (node): node is BlockNode =>
					isNodeType(node, "block") &&
					isNodeType(node.block, "entry") &&
					duplicates.entries.has(node.block),
				enter: () => [],
			});

			return duplicates.warnings;
		},
	};
}
