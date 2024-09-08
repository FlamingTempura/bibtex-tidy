import {
	flattenLaTeX,
	parseLaTeX,
	stringifyLaTeX,
} from "../parsers/latexParser";
import type { Modifier } from "./limitAuthorsModifier";

export const removeBracesModifier: Modifier<boolean> = {
	condition: (fieldName, options) =>
		Boolean(
			options.removeBraces?.some((f) => f.toLocaleLowerCase() === fieldName),
		), // TODO: memoize
	modifyRenderedValue: (str) => stringifyLaTeX(flattenLaTeX(parseLaTeX(str))),
};
