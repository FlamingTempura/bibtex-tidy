import type { BlockNode, TextNode } from "../parsers/bibtexParser";
import type { Transform } from "../types";

export function createBlankLinesTransform(): Transform {
	return {
		name: "blank-lines",
		apply: (astProxy) => {
			const children = astProxy.root().children;
			let prev: TextNode | BlockNode | undefined;
			for (const child of children) {
				if (prev && !isComment(prev)) {
					child.whitespacePrefix = "\n\n";
				}
				prev = child;
			}
			return undefined;
		},
	};
}

function isComment(node: TextNode | BlockNode): boolean {
	return node.type === "text" || node.block?.type === "comment";
}
