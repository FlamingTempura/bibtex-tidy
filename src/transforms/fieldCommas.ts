import { walkAst } from "../ast.ts";
import type { Transform } from "../types.ts";

export function createFieldCommasTransform(trailing: boolean): Transform {
	return {
		name: "field-commas",
		apply: (ast) => ({
			ast: walkAst(ast, {
				entry: (entry) => [
					entry.with({
						fields: entry.fields.map((field, i) =>
							field.with({ hasComma: i < entry.fields.length - 1 || trailing }),
						),
					}),
				],
			}),
		}),
	};
}
