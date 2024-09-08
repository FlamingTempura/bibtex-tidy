import { MONTH_SET } from "./months";
import type { OptionsNormalized } from "./optionUtils";
import type {
	BlockNode,
	EntryNode,
	FieldNode,
	RootNode,
	TextNode,
} from "./parsers/bibtexParser";

import { doubleEnclose, unwrapText, wrapText } from "./utils";

export function formatBibtex(
	ast: RootNode,
	options: OptionsNormalized,
	replacementKeys?: Map<EntryNode, string>,
): string {
	const { omit, tab, space } = options;

	const indent: string = tab ? "\t" : " ".repeat(space);
	const omitFields = new Set<string>(omit);
	let bibtex: string = ast.children
		.map((child) =>
			formatNode(child, options, indent, omitFields, replacementKeys),
		)
		.join("")
		.trimEnd();

	if (!bibtex.endsWith("\n")) bibtex += "\n";

	return bibtex;
}

function formatNode(
	child: TextNode | BlockNode,
	options: OptionsNormalized,
	indent: string,
	omitFields: Set<string>,
	replacementKeys?: Map<EntryNode, string>,
): string {
	if (child.type === "text") {
		return formatComment(child.text, options);
	}

	if (!child.block) throw new Error("FATAL!");

	switch (child.block.type) {
		case "preamble":
		case "string":
			// keep preambles as they were
			return `${child.block.raw}\n${options.blankLines ? "\n" : ""}`;
		case "comment":
			return formatComment(child.block.raw, options);
		case "entry":
			return (
				formatEntry(
					child.command,
					child.block,
					options,
					indent,
					omitFields,
					replacementKeys?.get(child.block),
				) + (options.blankLines ? "\n" : "")
			);
	}
}

function formatEntry(
	entryType: string, // article, journal, etc
	entry: EntryNode,
	options: OptionsNormalized,
	indent: string,
	omitFields: Set<string>,
	replacementKey?: string,
) {
	const {
		align,
		trailingCommas,
		removeDuplicateFields,
		removeEmptyFields,
		lowercase,
	} = options;

	let bibtex = "";
	const itemType = lowercase ? entryType.toLocaleLowerCase() : entryType;
	bibtex += `@${itemType}{`;
	const key = replacementKey ?? entry.key;
	if (key) bibtex += `${key},`;

	const fieldSeen = new Set<string>();
	for (const [i, field] of entry.fields.entries()) {
		const nameLowerCase = field.name.toLocaleLowerCase();
		const name = lowercase ? nameLowerCase : field.name;

		if (field.name === "") continue;
		if (omitFields.has(nameLowerCase)) continue;
		if (removeDuplicateFields && fieldSeen.has(nameLowerCase)) continue;
		fieldSeen.add(nameLowerCase);

		if (field.value.concat.length === 0) {
			if (removeEmptyFields) continue;
			bibtex += `\n${indent}${name}`;
		} else {
			const value = formatValue(field, options);
			if (removeEmptyFields && (value === "{}" || value === '""')) continue;
			bibtex += `\n${indent}${name.trim().padEnd(align - 1)} = ${value}`;
		}

		if (i < entry.fields.length - 1 || trailingCommas) bibtex += ",";
	}
	bibtex += "\n}\n";
	return bibtex;
}

function formatComment(
	comment: string,
	{ stripComments, tidyComments }: OptionsNormalized,
): string {
	if (stripComments) return "";
	if (tidyComments) {
		// tidy comments by trimming whitespace and ending with one newline
		const trimmed = comment.trim();
		if (trimmed === "") return "";
		return `${trimmed}\n`;
	}
	// make sure that comment whitespace does not flow into the first line of an entry
	return comment.replace(/^[ \t]*\n|[ \t]*$/g, "");
}

export function formatValue(
	field: FieldNode,
	options: OptionsNormalized,
): string | undefined {
	const { curly, numeric, align, wrap, tab, space, enclosingBraces } = options;

	const nameLowerCase = field.name.toLocaleLowerCase();

	const indent: string = tab ? "\t" : " ".repeat(space);
	const enclosingBracesFields = new Set<string>(
		(enclosingBraces ?? []).map((field) => field.toLocaleLowerCase()),
	);

	return field.value.concat
		.map(({ type, value }) => {
			const isNumeric = value.match(/^[1-9][0-9]*$/);

			if (isNumeric && curly) {
				type = "braced";
			}

			if (type === "literal" || (numeric && isNumeric)) {
				return value;
			}

			const dig3 = value.slice(0, 3).toLowerCase();
			const isMonthAbbrv = nameLowerCase === "month" && MONTH_SET.has(dig3);
			if (!curly && numeric && isMonthAbbrv) {
				return dig3;
			}

			value = unwrapText(value);

			// if the user requested, wrap the value in braces (this forces bibtex
			// compiler to preserve case)
			if (
				enclosingBracesFields.has(nameLowerCase) &&
				(type === "braced" || curly)
			) {
				value = doubleEnclose(value);
			}

			// Braced values should be trimmed, unless part of a concatenation
			if (type === "braced" && field.value.concat.length === 1) {
				value = value.trim();
			}

			if (type === "braced" || curly) {
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
