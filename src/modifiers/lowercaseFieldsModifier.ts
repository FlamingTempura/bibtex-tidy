import type { Transformation } from "../types";

export function createLowercaseFieldsModifier(): Transformation {
	return {
		name: "lowercase-fields",
		apply: (ast) => {
			for (const field of ast.allFields()) {
				field.name = field.name.toLocaleLowerCase();
			}
			return undefined;
		},
	};
}
