import { isNodeType, type ValueNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

export function createEncodeUrlsTransform(): Transform {
	return {
		name: "encode-urls",
		apply: (ast) => {
			ast.replace(
				(node, ctx): node is ValueNode =>
					isNodeType(node, "braced", "quoted") &&
					ctx.closestAncestor("field")?.name.toLocaleLowerCase() === "url",
				(entry) => [
					replaceValueNodeText(entry, encodeUrl(renderValueNode(entry))),
				],
			);
		},
	};
}

function encodeUrl(url: string): string {
	return url.replace(/\\?_/g, "\\%5F");
}
