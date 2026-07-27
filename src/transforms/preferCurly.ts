import { renderFieldValue } from "../fieldValues.ts";
import {
	BracedNode,
	isNodeType,
	type LiteralNode,
	type QuotedNode,
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
			ast.replace(
				(node, ctx): node is QuotedNode | LiteralNode => {
					if (!isNodeType(node, "literal", "quoted")) return false;
					const field = ctx.closestAncestor("field");
					return !(
						field?.name.toLowerCase() === "month" &&
						monthAliases[renderFieldValue(field)]
					);
				},
				(child) => [
					new BracedNode(child.parent).with({
						latexAst: isNodeType(child, "quoted")
							? child.latexAst
							: createTextAst(child.value),
					}) as unknown as QuotedNode | LiteralNode, // hack
				],
			);
		},
	};
}

function createTextAst(text: string): LatexBlockNode {
	const ast = new LatexBlockNode("root");
	new LatexTextNode(ast, text);
	return ast;
}
