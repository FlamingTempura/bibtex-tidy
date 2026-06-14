import { isNodeType, type ValueNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

export function createDropAllCapsTransform(): Transform {
	return {
		name: "drop-all-caps",
		apply: (astProxy) => {
			astProxy.walk({
				where: (node, ctx): node is ValueNode => {
					if (!isNodeType(node, "braced", "quoted")) return false;
					const field = ctx.closestAncestor("field");
					return (
						field !== undefined &&
						!astProxy.lookupRenderedEntryValue(field).match(/[a-z]/)
					);
				},
				enter: (node) => {
					replaceValueNodeText(node, titleCase(renderValueNode(node)));
					return [node];
				},
			});
			return undefined;
		},
	};
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
