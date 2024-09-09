import { getEntries } from "..";
import { checkForDuplicates } from "../duplicates";
import type { OptionsNormalized } from "../optionUtils";
import type { Modifier } from "../types";
import { isEntryNode } from "../utils";

// Must happen after generate keys, before sorting entries
export const mergeEntriesModifier: Modifier<OptionsNormalized> = {
	type: "RootModifier",
	condition: (options) => options,
	modifyRoot: (root, cache, options) => {
		const entries = getEntries(root);

		const duplicates = checkForDuplicates(
			entries,
			cache,
			options.duplicates,
			options.merge,
		);

		root.children = root.children.filter(
			(child) => !isEntryNode(child) || !duplicates.entries.has(child.block),
		);

		return duplicates.warnings;
	},
};
