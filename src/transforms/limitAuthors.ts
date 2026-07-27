import { type AstContext, closestAncestor, walkAst } from "../ast.ts";
import type { ValueNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

export function createLimitAuthorsTransform(maxAuthors: number): Transform {
	const visit = (node: ValueNode, ctx: AstContext) => {
		const fieldName = closestAncestor(ctx, "field")?.name.toLocaleLowerCase();
		if (fieldName !== "author") return [node];

		// TODO: use author parser?
		const authors = renderValueNode(node).split(" and ");
		return [
			authors.length > maxAuthors
				? replaceValueNodeText(
						node,
						[...authors.slice(0, maxAuthors), "others"].join(" and "),
					)
				: node,
		];
	};
	return {
		name: "limit-authors",
		apply: (ast) => ({ ast: walkAst(ast, { braced: visit, quoted: visit }) }),
	};
}
