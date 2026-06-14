import { LiteralNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode } from "../valueNodes.ts";

export function createPreferNumericTransform(): Transform {
	return {
		name: "prefer-numeric",
		dependencies: ["prefer-curly"],
		apply: (ast) => {
			for (const field of ast.fields()) {
				field.value.concat = field.value.concat.map((child) => {
					const isNumeric = renderValueNode(child).match(/^[1-9][0-9]*$/);
					if (isNumeric) {
						return new LiteralNode(child.parent, renderValueNode(child));
					}
					return child;
				});
				ast.invalidateField(field);
			}
			return undefined;
		},
	};
}
