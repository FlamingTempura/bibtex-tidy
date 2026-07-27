import { generateKeys } from "../generateKeys.ts";
import { type BlockNode, isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createGenerateKeysTransform(template: string): Transform {
	return {
		name: "generate-keys",
		apply: (ast) => {
			const newKeys = generateKeys(ast.entries(), template);
			ast.replace(
				(node): node is BlockNode & { block: { type: "entry" } } =>
					isNodeType(node, "block") && isNodeType(node.block, "entry"),
				(node) => {
					const newKey = newKeys.get(node.block);
					return newKey
						? [node.with({ block: node.block.with({ key: newKey }) })]
						: [node];
				},
			);
		},
	};
}
