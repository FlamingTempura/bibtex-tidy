import type { Transformation } from "../types";

export function createOmitFieldsModifier(omit: string[]): Transformation {
	return {
		name: "omit-fields",
		apply(ast) {
			const set = new Set(omit.map((f) => f.toLocaleLowerCase()));
			for (const field of ast.allFields()) {
				if (set.has(field.name.toLocaleLowerCase())) {
					field.parent.fields = field.parent.fields.filter((f) => f !== field);
				}
			}
			return undefined;
		},
	};
}
