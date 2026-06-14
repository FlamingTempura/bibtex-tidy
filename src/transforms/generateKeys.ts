import { generateKeys } from "../generateKeys.ts";
import { type BlockNode, isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createGenerateKeysTransform(template: string): Transform {
	return {
		name: "generate-keys",
		apply: (astProxy) => {
			const newKeys = generateKeys(astProxy.entries(), astProxy, template);
			astProxy.walk({
				where: (node): node is BlockNode & { block: { type: "entry" } } =>
					isNodeType(node, "block") && isNodeType(node.block, "entry"),
				enter: (node) => {
					const newKey = newKeys.get(node.block);
					if (newKey) {
						node.block.key = newKey;
					}
					return [node];
				},
			});
			return undefined;
		},
	};
}
