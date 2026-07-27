import { walkAst } from "../ast.ts";
import { LiteralNode, type ValueNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode } from "../valueNodes.ts";

export function createPreferNumericTransform(): Transform {
	const visit = (node: ValueNode) => [
		/^[1-9][0-9]*$/.test(renderValueNode(node))
			? new LiteralNode(renderValueNode(node))
			: node,
	];
	return {
		name: "prefer-numeric",
		dependencies: ["prefer-curly"],
		apply: (ast) => ({ ast: walkAst(ast, { braced: visit, quoted: visit }) }),
	};
}
