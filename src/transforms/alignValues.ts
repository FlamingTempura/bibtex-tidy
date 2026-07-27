import { closestAncestor, walkAst } from "../ast.ts";
import type { Transform } from "../types.ts";

export function createAlignValuesTransform(column: number): Transform {
	const generatePrefix = (fieldName: string) =>
		" ".repeat(Math.max(column - fieldName.length, 1));
	return {
		name: "align-values",
		apply: (ast) => ({
			ast: walkAst(ast, {
				concat: (concat, ctx) => [
					concat.with({
						whitespacePrefix: generatePrefix(
							closestAncestor(ctx, "field")?.name ?? "",
						),
					}),
				],
			}),
		}),
	};
}
