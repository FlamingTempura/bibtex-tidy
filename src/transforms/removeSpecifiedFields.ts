import type { Transform } from "../types";

export function createRemoveSpecifiedFieldsTransform(
	omit: string[],
): Transform {
	return {
		name: "remove-specified-fields",
		apply(ast) {
			const set = new Set(omit.map((f) => f.toLocaleLowerCase()));
			for (const field of ast.fields()) {
				if (set.has(field.name.toLocaleLowerCase())) {
					field.parent.fields = field.parent.fields.filter((f) => f !== field);
				}
			}
			return undefined;
		},
	};
}
