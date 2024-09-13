import type { Transform } from "../types";

export function createPreferCurlyTransform(): Transform {
	return {
		name: "prefer-curly",
		apply: (ast) => {
			for (const field of ast.fields()) {
				for (const child of field.value.concat) {
					child.type = "braced";
				}
				ast.invalidateField(field);
			}
			return undefined;
		},
	};
}
