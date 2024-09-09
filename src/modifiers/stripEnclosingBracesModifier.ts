import type { Modifier } from "../types";

// if a field's value has double braces {{blah}}, lose the inner brace
export const stripEnclosingBracesModifier: Modifier = {
	type: "FieldModifier",
	condition: (_, options) => Boolean(options.stripEnclosingBraces),
	modifyRenderedValue: (str) => str.replace(/^\{([^{}]*)\}$/g, "$1"),
};
