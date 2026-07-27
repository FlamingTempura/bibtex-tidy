import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createFieldCommasTransform(trailing: boolean): Transform {
	return {
		name: "field-commas",
		apply: (ast) => {
			ast.replace(
				(node) => isNodeType(node, "field"),
				(field) => [
					field.with({
						hasComma:
							field.parent.fields.indexOf(field) <
								field.parent.fields.length - 1 || trailing,
					}),
				],
			);
		},
	};
}
