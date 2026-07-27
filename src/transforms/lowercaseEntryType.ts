import { walkAst } from "../ast.ts";
import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createLowercaseEntryTypeTransform(): Transform {
	return {
		name: "lowercase-entry-type",
		apply: (ast) => ({
			ast: walkAst(ast, {
				block: (node) =>
					isNodeType(node.block, "entry")
						? [node.with({ command: node.command.toLocaleLowerCase() })]
						: [node],
			}),
		}),
	};
}
