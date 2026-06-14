import {
	BracedNode,
	isNodeType,
	type ValueNode,
} from "../parsers/bibtexParser.ts";
import {
	BlockNode as LatexBlockNode,
	TextNode as LatexTextNode,
} from "../parsers/latexParser.ts";
import type { Transform } from "../types.ts";
import { monthAliases } from "./abbreviateMonths.ts";

export function createPreferCurlyTransform(): Transform {
	return {
		name: "prefer-curly",
		apply: (ast) => {
			ast.walk({
				where: (node, ctx): node is ValueNode => {
					if (!isNodeType(node, "literal", "quoted")) return false;
					const field = ctx.closestAncestor("field");
					return !(
						field?.name.toLowerCase() === "month" &&
						monthAliases[ast.lookupRenderedEntryValue(field)]
					);
				},
				enter: (child) => {
					if (isNodeType(child, "braced")) return [child];

					const braced = new BracedNode(child.parent);
					braced.latexAst = isNodeType(child, "quoted")
						? child.latexAst
						: createTextAst(child.value);
					return [braced];
				},
			});
			return undefined;
		},
	};
}

function createTextAst(text: string): LatexBlockNode {
	const ast = new LatexBlockNode("root");
	new LatexTextNode(ast, text);
	return ast;
}
