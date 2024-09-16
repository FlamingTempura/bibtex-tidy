import type { BlockNode, TextNode } from "../parsers/bibtexParser";
import type { Transform } from "../types";

export function createResetWhitespaceTransform(
	keepCommentWhitespace: boolean,
): Transform {
	return {
		name: "reset-whitespace",
		apply: (astProxy) => {
			const children = astProxy.root().children;
			let prev: TextNode | BlockNode | undefined;
			for (const child of children) {
				const preserve = isComment(child) && keepCommentWhitespace;
				const preservePrev = prev && isComment(prev) && keepCommentWhitespace;

				if (
					keepCommentWhitespace &&
					child.type === "block" &&
					prev?.type === "text" &&
					!prev.text.endsWith("\n")
				) {
					prev.text = `${prev.text.trimEnd()}\n`;
				}

				if (!preserve) {
					child.whitespacePrefix = prev && !preservePrev ? "\n" : "";
					if (child.type === "text") {
						child.text = child.text.trim();
					} else if (child.block) {
						if (child.block.type === "entry") {
							for (const field of child.block.fields) {
								field.whitespacePrefix = "";
							}
						} else if (child.block.type === "comment") {
							child.block.raw = child.block.raw.trim();
						}
					}
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
