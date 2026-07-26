import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createAlignValuesTransform(column: number): Transform {
	return {
		name: "align-values",
		apply: (astProxy) => {
			astProxy.walk({
				where: (node) => isNodeType(node, "concat"),
				enter: (concat) => [
					concat.with({
						whitespacePrefix: " ".repeat(
							Math.max(column - concat.parent.name.length, 1),
						),
					}),
				],
			});
		},
	};
}
