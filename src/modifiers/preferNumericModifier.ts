import type { Transformation } from "../types";

// must happen before sorting
export const preferNumericModifier: Transformation = {
	name: "prefer-numeric",
	type: "FieldModifier",
	condition: (_, options) => options.numeric ?? false,
	modifyNode: (node) => {
		for (const child of node.value.concat) {
			const isNumeric = child.value.match(/^[1-9][0-9]*$/);
			if (isNumeric) {
				child.type = "literal";
			}
		}
	},
};
