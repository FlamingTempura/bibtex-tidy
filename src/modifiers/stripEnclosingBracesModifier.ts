import type { Transformation } from "../types";

// if a field's value has double braces {{blah}}, lose the inner brace
export const stripEnclosingBracesModifier: Transformation = {
	name: "strip-enclosing-braces",
	type: "FieldModifier",
	condition: (_, options) => Boolean(options.stripEnclosingBraces),
	modifyRenderedValue: (str) => str.replace(/^\{([^{}]*)\}$/g, "$1"),
};
