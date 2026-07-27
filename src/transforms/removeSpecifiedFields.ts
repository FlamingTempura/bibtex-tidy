import { walkAst } from "../ast.ts";
import type { Transform } from "../types.ts";

export function createRemoveSpecifiedFieldsTransform(
	omit: string[],
): Transform {
	const set = new Set(omit.map((f) => f.toLocaleLowerCase()));
	return {
		name: "remove-specified-fields",
		apply: (ast) => ({
			ast: walkAst(ast, {
				field: (field) =>
					set.has(field.name.toLocaleLowerCase()) ? [] : [field],
			}),
		}),
	};
}
