import type { Transformation } from "../types";

export const removeDuplicateFieldsModifier: Transformation = {
	name: "remove-duplicate-fields",
	type: "RootModifier",
	condition: (options) => Boolean(options.removeDuplicateFields),
	modifyRoot: (root) => {
		for (const node of root.children) {
			if (node.type === "block" && node.block?.type === "entry") {
				const fieldSeen = new Set<string>();
				node.block.fields = node.block.fields.filter((field) => {
					const nameLc = field.name.toLocaleLowerCase();
					if (fieldSeen.has(nameLc)) {
						return false;
					}
					fieldSeen.add(nameLc);
					return true;
				});
			}
		}
		return undefined;
	},
};
