import { type BlockNode, isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createLowercaseEntryTypeTransform(): Transform {
	return {
		name: "lowercase-entry-type",
		apply: (ast) => {
			ast.walk({
				where: (node): node is BlockNode =>
					isNodeType(node, "block") && isNodeType(node.block, "entry"),
				enter: (node) => [
					node.with({ command: node.command.toLocaleLowerCase() }),
				],
			});
			return undefined;
		},
	};
}
