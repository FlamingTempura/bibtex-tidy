import type { Transformation } from "../types";

export function createLowercaseEntryTypeModifier(): Transformation {
	return {
		name: "lowercase-entry-type",
		apply: (ast) => {
			for (const entry of ast.allEntries()) {
				entry.parent.command = entry.parent.command.toLocaleLowerCase();
			}
			return undefined;
		},
	};
}
