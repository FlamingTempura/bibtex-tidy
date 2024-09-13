import type { Transform } from "../types";

// if a field's value has double braces {{blah}}, lose the inner brace
export function createRemoveEnclosingBracesTransform(): Transform {
	return {
		name: "remove-enclosing-braces",
		apply: (ast) => {
			for (const field of ast.fields()) {
				for (const node of field.value.concat) {
					if (node.type === "braced") {
						node.value = node.value.replace(/^\{([^{}]*)\}$/g, "$1");
					}
					ast.invalidateField(field);
				}
			}
			return undefined;
		},
	};
}
