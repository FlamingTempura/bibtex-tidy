import {
	type BlockNode,
	isNodeType,
	type TextNode,
} from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createBlankLinesTransform(): Transform {
	return {
		name: "blank-lines",
		apply: (astProxy) => {
			astProxy.walk({
				where: (node) => isNodeType(node, "text", "block"),
				enter: (child) => {
					const index = child.parent.children.indexOf(child);
					const prev = child.parent.children[index - 1];
					return [
						child.with({
							whitespacePrefix:
								prev && !isComment(prev) ? "\n\n" : child.whitespacePrefix,
						}),
					];
				},
			});
		},
	};
}

function isComment(node: TextNode | BlockNode): boolean {
	return isNodeType(node, "text") || isNodeType(node.block, "comment");
}
