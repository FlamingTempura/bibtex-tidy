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
	{
		input: "runtime $O(n \\log n)$ end",
		flattened: "runtime $O(n \\log n)$ end",
	},
	{
		input: "math $a\\$b$ end",
		flattened: "math $a\\$b$ end",
	},
];

describe("latex parser", () => {
	it("parses latex", () => {
		for (const str of testStrings) {
			expect(stringifyLaTeX(parseLaTeX(str.input))).toBe(str.input);
		}
	});

	it("parses math nodes", () => {
		const ast = parseLaTeX("runtime $O(n \\log n)$ end");

		expect(ast.children[0]?.type).toBe("text");
		expect(ast.children[1]?.type).toBe("math");
		if (ast.children[1]?.type !== "math") {
			throw new Error("Expected math node");
		}
		expect(ast.children[1].text).toBe("O(n \\log n)");
		expect(ast.children[2]?.type).toBe("text");
	});

	it("does not close math on escaped dollars", () => {
		const ast = parseLaTeX("$a\\$b$");

		expect(ast.children).toHaveLength(1);
		expect(ast.children[0]?.type).toBe("math");
		if (ast.children[0]?.type !== "math") {
			throw new Error("Expected math node");
		}
		expect(ast.children[0].text).toBe("a\\$b");
	});

	it("does not parse unmatched dollars as math", () => {
		const ast = parseLaTeX("Chars $, text");

		expect(ast.children).toHaveLength(1);
		expect(ast.children[0]?.type).toBe("text");
		expect(stringifyLaTeX(ast)).toBe("Chars $, text");
	});

	it("round-trips unmatched dollars in braced text", () => {
		const input = 'Chars \\", _, $, @, &, é, ɛ, ū, {"}';

		expect(stringifyLaTeX(parseLaTeX(input))).toBe(input);
	});
});

describe("flattening latex", () => {
	it("flattens latex", () => {
		for (const str of testStrings) {
			expect(stringifyLaTeX(flattenLaTeX(parseLaTeX(str.input)))).toBe(
				str.flattened,
			);
		}
	});
});
