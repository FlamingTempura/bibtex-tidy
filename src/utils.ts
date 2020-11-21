import { unicode } from './unicode';

const specialCharacters = new Map(unicode);

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
export function alphaNum(str?: string): string | undefined {
	if (typeof str === 'undefined') return undefined;
	return String(str)
		.replace(/[^0-9A-Za-z]/g, '')
		.toLocaleLowerCase();
}

export function splitLines(line: string, limit: number): string[] {
	const words = line.split(' ');
	const lines = [''];
	for (const word of words) {
		if (lines[lines.length - 1].length + word.length + 1 > limit)
			lines.push('');
		lines[lines.length - 1] += word + ' ';
	}
	return lines.map((line) => line.trim());
}

export function fromCamelCase(str: string): string {
	return str.replace(/[A-Z]/g, (c: string) => '-' + c.toLowerCase());
}
