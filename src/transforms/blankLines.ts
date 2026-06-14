import type { BlockNode, TextNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createBlankLinesTransform(): Transform {
	return {
		name: "blank-lines",
		apply: (astProxy) => {
			let prev: TextNode | BlockNode | undefined;
			astProxy.walk({
				where: (node): node is TextNode | BlockNode =>
					node.type === "text" || node.type === "block",
				enter: (child) => {
					if (prev && !isComment(prev)) {
						child.whitespacePrefix = "\n\n";
					}
					prev = child;
					return [child];
				},
			});
			return undefined;
		},
	};
}

function isComment(node: TextNode | BlockNode): boolean {
	return node.type === "text" || node.block?.type === "comment";
}
