import { closestAncestor, walkAst } from "../ast.ts";
import { flattenLaTeX } from "../parsers/latexParser.ts";
import type { Transform } from "../types.ts";

export function createRemoveBracesTransform(fields: string[]): Transform {
	const set = new Set(fields.map((f) => f.toLocaleLowerCase()));
	return {
		name: "remove-braces",
		apply: (ast) => ({
			ast: walkAst(ast, {
				braced: (node, ctx) => {
					const field = closestAncestor(ctx, "field");
					return field && set.has(field.name.toLocaleLowerCase())
						? [node.with({ latexAst: flattenLaTeX(node.latexAst) })]
						: [node];
				},
			}),
		}),
	};
}
