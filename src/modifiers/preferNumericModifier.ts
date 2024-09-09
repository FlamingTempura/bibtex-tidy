import type { Modifier } from "../types";

// must happen before sorting
export const preferNumericModifier: Modifier = {
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
