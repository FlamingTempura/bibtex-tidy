import { parseEntryKeyTemplate } from "./entryKeyTemplateParser.ts";

describe("entryKeyTemplateParser", () => {
	it("parses given template", () => {
		const template = parseEntryKeyTemplate("foo[bar][abc:def:ghi]jk[l2]m");
		expect(template).toEqual([
			"foo",
			{ marker: "bar", parameter: undefined, modifiers: [] },
			{ marker: "abc", parameter: undefined, modifiers: ["def", "ghi"] },
			"jk",
			{ marker: "lN", parameter: 2, modifiers: [] },
			"m",
		]);
	});
});
