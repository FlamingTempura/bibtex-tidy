import {
	type BlockNode,
	isNodeType,
	type TextNode,
} from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createRemoveCommentsTransform(): Transform {
	return {
		name: "remove-comments",
		apply: (astProxy) => {
			astProxy.walk({
				where: (node): node is TextNode | BlockNode =>
					isNodeType(node, "text") ||
					(isNodeType(node, "block") && isNodeType(node.block, "comment")),
				enter: () => [],
			});

			return undefined;
		},
	};
}
