import type { Transform } from "../types";

export function createLowercaseFieldsTransform(): Transform {
	return {
		name: "lowercase-fields",
		apply: (ast) => {
			for (const field of ast.fields()) {
				const newName = field.name.toLocaleLowerCase();
				if (newName !== field.name) {
					field.name = newName;
					ast.invalidateField(field);
				}
			}
			return undefined;
		},
	};
}
