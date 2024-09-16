import { checkForDuplicates } from "../duplicates";
import type { MergeStrategy, OptionsNormalized } from "../optionUtils";
import type { Transform } from "../types";
import { isEntryNode } from "../utils";

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

			const root = astProxy.root();
			root.children = root.children.filter(
				(child) => !isEntryNode(child) || !duplicates.entries.has(child.block),
			);

			return duplicates.warnings;
		},
	};
}
