import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { parseEntryKeyTemplate } from "./entryKeyTemplateParser";

describe("entryKeyTemplateParser", () => {
	it("parses given template", () => {
		const template = parseEntryKeyTemplate("foo[bar][abc:def:ghi]jk[l2]m");
		deepStrictEqual(template, [
			"foo",
			{ marker: "bar", parameter: undefined, modifiers: [] },
			{ marker: "abc", parameter: undefined, modifiers: ["def", "ghi"] },
			"jk",
			{ marker: "lN", parameter: 2, modifiers: [] },
			"m",
		]);
	});
});
