import { parseLaTeX, stringifyLaTeX } from "../parsers/latexParser";
import type { Modifier } from "../types";

// if the user requested, wrap the value in braces (this forces bibtex
// compiler to preserve case)
export const encloseBracesModifier: Modifier<boolean> = {
	type: "FieldModifier",
	condition: (fieldName, options) =>
		options.enclosingBraces?.some((f) => f.toLocaleLowerCase() === fieldName) ??
		false,
	modifyNode: (node) => {
		for (const child of node.value.concat) {
			if (child.type === "braced") {
				child.value = doubleEnclose(child.value);
			}
		}
	},
};

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
