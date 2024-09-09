import { getEntries } from "..";
import { generateKeys } from "../generateKeys";
import type { Modifier } from "../types";

export const generateKeysModifier: Modifier<string> = {
	type: "RootModifier",
	condition: (options) => options.generateKeys ?? false,
	modifyRoot: (root, cache, entryKeyTemplate) => {
		const newKeys = generateKeys(getEntries(root), cache, entryKeyTemplate);
		for (const node of root.children) {
			if (node.type === "block" && node.block?.type === "entry") {
				const newKey = newKeys.get(node.block);
				if (newKey) {
					node.block.key = newKey;
				}
			}
		}
		return undefined;
	},
};
