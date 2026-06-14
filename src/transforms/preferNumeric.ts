import { LiteralNode, type ValueNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode } from "../valueNodes.ts";

export function createPreferNumericTransform(): Transform {
	return {
		name: "prefer-numeric",
		dependencies: ["prefer-curly"],
		apply: (ast) => {
			ast.walk({
				where: (node): node is ValueNode =>
					(node.type === "braced" || node.type === "quoted") &&
					/^[1-9][0-9]*$/.test(renderValueNode(node)),
				enter: (node) => [new LiteralNode(node.parent, renderValueNode(node))],
			});
			return undefined;
		},
	};
}
