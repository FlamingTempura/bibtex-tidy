import { parseName, parseNameList } from "./nameFieldParser.ts";

describe("parseName", () => {
	it('should parse authors of form "LastName"', () => {
		expect(parseName("Jones")).toEqual({
			first: "",
			pre: "",
			suf: "",
			last: "Jones",
		});
	});

	it('should parse authors of form "FirstName LastName"', () => {
		expect(parseName("John Jones")).toEqual({
			first: "John",
			last: "Jones",
			pre: "",
			suf: "",
		});
	});

	it('should parse authors of form "FirstName LastNames"', () => {
		expect(parseName("John Rees Jones")).toEqual({
			first: "John",
			last: "Rees Jones",
			pre: "",
			suf: "",
		});
	});

	it('should parse authors of form "FirstNames Prefixes LastNames"', () => {
		expect(parseName("John Paul von der Rees Jones")).toEqual({
			first: "John Paul",
			pre: "von der",
			last: "Rees Jones",
			suf: "",
		});
	});

	it('should parse authors of form "FirstNames Prefixes LastNames"', () => {
		expect(parseName("John Paul von der Rees Jones")).toEqual({
			first: "John Paul",
			pre: "von der",
			last: "Rees Jones",
			suf: "",
		});
	});

	it('should parse authors of form "LastNames, FirstNames Prefixes"', () => {
		expect(parseName("Rees Jones, John Paul von der")).toEqual({
			first: "John Paul",
			pre: "von der",
			last: "Rees Jones",
			suf: "",
		});
	});

	it('should parse authors of form "LastNames, Suffixes, FirstNames Prefixes"', () => {
		expect(parseName("Rees Jones, Sr. II, John Paul von der")).toEqual({
			first: "John Paul",
			pre: "von der",
			last: "Rees Jones",
			suf: "Sr. II",
		});
	});

	it('should parse authors of form "others"', () => {
		expect(parseName("others")).toEqual({
			last: "others",
			first: "",
			pre: "",
			suf: "",
		});
	});

	it("should parse authors which use initials", () => {
		expect(parseName("Tolkien, J. J. R.")).toEqual({
			first: "J. J. R.",
			last: "Tolkien",
			pre: "",
			suf: "",
		});
	});

	it("should parse names with special characters", () => {
		expect(parseName('{"O}fele, Jane')).toEqual({
			first: "Jane",
			last: '{"O}fele',
			pre: "",
			suf: "",
		});
	});

	it("should parse names that start with non-alpha", () => {
		expect(parseName('~[]()={"O}fele, Jane')).toEqual({
			first: "Jane",
			last: '~[]()={"O}fele',
			pre: "",
			suf: "",
		});
	});

	it("should trim whitespace", () => {
		expect(parseName(" Foo Bar , Moo Hoo ")).toEqual({
			last: "Foo Bar",
			first: "Moo Hoo",
			pre: "",
			suf: "",
		});
	});
});

describe("parseNameList", () => {
	it("should pass a single name", () => {
		expect(parseNameList("Angenendt, Arnold")).toEqual([
			{ first: "Arnold", last: "Angenendt", pre: "", suf: "" },
		]);
	});

	it("should pass multiple names", () => {
		expect(parseNameList("Feinberg, Andrew P and Vogelstein, Bert")).toEqual([
			{ first: "Andrew P", last: "Feinberg", pre: "", suf: "" },
			{ first: "Bert", last: "Vogelstein", pre: "", suf: "" },
		]);
	});

	it("should pass 'and others'", () => {
		expect(parseNameList("Jones, John Paul and others")).toEqual([
			{ first: "John Paul", last: "Jones", pre: "", suf: "" },
			{ first: "", last: "others", pre: "", suf: "" },
		]);
	});

	it("should split with uppercase AND", () => {
		expect(parseNameList("Jones, John Paul AND others")).toEqual([
			{ first: "John Paul", last: "Jones", pre: "", suf: "" },
			{ first: "", last: "others", pre: "", suf: "" },
		]);
	});
});
