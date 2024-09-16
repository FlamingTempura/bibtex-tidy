import type { OptionsNormalized } from "./optionUtils";
import type {
	BlockNode,
	EntryNode,
	FieldNode,
	RootNode,
	TextNode,
} from "./parsers/bibtexParser";
import { doubleEnclose } from "./transforms/encloseBraces";

import { unwrapText, wrapText } from "./utils";

type WhitespaceOptions = Pick<
	OptionsNormalized,
	"tab" | "space" | "align" | "wrap"
>;
export function formatBibtex(
	ast: RootNode,
	options: WhitespaceOptions,
): string {
	const bibtex: string = ast.children
		.map((child) => formatNode(child, options))
		.join("")
		.trimEnd();
	return `${bibtex}\n`;
}

function formatNode(
	child: TextNode | BlockNode,
	options: WhitespaceOptions,
): string {
	if (child.type === "text") {
		return `${child.whitespacePrefix}${child.text}`;
	}

	if (!child.block) throw new Error("FATAL!");

	switch (child.block.type) {
		case "preamble":
		case "string":
		case "comment":
			return `${child.whitespacePrefix}${child.block.raw}`;
		case "entry":
			return `${child.whitespacePrefix}${formatEntry(child.command, child.block, options)}`;
	}
}

function formatEntry(
	entryType: string, // article, journal, etc
	entry: EntryNode,
	options: WhitespaceOptions,
) {
	let bibtex = `@${entryType}{`;
	if (entry.key) bibtex += `${entry.key},`;

	for (const [i, field] of entry.fields.entries()) {
		bibtex += `${field.whitespacePrefix}${field.name}`;
		const value = formatValue(field, options);
		if (value) {
			bibtex += `${field.value.whitespacePrefix}= ${value}`;
		}
		if (field.hasComma) bibtex += ",";
	}
	bibtex += "\n}";
	return bibtex;
}

export function formatValue(
	field: FieldNode,
	options: WhitespaceOptions,
): string | undefined {
	const { align, wrap, tab, space } = options;

	const indent: string = tab ? "\t" : " ".repeat(space);

	return field.value.concat
		.map(({ type, value }) => {
			if (type === "literal") {
				return value;
			}

			value = unwrapText(value);

			// Braced values should be trimmed, unless part of a concatenation
			if (type === "braced" && field.value.concat.length === 1) {
				value = value.trim();
			}

			if (type === "braced") {
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
				// FIXME: looks like this is happening even when --enclosing-braces isn't
				// specified?
				return doubleEnclose(value);
			}
			return `"${value}"`;
		})
		.join(" # ");
}
