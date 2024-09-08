import type { Modifier } from "./limitAuthorsModifier";

// if a field's value has double braces {{blah}}, lose the inner brace
export const stripEnclosingBracesModifier: Modifier<boolean> = {
	condition: (_, options) => Boolean(options.stripEnclosingBraces),
	modifyRenderedValue: (str) => str.replace(/^\{([^{}]*)\}$/g, "$1"),
};
