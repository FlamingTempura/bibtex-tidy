import type { Modifier } from "../types";

export const omitFieldModifier: Modifier<boolean> = {
	type: "FieldModifier",
	condition: (fieldName, options) =>
		Boolean(options.omit?.some((f) => f.toLocaleLowerCase() === fieldName)), // TODO: memoize
	modifyNode: (node) => {
		node.parent.fields = node.parent.fields.filter((f) => f !== node);
	},
};
