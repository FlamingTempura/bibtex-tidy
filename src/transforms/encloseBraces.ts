import { parseLaTeX, stringifyLaTeX } from "../parsers/latexParser";
import type { Transform } from "../types";

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
							node.value = doubleEnclose(node.value);
						}
					}
				}
			}
			return undefined;
		},
	};
}

/**
 * Remove all braces (unless part of a command) and enclose entire value in
 * braces
 */
export function doubleEnclose(str: string): string {
	const latex = parseLaTeX(str);

	const alreadyDoubleEnclosed =
		latex.children.length === 1 &&
		latex.children[0]?.type === "block" &&
		latex.children[0]?.kind === "curly" &&
		latex.children[0].children.length === 1 &&
		latex.children[0].children[0]?.type === "block" &&
		latex.children[0].children[0]?.kind === "curly";

	const result = stringifyLaTeX(latex);
	return alreadyDoubleEnclosed ? result : `{${result}}`;
}
