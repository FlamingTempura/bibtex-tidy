import type { Modifier } from "../types";

export const lowercaseFieldsModifier: Modifier = {
	type: "RootModifier",
	condition: (options) => Boolean(options.lowercase),
	modifyRoot: (root, cache) => {
		for (const node of root.children) {
			if (node.type === "block" && node.block?.type === "entry") {
				for (const field of node.block.fields) {
					field.name = field.name.toLocaleLowerCase();
				}
			}
		}
		return undefined;
	},
};
