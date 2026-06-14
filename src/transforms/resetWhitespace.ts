import {
	type BlockNode,
	isNodeType,
	type TextNode,
} from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createResetWhitespaceTransform(
	keepCommentWhitespace: boolean,
): Transform {
	return {
		name: "reset-whitespace",
		apply: (astProxy) => {
			let prev: TextNode | BlockNode | undefined;
			astProxy.walk({
				where: (node) => isNodeType(node, "text", "block"),
				enter: (child) => {
					const preserve = isComment(child) && keepCommentWhitespace;
					const preservePrev = prev && isComment(prev) && keepCommentWhitespace;

					if (
						keepCommentWhitespace &&
						isNodeType(child, "block") &&
						isNodeType(prev, "text") &&
						!prev.text.endsWith("\n")
					) {
						prev.text = `${prev.text.trimEnd()}\n`;
					}

					if (!preserve) {
						child.whitespacePrefix = prev && !preservePrev ? "\n" : "";
						if (isNodeType(child, "text")) {
							child.text = child.text.trim();
						} else if (child.block) {
							if (isNodeType(child.block, "entry")) {
								for (const field of child.block.fields) {
									field.whitespacePrefix = "";
								}
							} else if (isNodeType(child.block, "comment")) {
								child.block.raw = child.block.raw.trim();
							}
						}
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
	return isNodeType(node, "text") || isNodeType(node.block, "comment");
}
