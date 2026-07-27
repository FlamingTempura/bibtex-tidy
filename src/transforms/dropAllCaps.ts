import { type AstContext, closestAncestor, walkAst } from "../ast.ts";
import { renderFieldValue } from "../fieldValues.ts";
import type { ValueNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

export function createDropAllCapsTransform(): Transform {
	const visit = (node: ValueNode, ctx: AstContext) => {
		const field = closestAncestor(ctx, "field");
		return [
			field && !renderFieldValue(field).match(/[a-z]/)
				? replaceValueNodeText(node, titleCase(renderValueNode(node)))
				: node,
		];
	};
	return {
		name: "drop-all-caps",
		apply: (ast) => ({ ast: walkAst(ast, { braced: visit, quoted: visit }) }),
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
