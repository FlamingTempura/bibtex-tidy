import {
	flattenLaTeX,
	parseLaTeX,
	stringifyLaTeX,
} from "../parsers/latexParser";
import type { Transformation } from "../types";

export const removeBracesModifier: Transformation = {
	name: "remove-braces",
	type: "FieldModifier",
	condition: (fieldName, options) =>
		Boolean(
			options.removeBraces?.some((f) => f.toLocaleLowerCase() === fieldName),
		), // TODO: memoize
	modifyRenderedValue: (str) => stringifyLaTeX(flattenLaTeX(parseLaTeX(str))),
};
