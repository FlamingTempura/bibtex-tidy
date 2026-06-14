import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createIndentFieldsTransform(indent: string): Transform {
	return {
		name: "indent",
		apply: (astProxy) => {
			astProxy.walk({
				where: (node) => isNodeType(node, "field"),
				enter: (field) => {
					field.whitespacePrefix = `\n${indent}`;
					return [field];
				},
			});
			return undefined;
		},
	};
}
