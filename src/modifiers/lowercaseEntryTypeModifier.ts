import type { Modifier } from "../types";

export const lowercaseEntryTypeModifier: Modifier = {
	type: "RootModifier",
	condition: (options) => Boolean(options.lowercase),
	modifyRoot: (root) => {
		for (const node of root.children) {
			if (node.type === "block" && node.block?.type === "entry") {
				node.command = node.command.toLocaleLowerCase();
			}
		}
		return undefined;
	},
};
