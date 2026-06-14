import { flattenLaTeX } from "../parsers/latexParser.ts";
import type { Transform } from "../types.ts";

export function createRemoveBracesTransform(fields: string[]): Transform {
	const set = new Set(fields.map((f) => f.toLocaleLowerCase()));
	return {
		name: "remove-braces",
		apply: (ast) => {
			for (const field of ast.fields()) {
				if (set.has(field.name.toLocaleLowerCase())) {
					for (const node of field.value.concat) {
						if (node.type === "braced") {
							node.latexAst = flattenLaTeX(node.latexAst);
						}
					}
				}
			}
			return undefined;
		},
	};
}
