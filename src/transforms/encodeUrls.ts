import type { ValueNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

export function createEncodeUrlsTransform(): Transform {
	return {
		name: "encode-urls",
		apply: (ast) => {
			ast.walk({
				where: (node, ctx): node is ValueNode => {
					if (node.type !== "braced" && node.type !== "quoted") {
						return false;
					}

					const field = ctx.closestAncestor("field");
					return field?.name.toLocaleLowerCase() === "url";
				},
				enter: (entry) => {
					replaceValueNodeText(entry, encodeUrl(renderValueNode(entry)));
					return [entry];
				},
			});
			return undefined;
		},
	};
}

function encodeUrl(url: string): string {
	return url.replace(/\\?_/g, "\\%5F");
}
