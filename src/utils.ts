import { specialCharacters } from './unicode';

export function escapeSpecialCharacters(str: string): string {
	let newstr: string = '';
	let escapeMode: boolean = false;
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
		newstr += specialCharacters.get(c) || str[i];
	}
	return newstr;
}

export function titleCase(str: string): string {
	return str.replace(
		/(\w)(\S*)/g,
		(_, first, rest) => first.toLocaleUpperCase() + rest.toLocaleLowerCase()
	);
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
	const lines: string[] = [''];
	for (const word of words) {
		if (lines[lines.length - 1].length + word.length + 1 > lineWidth) {
			lines.push('');
		}
		lines[lines.length - 1] += word + ' ';
	}
	return lines.map((line) => line.trim());
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
		.replace(/<<BIBTEX_TIDY_PARA>>/g, '\n\n')
		.trim();
}

/** Remove all braces and enclose entire value in braces */
export function addEnclosingBraces(
	str: string,
	removeInsideBraces?: boolean
): string {
	if (removeInsideBraces) str = str.replace(/[{}]/g, '');
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
