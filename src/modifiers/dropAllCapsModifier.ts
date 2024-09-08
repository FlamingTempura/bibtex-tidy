import type { Modifier } from "./limitAuthorsModifier";

export const dropAllCapsModifier: Modifier<boolean> = {
	condition: (fieldName, options, entry, cache) =>
		Boolean(
			options.dropAllCaps &&
				!cache.lookupRenderedEntryValue(entry, fieldName).match(/[a-z]/),
		),
	modifyRenderedValue: (str) => {
		// conver to title case
		return str.replace(/(\w)(\S*)/g, (_, first, rest) => {
			const word = first + rest;
			if (isRomanNumeral(word)) return word;
			return first.toLocaleUpperCase() + rest.toLocaleLowerCase();
		});
	},
};

function isRomanNumeral(str: string): boolean {
	return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(str);
}
