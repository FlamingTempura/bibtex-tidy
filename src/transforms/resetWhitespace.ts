import { walkAst } from "../ast.ts";
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
		apply: (ast) => ({
			ast: walkAst(ast, {
				root: (root) => {
					const children: (TextNode | BlockNode)[] = [];
					for (const original of root.children) {
						let child = original;
						let prev = children.at(-1);
						const preserve = isComment(child) && keepCommentWhitespace;
						const preservePrev =
							prev && isComment(prev) && keepCommentWhitespace;

						if (
							keepCommentWhitespace &&
							isNodeType(child, "block") &&
							isNodeType(prev, "text") &&
							!prev.text.endsWith("\n")
						) {
							prev = prev.with({ text: `${prev.text.trimEnd()}\n` });
							children[children.length - 1] = prev;
						}

						if (!preserve) {
							child = child.with({
								whitespacePrefix: prev && !preservePrev ? "\n" : "",
							});
							if (isNodeType(child, "text")) {
								child = child.with({ text: child.text.trim() });
							} else if (child.block) {
								if (isNodeType(child.block, "entry")) {
									child = child.with({
										block: child.block.with({
											fields: child.block.fields.map((field) =>
												field.with({ whitespacePrefix: "" }),
											),
										}),
									});
								} else if (isNodeType(child.block, "comment")) {
									child = child.with({
										block: child.block.with({ raw: child.block.raw.trim() }),
									});
								}
							}
						}

						children.push(child);
					}
					return [root.with({ children })];
				},
			}),
		}),
	};
}

function isComment(node: TextNode | BlockNode): boolean {
	return isNodeType(node, "text") || isNodeType(node.block, "comment");
}
