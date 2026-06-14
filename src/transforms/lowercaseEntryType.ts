import type { BlockNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createLowercaseEntryTypeTransform(): Transform {
	return {
		name: "lowercase-entry-type",
		apply: (ast) => {
			ast.walk({
				where: (node): node is BlockNode =>
					node.type === "block" && node.block?.type === "entry",
				enter: (node) => {
					node.command = node.command.toLocaleLowerCase();
					return [node];
				},
			});
			return undefined;
		},
	};
}
