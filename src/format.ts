import type {
	BlockNode,
	EntryNode,
	FieldNode,
	RootNode,
	TextNode,
} from "./parsers/bibtexParser";
import { doubleEnclose } from "./transforms/encloseBraces";

export function formatBibtex(ast: RootNode): string {
	const bibtex: string = ast.children
		.map((child) => formatNode(child))
		.join("")
		.trimEnd();
	return `${bibtex}\n`;
}

function formatNode(child: TextNode | BlockNode): string {
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
			return `${child.whitespacePrefix}${formatEntry(child.command, child.block)}`;
	}
}

function formatEntry(
	entryType: string, // article, journal, etc
	entry: EntryNode,
) {
	let bibtex = `@${entryType}{`;
	if (entry.key) bibtex += `${entry.key},`;

	for (const field of entry.fields) {
		bibtex += `${field.whitespacePrefix}${field.name}`;
		const value = formatValue(field);
		if (value) {
			bibtex += `${field.value.whitespacePrefix}= ${value}`;
		}
		if (field.hasComma) bibtex += ",";
	}
	bibtex += "\n}";
	return bibtex;
}

export function formatValue(field: FieldNode): string | undefined {
	return field.value.concat
		.map(({ type, value }) => {
			switch (type) {
				case "literal":
					return value;
				case "braced":
					return doubleEnclose(value);
				case "quoted":
					return `"${value}"`;
			}
		})
		.join(" # ");
}
