import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { generateKey } from "./generateKeys";
import { parseEntryKeyTemplate } from "./parsers/entryKeyTemplateParser";

function generateEntryValues(entry: Record<string, string>) {
	return new Map(Object.entries(entry));
}

describe("generateKey", () => {
	it("can output author", () => {
		const entry = generateEntryValues({ author: "Bar" });
		const template = parseEntryKeyTemplate("[auth]");
		strictEqual(generateKey(entry, template), "Bar");
	});

	it("can output just one author", () => {
		const entry = generateEntryValues({ author: "Bar, Foo and Mee, Moo" });
		const template = parseEntryKeyTemplate("[auth]");
		strictEqual(generateKey(entry, template), "Bar");
	});

	it("can truncate authors to 2", () => {
		const entry = generateEntryValues({ author: "A and B and C" });
		const template = parseEntryKeyTemplate("[authEtAl]");
		strictEqual(generateKey(entry, template), "ABEtAl");
	});

	it("can tuncate authors to specified limit", () => {
		const entry = generateEntryValues({ author: "A and B and C and D and E" });
		const template = parseEntryKeyTemplate("[authors4]");
		strictEqual(generateKey(entry, template), "ABCDEtAl");
	});

	it("does not truncate authors below specified limit", () => {
		const entry = generateEntryValues({ author: "A and B and C" });
		const template = parseEntryKeyTemplate("[authors4]");
		strictEqual(generateKey(entry, template), "ABC");
	});

	it("omits spaces in names", () => {
		const entry = generateEntryValues({ author: "Bar Han, Foo" });
		const template = parseEntryKeyTemplate("[auth]");
		strictEqual(generateKey(entry, template), "BarHan");
	});

	it("can transform to uppercase", () => {
		const entry = generateEntryValues({ author: "Bar" });
		const template = parseEntryKeyTemplate("[auth:upper]");
		strictEqual(generateKey(entry, template), "BAR");
	});

	it("can transform to lowercase", () => {
		const entry = generateEntryValues({ author: "Bar" });
		const template = parseEntryKeyTemplate("[auth:lower]");
		strictEqual(generateKey(entry, template), "bar");
	});

	it("can capitalize", () => {
		const entry = generateEntryValues({ author: "BAR" });
		const template = parseEntryKeyTemplate("[auth:capitalize]");
		strictEqual(generateKey(entry, template), "Bar");
	});

	it("can output very short title", () => {
		const entry = generateEntryValues({
			title: "A story of 2 foo and 1 bar: the best story",
		});
		const template = parseEntryKeyTemplate("[veryshorttitle]");
		strictEqual(generateKey(entry, template), "story");
	});

	it("can output short title", () => {
		const entry = generateEntryValues({
			title: "A story of 2 foo and 1 bar: the best story",
		});
		const template = parseEntryKeyTemplate("[shorttitle]");
		strictEqual(generateKey(entry, template), "story2foo");
	});

	it("can output title, capitalized", () => {
		const entry = generateEntryValues({
			title: "A story of 2 foo and 1 bar: the best story",
		});
		const template = parseEntryKeyTemplate("[title]");
		strictEqual(
			generateKey(entry, template),
			"AStoryOf2FooAnd1BarTheBestStory",
		);
	});

	it("can output full title, verbatim", () => {
		const entry = generateEntryValues({
			title: "A story of 2 foo and 1 bar: the best story",
		});
		const template = parseEntryKeyTemplate("[fulltitle]");
		strictEqual(
			generateKey(entry, template),
			"Astoryof2fooand1barthebeststory",
		);
	});

	it("can output year", () => {
		const entry = generateEntryValues({ year: "2018" });
		const template = parseEntryKeyTemplate("[year]");
		strictEqual(generateKey(entry, template), "2018");
	});

	it("can output specified fields", () => {
		const entry = generateEntryValues({ publisher: "Hello" });
		const template = parseEntryKeyTemplate("[PUBLISHER]");
		strictEqual(generateKey(entry, template), "Hello");
	});

	it("can comprise multiple parts", () => {
		const entry = generateEntryValues({ author: "Bar", year: "2018" });
		const template = parseEntryKeyTemplate("[auth:upper][year]");
		strictEqual(generateKey(entry, template), "BAR2018");
	});
});
