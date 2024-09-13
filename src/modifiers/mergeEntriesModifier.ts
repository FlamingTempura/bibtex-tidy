import { getEntries } from "..";
import { checkForDuplicates } from "../duplicates";
import type { MergeStrategy, OptionsNormalized } from "../optionUtils";
import type { Transformation } from "../types";
import { isEntryNode } from "../utils";

export function createMergeEntriesTransformation(
	duplicatesOpt: OptionsNormalized["duplicates"],
	merge?: MergeStrategy,
): Transformation {
	// Must happen after generate keys, before sorting entries
	return {
		name: "merge-entries",
		dependencies: ["generate-keys", "sort-entries"],

		apply: (astProxy) => {
			const entries = astProxy.allEntries();

			const duplicates = checkForDuplicates(
				entries,
				astProxy,
				duplicatesOpt,
				merge,
			);

			const root = astProxy.getAst();
			root.children = root.children.filter(
				(child) => !isEntryNode(child) || !duplicates.entries.has(child.block),
			);

			return duplicates.warnings;
		},
	};
}
