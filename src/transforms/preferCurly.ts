import { type AstContext, closestAncestor, walkAst } from "../ast.ts";
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
	const visit = (child: QuotedNode | LiteralNode, ctx: AstContext) => {
		const field = closestAncestor(ctx, "field");
		if (
			field?.name.toLowerCase() === "month" &&
			monthAliases[renderFieldValue(field)]
		) {
			return [child];
		}
		return [
			new BracedNode().with({
				latexAst: isNodeType(child, "quoted")
					? child.latexAst
					: createTextAst(child.value),
			}),
		];
	};
	return {
		name: "prefer-curly",
		apply: (ast) => ({ ast: walkAst(ast, { literal: visit, quoted: visit }) }),
	};
}

function createTextAst(text: string): LatexBlockNode {
	const ast = new LatexBlockNode("root");
	ast.children.push(new LatexTextNode(text));
	return ast;
}
