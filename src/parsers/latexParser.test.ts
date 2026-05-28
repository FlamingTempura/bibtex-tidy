import { flattenLaTeX, parseLaTeX, stringifyLaTeX } from "./latexParser.ts";

const testStrings = [
	{
		input: "foo",
		flattened: "foo",
	},
	{
		input: "foo{bar}",
		flattened: "foobar",
	},
	{
		input: "some {text} with a \\command[and]{multiple}[params]{foo}",
		flattened: "some text with a \\command[and]{multiple}[params]{foo}",
	},
	{
		input: "nesting {blocks {and \\commands{like} this}}.",
		flattened: "nesting blocks {and \\commands{like} this}.",
	},
	{
		input:
			"\\command{in\\commands{should}[work] even with {nested {blocks}}}{too}",
		flattened:
			"\\command{in\\commands{should}[work] even with {nested {blocks}}}{too}",
	},
	{
		input: "{a \\& b}",
		flattened: "{a \\& b}",
	},
	{
		input: "{\\alpha }keep the brace",
		flattened: "{\\alpha }keep the brace",
	},
	{
		input: "{\\alpha}keep the brace",
		flattened: "{\\alpha}keep the brace",
	},
	{
		input: "{{\\alpha}delete the outer brace}",
		flattened: "{\\alpha}delete the outer brace",
	},
];

describe("latex parser", () => {
	it("parses latex", () => {
		for (const str of testStrings) {
			expect(stringifyLaTeX(parseLaTeX(str.input))).toBe(str.input);
		}
	});
});

describe("flattening latex", () => {
	it("flattens latex", () => {
		for (const str of testStrings) {
			expect(stringifyLaTeX(flattenLaTeX(parseLaTeX(str.input)))).toBe(str.flattened);
		}
	});
});
