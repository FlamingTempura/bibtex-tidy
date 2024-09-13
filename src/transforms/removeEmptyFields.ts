import type { Transform } from "../types";

export function createRemoveEmptyFieldsTransform(): Transform {
	return {
		name: "remove-empty-fields",
		apply: (ast) => {
			for (const node of ast.root().children) {
				if (node.type === "block" && node.block?.type === "entry") {
					const entry = node.block;
					entry.fields = entry.fields.filter(
						(field) => ast.lookupRenderedEntryValue(field) !== "",
					);
				}
			}
			return undefined;
		},
	};
}
