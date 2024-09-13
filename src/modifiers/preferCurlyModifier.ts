import type { Transformation } from "../types";

export const preferCurlyModifier: Transformation = {
	name: "prefer-curly",
	type: "FieldModifier",
	condition: (_, options) => options.curly ?? false,
	modifyNode: (node) => {
		for (const child of node.value.concat) {
			child.type = "braced";
		}
	},
};
