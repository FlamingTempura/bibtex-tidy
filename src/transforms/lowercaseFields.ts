import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createLowercaseFieldsTransform(): Transform {
	return {
		name: "lowercase-fields",
		apply: (ast) => {
			ast.replace(
				(node) => isNodeType(node, "field"),
				(field) => [field.with({ name: field.name.toLocaleLowerCase() })],
			);
		},
	};
}
