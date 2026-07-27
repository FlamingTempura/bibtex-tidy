import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

// if a field's value has double braces {{blah}}, lose the inner brace
export function createRemoveEnclosingBracesTransform(): Transform {
	return {
		name: "remove-enclosing-braces",
		apply: (ast) => {
			ast.replace(
				(node) => isNodeType(node, "braced"),
				(node) => [
					replaceValueNodeText(
						node,
						renderValueNode(node).replace(/^\{([^{}]*)\}$/g, "$1"),
					),
				],
			);
		},
	};
}
