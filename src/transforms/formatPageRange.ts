import { type AstContext, closestAncestor, walkAst } from "../ast.ts";
import type { ValueNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

/** Replace single dash with double dash in page range **/
export function createFormatPageRangeTransform(): Transform {
	const visit = (node: ValueNode, ctx: AstContext) => [
		closestAncestor(ctx, "field")?.name.toLocaleLowerCase() === "pages"
			? replaceValueNodeText(node, formatPageRange(renderValueNode(node)))
			: node,
	];
	return {
		name: "format-page-range",
		apply: (ast) => ({ ast: walkAst(ast, { braced: visit, quoted: visit }) }),
	};
}

function formatPageRange(str: string): string {
	let result = str;
	// TODO: replace with replaceAll when more widespread node support
	for (let i = 0; i < 4; i++) {
		result = result.replace(/(\d)\s*-\s*(\d)/g, "$1--$2");
	}
	return result;
}
