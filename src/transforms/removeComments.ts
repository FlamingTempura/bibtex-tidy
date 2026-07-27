import {
	type BlockNode,
	isNodeType,
	type TextNode,
} from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createRemoveCommentsTransform(): Transform {
	return {
		name: "remove-comments",
		apply: (ast) => {
			ast.replace(
				(node): node is TextNode | BlockNode =>
					isNodeType(node, "text") ||
					(isNodeType(node, "block") && isNodeType(node.block, "comment")),
				() => [],
			);
		},
	};
}
