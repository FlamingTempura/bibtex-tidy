import type { FieldNode } from "../parsers/bibtexParser";
import type { Transform } from "../types";
import { unwrapText, wrapText } from "../utils";

export function createWrapValuesTransform(
	indent: string,
	align: number,
	wrap?: number,
): Transform {
	return {
		name: "wrap-values",
		apply: (astProxy) => {
			const fields = astProxy.fields();
			for (const field of fields) {
				for (const node of field.value.concat) {
					let value = unwrapText(node.value);

					// Braced values should be trimmed, unless part of a concatenation
					if (node.type === "braced" && field.value.concat.length === 1) {
						value = value.trim();
					}

					if (node.type === "braced") {
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

						node.value = value;
					}
				}
			}

			return undefined;
		},
	};
}
