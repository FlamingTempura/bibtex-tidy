import type { BracedNode } from "../parsers/bibtexParser.ts";
import { flattenLaTeX } from "../parsers/latexParser.ts";
import type { Transform } from "../types.ts";

export function createRemoveBracesTransform(fields: string[]): Transform {
	const set = new Set(fields.map((f) => f.toLocaleLowerCase()));
	return {
		name: "remove-braces",
		apply: (ast) => {
			ast.walk({
				where: (node, ctx): node is BracedNode => {
					if (node.type !== "braced") return false;

					const field = ctx.closestAncestor("field");
					return field !== undefined && set.has(field.name.toLocaleLowerCase());
				},
				enter: (node) => {
					node.latexAst = flattenLaTeX(node.latexAst);
					return [node];
				},
			});
			return undefined;
		},
	};
}
