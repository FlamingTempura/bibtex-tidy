import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createIndentFieldsTransform(indent: string): Transform {
	return {
		name: "indent",
		apply: (astProxy) => {
			astProxy.walk({
				where: (node) => isNodeType(node, "field"),
				enter: (field) => [field.with({ whitespacePrefix: `\n${indent}` })],
			});
		},
	};
}
