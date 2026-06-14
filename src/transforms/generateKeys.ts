import { generateKeys } from "../generateKeys.ts";
import type { BlockNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createGenerateKeysTransform(template: string): Transform {
	return {
		name: "generate-keys",
		apply: (astProxy) => {
			const newKeys = generateKeys(astProxy.entries(), astProxy, template);
			astProxy.walk({
				where: (node): node is BlockNode & { block: { type: "entry" } } =>
					node.type === "block" && node.block?.type === "entry",
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
