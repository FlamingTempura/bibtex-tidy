import { sortEntries } from "../sort";
import type { Transformation } from "../types";

export function createSortEntriesModifier(sort: string[]): Transformation {
	return {
		name: "sort-entries",
		dependencies: ["generate-keys", "merge-entries"],
		apply: (astProxy) => {
			sortEntries(astProxy.getAst(), astProxy, sort);
			return undefined;
		},
	};
}
