import type { BlockNode, EntryNode, TextNode } from './bibtex-parser';
import { flattenLaTeX, parseLaTeX, stringifyLaTeX } from './latexParser';
import { specialCharacters } from './unicode';

export function escapeSpecialCharacters(str: string): string {
	const mathExpressions: string[] = [];

	str = str.replace(/\$[^$]+\$/, (match) => {
		mathExpressions.push(match);
		return `MATH.EXP.${mathExpressions.length - 1}`;
	});

	let newstr = '';
	let escapeMode = false;

	for (let i = 0; i < str.length; i++) {
		if (escapeMode) {
			escapeMode = false;
			newstr += str[i];
			continue;
		}
		if (str[i] === '\\') {
			escapeMode = true;
			newstr += str[i];
			continue;
		}
		// iterate through each character and if it's a special char replace with latex code
		const c = str.charCodeAt(i).toString(16).padStart(4, '0');
		newstr += specialCharacters.get(c) ?? str[i];
	}
	return newstr.replace(
		/MATH\.EXP\.(\d+)/,
		(_, i) => mathExpressions[Number(i)] ?? ''
	);
}

export function titleCase(str: string): string {
	return str.replace(/(\w)(\S*)/g, (_, first, rest) => {
		const word = first + rest;
		if (isRomanNumeral(word)) return word;
		return first.toLocaleUpperCase() + rest.toLocaleLowerCase();
	});
}

function isRomanNumeral(str: string): boolean {
	return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(str);
}

/**
 * Remove all non-alphanumeric characters
 */
export function alphaNum(str: string): string {
	return str.replace(/[^0-9A-Za-z]/g, '').toLocaleLowerCase();
}

/** Normalize new lines. Convert CR/CRLF to LF. */
export function convertCRLF(str: string): string {
	return str.replace(/\r\n?/g, '\n');
}

export function wrapText(line: string, lineWidth: number): string[] {
	const words: string[] = line.split(' ');
	const lines: string[] = [];
	let currLine = '';
	for (const [i, word] of words.entries()) {
		if (currLine.length + word.length + 1 > lineWidth && i > 0) {
			lines.push(currLine.trim());
			currLine = '';
		}
		currLine += word + ' ';
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
		.replace(/\s*\n\s*\n\s*/g, '<<BIBTEX_TIDY_PARA>>')
		.replace(/\s*\n\s*/g, ' ')
		.replace(/<<BIBTEX_TIDY_PARA>>/g, '\n\n');
}

/**
 * Remove all braces (unless part of a command) and enclose entire value in
 * braces
 */
export function addEnclosingBraces(
	str: string,
	removeInsideBraces?: boolean
): string {
	if (removeInsideBraces) {
		str = stringifyLaTeX(flattenLaTeX(parseLaTeX(str)));
	}
	return `{${str}}`;
}

export function removeEnclosingBraces(str: string): string {
	return str.replace(/^\{([^{}]*)\}$/g, '$1');
}

export function escapeURL(str: string): string {
	return str.replace(/\\?_/g, '\\%5F');
}

export function limitAuthors(str: string, maxAuthors: number): string {
	const authors = str.split(' and ');
	if (authors.length > maxAuthors) {
		return [...authors.slice(0, maxAuthors), 'others'].join(' and ');
	}
	return str;
}

/** Replace single dash with double dash in page range **/
export function formatPageRange(str: string): string {
	// TODO: replace with replaceAll when more widespread node support
	for (let i = 0; i < 4; i++) {
		str = str.replace(/(\d)\s*-\s*(\d)/g, '$1--$2');
	}
	return str;
}

export function isEntryNode(
	node: TextNode | BlockNode
): node is BlockNode & { block: EntryNode } {
	return node.type !== 'text' && node.block?.type === 'entry';
}
