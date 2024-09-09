import {
	flattenLaTeX,
	parseLaTeX,
	stringifyLaTeX,
} from "../parsers/latexParser";
import type { Modifier } from "../types";

export const removeBracesModifier: Modifier<boolean> = {
	type: "FieldModifier",
	condition: (fieldName, options) =>
		Boolean(
			options.removeBraces?.some((f) => f.toLocaleLowerCase() === fieldName),
		), // TODO: memoize
	modifyRenderedValue: (str) => stringifyLaTeX(flattenLaTeX(parseLaTeX(str))),
};
