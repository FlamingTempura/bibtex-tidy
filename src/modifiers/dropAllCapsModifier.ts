import type { ASTProxy } from "../cache";
import type { FieldNode } from "../parsers/bibtexParser";
import type { Transformation } from "../types";

export function createDropAllCapsTransformation(): Transformation {
	return {
		name: "drop-all-caps",
		apply: (astProxy) => {
			for (const field of astProxy.allFields()) {
				dropAllCapsInField(astProxy, field);
			}
			return undefined;
		},
	};
}

function dropAllCapsInField(astProxy: ASTProxy, field: FieldNode) {
	if (!astProxy.lookupRenderedEntryValue2(field).match(/[a-z]/)) {
		for (const node of field.value.concat) {
			node.value = titleCase(node.value);
		}
		astProxy.invalidateEntryValue(field.parent, field.name);
	}
}

function titleCase(str: string): string {
	return str.replace(/(\w)(\S*)/g, (_, first, rest) => {
		const word = first + rest;
		if (isRomanNumeral(word)) return word;
		return first.toLocaleUpperCase() + rest.toLocaleLowerCase();
	});
}

function isRomanNumeral(str: string): boolean {
	return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(str);
}
