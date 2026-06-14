import type { ValueNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

export function createLimitAuthorsTransform(maxAuthors: number): Transform {
	return {
		name: "limit-authors",
		apply: (astProxy) => {
			astProxy.walk({
				where: (node, ctx): node is ValueNode => {
					if (node.type !== "braced" && node.type !== "quoted") {
						return false;
					}

					const field = ctx.closestAncestor("field");
					return field?.name.toLocaleLowerCase() === "author";
				},
				enter: (node) => {
					// TODO: use author parser?
					const authors = renderValueNode(node).split(" and ");
					if (authors.length > maxAuthors) {
						replaceValueNodeText(
							node,
							[...authors.slice(0, maxAuthors), "others"].join(" and "),
						);
					}
					return [node];
				},
			});
			return undefined;
		},
	};
}
