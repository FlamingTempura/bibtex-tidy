import type { Transform } from "../types.ts";
import { renderValueNode } from "../valueNodes.ts";

export function createRemoveEmptyFieldsTransform(): Transform {
	return {
		name: "remove-empty-fields",
		apply: (ast) => {
			for (const node of ast.root().children) {
				if (node.type === "block" && node.block?.type === "entry") {
					const entry = node.block;
					entry.fields = entry.fields.filter((field) =>
						field.value.concat.some(
							(node) => renderValueNode(node).trim() !== "",
						),
					);
				}
			}
			return undefined;
		},
	};
}
