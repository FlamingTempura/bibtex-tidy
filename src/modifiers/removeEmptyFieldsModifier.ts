import type { Transformation } from "../types";

export const removeEmptyFieldsModifier: Transformation = {
	name: "remove-empty-fields",
	type: "RootModifier",
	condition: (options) => Boolean(options.removeEmptyFields),
	modifyRoot: (root, cache) => {
		for (const node of root.children) {
			if (node.type === "block" && node.block?.type === "entry") {
				const entry = node.block;
				entry.fields = entry.fields.filter(
					(field) => cache.lookupRenderedEntryValue(entry, field.name) !== "",
				);
			}
		}
		return undefined;
	},
};
