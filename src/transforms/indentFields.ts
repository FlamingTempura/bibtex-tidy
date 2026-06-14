import type { FieldNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createIndentFieldsTransform(indent: string): Transform {
	return {
		name: "indent",
		apply: (astProxy) => {
			astProxy.walk({
				where: (node): node is FieldNode => node.type === "field",
				enter: (field) => {
					field.whitespacePrefix = `\n${indent}`;
					return [field];
				},
			});
			return undefined;
		},
	};
}
