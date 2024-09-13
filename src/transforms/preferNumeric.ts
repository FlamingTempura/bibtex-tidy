import type { Transform } from "../types";

export function createPreferNumericTransform(): Transform {
	return {
		name: "prefer-numeric",
		apply: (ast) => {
			for (const field of ast.fields()) {
				for (const child of field.value.concat) {
					const isNumeric = child.value.match(/^[1-9][0-9]*$/);
					if (isNumeric) {
						child.type = "literal";
					}
				}
				ast.invalidateField(field);
			}
			return undefined;
		},
	};
}
