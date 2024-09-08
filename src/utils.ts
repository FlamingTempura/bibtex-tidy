import type { BlockNode, EntryNode, TextNode } from "./parsers/bibtexParser";
import { parseLaTeX, stringifyLaTeX } from "./parsers/latexParser";

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

/**
 * Remove all braces (unless part of a command) and enclose entire value in
 * braces
 */
export function doubleEnclose(str: string): string {
	const latex = parseLaTeX(str);

	const alreadyDoubleEnclosed =
		latex.children.length === 1 &&
		latex.children[0]?.type === "block" &&
		latex.children[0]?.kind === "curly" &&
		latex.children[0].children.length === 1 &&
		latex.children[0].children[0]?.type === "block" &&
		latex.children[0].children[0]?.kind === "curly";

	const result = stringifyLaTeX(latex);
	return alreadyDoubleEnclosed ? result : `{${result}}`;
}

export function isEntryNode(
	node: TextNode | BlockNode,
): node is BlockNode & { block: EntryNode } {
	return node.type !== "text" && node.block?.type === "entry";
}
