import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createAlignValuesTransform(column: number): Transform {
	return {
		name: "align-values",
		apply: (astProxy) => {
			astProxy.walk({
				where: (node) => isNodeType(node, "field"),
				enter: (field) => {
					const gap = Math.max(column - field.name.length, 1);
					field.value.whitespacePrefix = " ".repeat(gap);
					return [field];
				},
			});
			return undefined;
		},
	};
}
