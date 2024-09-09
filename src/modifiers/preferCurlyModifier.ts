import type { Modifier } from "../types";

export const preferCurlyModifier: Modifier<boolean> = {
	type: "FieldModifier",
	condition: (_, options) => options.curly ?? false,
	modifyNode: (node) => {
		for (const child of node.value.concat) {
			child.type = "braced";
		}
	},
};
