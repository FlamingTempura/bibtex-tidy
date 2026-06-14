import { type FieldNode, isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createRemoveSpecifiedFieldsTransform(
	omit: string[],
): Transform {
	return {
		name: "remove-specified-fields",
		apply(ast) {
			const set = new Set(omit.map((f) => f.toLocaleLowerCase()));
			ast.walk({
				where: (node): node is FieldNode =>
					isNodeType(node, "field") && set.has(node.name.toLocaleLowerCase()),
				enter: () => [],
			});
			return undefined;
		},
	};
}
