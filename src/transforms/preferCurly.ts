import { BracedNode, type ValueNode } from "../parsers/bibtexParser.ts";
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
					if (node.type !== "literal" && node.type !== "quoted") {
						return false;
					}

					const field = ctx.closestAncestor("field");
					return !(
						field?.name.toLowerCase() === "month" &&
						monthAliases[ast.lookupRenderedEntryValue(field)]
					);
				},
				enter: (child) => {
					if (child.type === "braced") return [child];

					const braced = new BracedNode(child.parent);
					braced.latexAst =
						child.type === "quoted"
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
