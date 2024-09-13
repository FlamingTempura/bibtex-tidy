import type { BlockNode, EntryNode, TextNode } from "./parsers/bibtexParser";

/**
 * Remove all non-alphanumeric characters
 */
export function alphaNum(str: string): string {
	return str.replace(/[^0-9A-Za-z]/g, "").toLocaleLowerCase();
}

/** Normalize new lines. Convert CR/CRLF to LF. */
export function convertCRLF(str: string): string {
	return str.replace(/\r\n?/g, "\n");
}

export function wrapText(line: string, lineWidth: number): string[] {
	const words: string[] = line.split(" ");
	const lines: string[] = [];
	let currLine = "";
	for (const [i, word] of words.entries()) {
		if (currLine.length + word.length + 1 > lineWidth && i > 0) {
			lines.push(currLine.trim());
			currLine = "";
		}
		currLine += `${word} `;
	}
	return [...lines, currLine.trim()];
}

/**
 * Remove line breaks used to wrap text. This removes all line breaks except
 * double line break (which is a paragraph).
 */
export function unwrapText(str: string): string {
	// Preserve paragraphs (one or more empty lines) by replacing them with markers
	return str
		.replace(/\s*\n\s*\n\s*/g, "<<BIBTEX_TIDY_PARA>>")
		.replace(/\s*\n\s*/g, " ")
		.replace(/<<BIBTEX_TIDY_PARA>>/g, "\n\n");
}

export function isEntryNode(
	node: TextNode | BlockNode,
): node is BlockNode & { block: EntryNode } {
	return node.type !== "text" && node.block?.type === "entry";
}
