import { sortEntries } from "../sort";
import type { Modifier } from "../types";

// Must happen after generate keys and merging
export const sortEntriesModifier: Modifier<string[]> = {
	type: "RootModifier",
	condition: (options) => options.sort ?? false,
	modifyRoot: (...args) => {
		sortEntries(...args);
		return undefined;
	},
};
