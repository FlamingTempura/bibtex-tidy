import { type FieldNode, isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode } from "../valueNodes.ts";

export function createRemoveEmptyFieldsTransform(): Transform {
	return {
		name: "remove-empty-fields",
		apply: (ast) => {
			ast.walk({
				where: (node): node is FieldNode =>
					isNodeType(node, "field") &&
					!node.value.concat.some(
						(node) => renderValueNode(node).trim() !== "",
					),
				enter: () => [],
			});
			return undefined;
		},
	};
}
