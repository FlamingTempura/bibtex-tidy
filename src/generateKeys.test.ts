import { generateKey } from "./generateKeys.ts";
import { parseEntryKeyTemplate } from "./parsers/entryKeyTemplateParser.ts";

function generateEntryValues(entry: Record<string, string>) {
	return new Map(Object.entries(entry));
}

describe("generateKey", () => {
	it("can output author", () => {
		const entry = generateEntryValues({ author: "Bar" });
		const template = parseEntryKeyTemplate("[auth]");
		expect(generateKey(entry, template)).toBe("Bar");
	});

	it("can output just one author", () => {
		const entry = generateEntryValues({ author: "Bar, Foo and Mee, Moo" });
		const template = parseEntryKeyTemplate("[auth]");
		expect(generateKey(entry, template)).toBe("Bar");
	});

	it("can truncate authors to 2", () => {
		const entry = generateEntryValues({ author: "A and B and C" });
		const template = parseEntryKeyTemplate("[authEtAl]");
		expect(generateKey(entry, template)).toBe("ABEtAl");
	});

	it("can tuncate authors to specified limit", () => {
		const entry = generateEntryValues({ author: "A and B and C and D and E" });
		const template = parseEntryKeyTemplate("[authors4]");
		expect(generateKey(entry, template)).toBe("ABCDEtAl");
	});

	it("does not truncate authors below specified limit", () => {
		const entry = generateEntryValues({ author: "A and B and C" });
		const template = parseEntryKeyTemplate("[authors4]");
		expect(generateKey(entry, template)).toBe("ABC");
	});

	it("omits spaces in names", () => {
		const entry = generateEntryValues({ author: "Bar Han, Foo" });
		const template = parseEntryKeyTemplate("[auth]");
		expect(generateKey(entry, template)).toBe("BarHan");
	});

	it("can transform to uppercase", () => {
		const entry = generateEntryValues({ author: "Bar" });
		const template = parseEntryKeyTemplate("[auth:upper]");
		expect(generateKey(entry, template)).toBe("BAR");
	});

	it("can transform to lowercase", () => {
		const entry = generateEntryValues({ author: "Bar" });
		const template = parseEntryKeyTemplate("[auth:lower]");
		expect(generateKey(entry, template)).toBe("bar");
	});

	it("can capitalize", () => {
		const entry = generateEntryValues({ author: "BAR" });
		const template = parseEntryKeyTemplate("[auth:capitalize]");
		expect(generateKey(entry, template)).toBe("Bar");
	});

	it("can output very short title", () => {
		const entry = generateEntryValues({
			title: "A story of 2 foo and 1 bar: the best story",
		});
		const template = parseEntryKeyTemplate("[veryshorttitle]");
		expect(generateKey(entry, template)).toBe("story");
	});

	it("can output short title", () => {
		const entry = generateEntryValues({
			title: "A story of 2 foo and 1 bar: the best story",
		});
		const template = parseEntryKeyTemplate("[shorttitle]");
		expect(generateKey(entry, template)).toBe("story2foo");
	});

	it("can output title, capitalized", () => {
		const entry = generateEntryValues({
			title: "A story of 2 foo and 1 bar: the best story",
		});
		const template = parseEntryKeyTemplate("[title]");
		expect(generateKey(entry, template)).toBe(
			"AStoryOf2FooAnd1BarTheBestStory",
		);
	});

	it("can output full title, verbatim", () => {
		const entry = generateEntryValues({
			title: "A story of 2 foo and 1 bar: the best story",
		});
		const template = parseEntryKeyTemplate("[fulltitle]");
		expect(generateKey(entry, template)).toBe(
			"Astoryof2fooand1barthebeststory",
		);
	});

	it("can output year", () => {
		const entry = generateEntryValues({ year: "2018" });
		const template = parseEntryKeyTemplate("[year]");
		expect(generateKey(entry, template)).toBe("2018");
	});

	it("can output specified fields", () => {
		const entry = generateEntryValues({ publisher: "Hello" });
		const template = parseEntryKeyTemplate("[PUBLISHER]");
		expect(generateKey(entry, template)).toBe("Hello");
	});

	it("can comprise multiple parts", () => {
		const entry = generateEntryValues({ author: "Bar", year: "2018" });
		const template = parseEntryKeyTemplate("[auth:upper][year]");
		expect(generateKey(entry, template)).toBe("BAR2018");
	});
});
