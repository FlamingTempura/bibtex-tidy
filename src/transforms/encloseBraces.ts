import type { BracedNode } from "../parsers/bibtexParser.ts";
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
			ast.walk({
				where: (node, ctx): node is BracedNode =>
					node.type === "braced" &&
					ctx.hasAncestor(
						(node) =>
							node.type === "field" && set.has(node.name.toLocaleLowerCase()),
					),
				enter: (node) => {
					node.latexAst = encloseLatexInCurly(node.latexAst);
					return [node];
				},
			});
			return undefined;
		},
	};
}
