import { generateKeys } from "../generateKeys";
import type { Transform } from "../types";

export function createGenerateKeysTransform(template: string): Transform {
	return {
		name: "generate-keys",
		apply: (astProxy) => {
			const newKeys = generateKeys(astProxy.entries(), astProxy, template);
			for (const entry of astProxy.entries()) {
				const newKey = newKeys.get(entry);
				if (newKey) {
					entry.key = newKey;
				}
			}
			return undefined;
		},
	};
}
