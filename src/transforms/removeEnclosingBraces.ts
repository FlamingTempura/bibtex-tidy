import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

// if a field's value has double braces {{blah}}, lose the inner brace
export function createRemoveEnclosingBracesTransform(): Transform {
	return {
		name: "remove-enclosing-braces",
		apply: (ast) => {
			for (const field of ast.fields()) {
				for (const node of field.value.concat) {
					if (node.type === "braced") {
						replaceValueNodeText(
							node,
							renderValueNode(node).replace(/^\{([^{}]*)\}$/g, "$1"),
						);
					}
					ast.invalidateField(field);
				}
			}
			return undefined;
		},
	};
}
