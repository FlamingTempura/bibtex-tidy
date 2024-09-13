import type { Transform } from "../types";

export function createRemoveDuplicateFieldsTransform(): Transform {
	return {
		name: "remove-duplicate-fields",
		apply: (astProxy) => {
			for (const node of astProxy.root().children) {
				if (node.type === "block" && node.block?.type === "entry") {
					const fieldSeen = new Set<string>();
					node.block.fields = node.block.fields.filter((field) => {
						const nameLc = field.name.toLocaleLowerCase();
						if (fieldSeen.has(nameLc)) {
							return false;
						}
						fieldSeen.add(nameLc);
						return true;
					});
				}
			}
			return undefined;
		},
	};
}
