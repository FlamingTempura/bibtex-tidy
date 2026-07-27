import { walkAst } from "../ast.ts";
import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createRemoveCommentsTransform(): Transform {
	return {
		name: "remove-comments",
		apply: (ast) => ({
			ast: walkAst(ast, {
				text: () => [],
				block: (node) => (isNodeType(node.block, "comment") ? [] : [node]),
			}),
		}),
	};
}
