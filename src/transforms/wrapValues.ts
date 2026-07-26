import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { unwrapText, wrapText } from "../utils.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

export function createWrapValuesTransform(
	indent: string,
	align: number,
	wrap?: number,
): Transform {
	return {
		name: "wrap-values",
		apply: (astProxy) => {
			astProxy.walk({
				where: (node) => isNodeType(node, "braced"),
				enter: (node) => {
					let value = unwrapText(renderValueNode(node));

					// Braced values should be trimmed, unless part of a concatenation
					if (node.parent.concat.length === 1) {
						value = value.trim();
					}

					const lineLength = `${indent}${align}{${value}}`.length;
					const multiLine = value.includes("\n\n");
					// If the value contains multiple paragraphs, then output the value at a separate indent level, e.g.
					// abstract     = {
					//   Paragraph 1
					//
					//   Paragraph 2
					// }
					if ((wrap && lineLength > wrap) || multiLine) {
						let paragraphs = value.split("\n\n");
						const valIndent = indent.repeat(2);

						if (wrap) {
							const wrapCol = wrap;
							paragraphs = paragraphs.map((paragraph) =>
								wrapText(paragraph, wrapCol - valIndent.length).join(
									`\n${valIndent}`,
								),
							);
						}

						value = `\n${valIndent}${paragraphs.join(`\n\n${valIndent}`)}\n${indent}`;
					}

					return [replaceValueNodeText(node, value)];
				},
			});

			return undefined;
		},
	};
}
