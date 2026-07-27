import { walkAst } from "../ast.ts";
import type { Transform } from "../types.ts";

export function createIndentFieldsTransform(indent: string): Transform {
	return {
		name: "indent",
		apply: (ast) => ({
			ast: walkAst(ast, {
				field: (field) => [field.with({ whitespacePrefix: `\n${indent}` })],
			}),
		}),
	};
}
