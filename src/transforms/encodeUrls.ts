import { type AstContext, closestAncestor, walkAst } from "../ast.ts";
import type { ValueNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

export function createEncodeUrlsTransform(): Transform {
	const visit = (node: ValueNode, ctx: AstContext) => [
		closestAncestor(ctx, "field")?.name.toLocaleLowerCase() === "url"
			? replaceValueNodeText(node, encodeUrl(renderValueNode(node)))
			: node,
	];
	return {
		name: "encode-urls",
		apply: (ast) => ({ ast: walkAst(ast, { braced: visit, quoted: visit }) }),
	};
}

function encodeUrl(url: string): string {
	return url.replace(/\\?_/g, "\\%5F");
}
