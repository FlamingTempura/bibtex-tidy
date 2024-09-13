import { sortEntryFields } from "../sort";
import type { Transformation } from "../types";

export function createSortFieldsModifier(sortFields: string[]): Transformation {
	return {
		name: "sort-fields",
		apply: (astProxy) => {
			const entries = astProxy.allEntries();
			sortEntryFields(entries, sortFields);
			return undefined;
		},
	};
}
