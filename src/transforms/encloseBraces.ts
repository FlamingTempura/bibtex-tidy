import { closestAncestor, walkAst } from "../ast.ts";
import type { Transform } from "../types.ts";
import { encloseLatexInCurly } from "../valueNodes.ts";

// if the user requested, wrap the value in braces (this forces bibtex
// compiler to preserve case)
export function createEncloseBracesTransform(fields: string[]): Transform {
	const set = new Set(fields.map((f) => f.toLocaleLowerCase()));
	return {
		name: "enclose-braces",
		dependencies: ["prefer-curly"],
		apply: (ast) => ({
			ast: walkAst(ast, {
				braced: (node, ctx) => {
					const field = closestAncestor(ctx, "field");
					return field && set.has(field.name.toLocaleLowerCase())
						? [node.with({ latexAst: encloseLatexInCurly(node.latexAst) })]
						: [node];
				},
			}),
		}),
	};
}
