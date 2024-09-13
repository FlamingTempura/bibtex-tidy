import type { Transform } from "../types";

export function createLowercaseEntryTypeTransform(): Transform {
	return {
		name: "lowercase-entry-type",
		apply: (ast) => {
			for (const entry of ast.entries()) {
				entry.parent.command = entry.parent.command.toLocaleLowerCase();
			}
			return undefined;
		},
	};
}
