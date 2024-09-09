import { getEntries } from "..";
import { sortEntryFields } from "../sort";
import type { Modifier } from "../types";

export const sortFieldsModifier: Modifier<string[]> = {
	type: "RootModifier",
	condition: (options) => options.sortFields ?? false,
	modifyRoot: (root, _, sortFields) => {
		const entries = getEntries(root);
		sortEntryFields(entries, sortFields);
		return undefined;
	},
};
