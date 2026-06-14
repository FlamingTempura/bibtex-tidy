import type { ValueNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

/** Replace single dash with double dash in page range **/
export function createFormatPageRangeTransform(): Transform {
	return {
		name: "format-page-range",
		apply(ast) {
			ast.walk({
				where: (node, ctx): node is ValueNode =>
					(node.type === "braced" || node.type === "quoted") &&
					ctx.hasAncestor(
						(node) =>
							node.type === "field" &&
							node.name.toLocaleLowerCase() === "pages",
					),
				enter: (entry) => {
					replaceValueNodeText(entry, formatPageRange(renderValueNode(entry)));
					return [entry];
				},
			});
			return undefined;
		},
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
