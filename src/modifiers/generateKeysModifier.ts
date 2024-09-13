import { generateKeys } from "../generateKeys";
import type { Transformation } from "../types";

export function createGenerateKeysTransformation(
	template: string,
): Transformation {
	return {
		name: "generate-keys",
		apply: (astProxy) => {
			const newKeys = generateKeys(astProxy.allEntries(), astProxy, template);
			for (const entry of astProxy.allEntries()) {
				const newKey = newKeys.get(entry);
				if (newKey) {
					entry.key = newKey;
				}
			}
			return undefined;
		},
	};
}
