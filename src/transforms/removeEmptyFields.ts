import { walkAst } from "../ast.ts";
import type { Transform } from "../types.ts";
import { renderValueNode } from "../valueNodes.ts";

export function createRemoveEmptyFieldsTransform(): Transform {
	return {
		name: "remove-empty-fields",
		apply: (ast) => ({
			ast: walkAst(ast, {
				field: (field) =>
					field.value.values.some((node) => renderValueNode(node).trim() !== "")
						? [field]
						: [],
			}),
		}),
	};
}
