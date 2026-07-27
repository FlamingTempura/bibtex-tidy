import { type BracedNode, isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { encloseLatexInCurly } from "../valueNodes.ts";

// if the user requested, wrap the value in braces (this forces bibtex
// compiler to preserve case)
export function createEncloseBracesTransform(fields: string[]): Transform {
	const set = new Set(fields.map((f) => f.toLocaleLowerCase()));
	return {
		name: "enclose-braces",
		dependencies: ["prefer-curly"],
		apply: (ast) => {
			ast.replace(
				(node, ctx): node is BracedNode => {
					if (!isNodeType(node, "braced")) return false;
					const field = ctx.closestAncestor("field");
					return field !== undefined && set.has(field.name.toLocaleLowerCase());
				},
				(node) => [node.with({ latexAst: encloseLatexInCurly(node.latexAst) })],
			);
		},
	};
}
