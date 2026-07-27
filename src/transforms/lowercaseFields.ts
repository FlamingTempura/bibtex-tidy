import { walkAst } from "../ast.ts";
import type { Transform } from "../types.ts";

export function createLowercaseFieldsTransform(): Transform {
	return {
		name: "lowercase-fields",
		apply: (ast) => ({
			ast: walkAst(ast, {
				field: (field) => [
					field.with({ name: field.name.toLocaleLowerCase() }),
				],
			}),
		}),
	};
}
