import { isNodeType, type ValueNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

export function createLimitAuthorsTransform(maxAuthors: number): Transform {
	return {
		name: "limit-authors",
		apply: (ast) => {
			ast.replace(
				(node, ctx): node is ValueNode =>
					isNodeType(node, "braced", "quoted") &&
					ctx.closestAncestor("field")?.name.toLocaleLowerCase() === "author",
				(node) => {
					// TODO: use author parser?
					const authors = renderValueNode(node).split(" and ");
					if (authors.length > maxAuthors) {
						return [
							replaceValueNodeText(
								node,
								[...authors.slice(0, maxAuthors), "others"].join(" and "),
							),
						];
					}
					return [node];
				},
			);
		},
	};
}
