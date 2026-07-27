import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createIndentFieldsTransform(indent: string): Transform {
	return {
		name: "indent",
		apply: (ast) => {
			ast.replace(
				(node) => isNodeType(node, "field"),
				(field) => [field.with({ whitespacePrefix: `\n${indent}` })],
			);
		},
	};
}
