import type { BlockNode, TextNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createRemoveCommentsTransform(): Transform {
	return {
		name: "remove-comments",
		apply: (astProxy) => {
			astProxy.walk({
				where: (node): node is TextNode | BlockNode =>
					node.type === "text" ||
					(node.type === "block" && node.block?.type === "comment"),
				enter: () => [],
			});

			return undefined;
		},
	};
}
