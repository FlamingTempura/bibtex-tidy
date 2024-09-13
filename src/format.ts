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
	"tab" | "space" | "align" | "trailingCommas" | "blankLines" | "wrap"
>;
export function formatBibtex(
	ast: RootNode,
	options: WhitespaceOptions,
): string {
	const indent: string = options.tab ? "\t" : " ".repeat(options.space);
	const bibtex: string = ast.children
		.map((child) => formatNode(child, options, indent))
		.join("")
		.trimEnd();
	return `${bibtex}\n`;
}

function formatNode(
	child: TextNode | BlockNode,
	options: WhitespaceOptions,
	indent: string,
): string {
	if (child.type === "text") {
		return formatComment(child.text);
	}

	if (!child.block) throw new Error("FATAL!");

	switch (child.block.type) {
		case "preamble":
		case "string":
			// keep preambles as they were
			return `${child.block.raw}\n${options.blankLines ? "\n" : ""}`;
		case "comment":
			return formatComment(child.block.raw);
		case "entry":
			return (
				formatEntry(child.command, child.block, options, indent) +
				(options.blankLines ? "\n" : "")
			);
	}
}

function formatEntry(
	entryType: string, // article, journal, etc
	entry: EntryNode,
	options: WhitespaceOptions,
	indent: string,
) {
	let bibtex = `@${entryType}{`;
	if (entry.key) bibtex += `${entry.key},`;

	for (const [i, field] of entry.fields.entries()) {
		bibtex += `\n${indent}${field.name}`;
		const value = formatValue(field, options);
		if (value) {
			const gap = Math.max(options.align - field.name.length, 1);
			bibtex += `${" ".repeat(gap)}= ${value}`;
		}
		if (i < entry.fields.length - 1 || options.trailingCommas) bibtex += ",";
	}
	bibtex += "\n}\n";
	return bibtex;
}

function formatComment(comment: string): string {
	// make sure that comment whitespace does not flow into the first line of an entry
	return comment.replace(/^[ \t]*\n|[ \t]*$/g, "");
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
