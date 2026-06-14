import type { Transform } from "../types.ts";
import { encloseLatexInCurly } from "../valueNodes.ts";

// if the user requested, wrap the value in braces (this forces bibtex
// compiler to preserve case)
export function createEncloseBracesTransform(fields: string[]): Transform {
	const set = new Set(fields.map((f) => f.toLocaleLowerCase()));
	return {
		name: "enclose-braces",
		dependencies: ["prefer-curly"],
		apply: (ast) => {
			for (const field of ast.fields()) {
				if (set.has(field.name.toLocaleLowerCase())) {
					for (const node of field.value.concat) {
						if (node.type === "braced") {
							node.latexAst = encloseLatexInCurly(node.latexAst);
						}
					}
				}
			}
			return undefined;
		},
	};
}
