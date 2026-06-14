import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createLowercaseFieldsTransform(): Transform {
	return {
		name: "lowercase-fields",
		apply: (ast) => {
			ast.walk({
				where: (node) => isNodeType(node, "field"),
				enter: (field) => {
					field.name = field.name.toLocaleLowerCase();
					return [field];
				},
			});
			return undefined;
		},
	};
}
