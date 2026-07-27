import { walkAst } from "../ast.ts";
import {
	type BlockNode,
	isNodeType,
	type TextNode,
} from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createBlankLinesTransform(): Transform {
	return {
		name: "blank-lines",
		apply: (ast) => ({
			ast: walkAst(ast, {
				root: (root) => [
					root.with({
						children: root.children.map((child, i) => {
							const prev = root.children[i - 1];
							return child.with({
								whitespacePrefix:
									prev && !isComment(prev) ? "\n\n" : child.whitespacePrefix,
							});
						}),
					}),
				],
			}),
		}),
	};
}

function isComment(node: TextNode | BlockNode): boolean {
	return isNodeType(node, "text") || isNodeType(node.block, "comment");
}
