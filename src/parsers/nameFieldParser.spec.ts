import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";
import { parseName, parseNameList } from "./nameFieldParser";

describe("parseName", () => {
	it('should parse authors of form "LastName"', () => {
		deepStrictEqual(parseName("Jones"), {
			first: "",
			pre: "",
			suf: "",
			last: "Jones",
		});
	});

	it('should parse authors of form "FirstName LastName"', () => {
		deepStrictEqual(parseName("John Jones"), {
			first: "John",
			last: "Jones",
			pre: "",
			suf: "",
		});
	});

	it('should parse authors of form "FirstName LastNames"', () => {
		deepStrictEqual(parseName("John Rees Jones"), {
			first: "John",
			last: "Rees Jones",
			pre: "",
			suf: "",
		});
	});

	it('should parse authors of form "FirstNames Prefixes LastNames"', () => {
		deepStrictEqual(parseName("John Paul von der Rees Jones"), {
			first: "John Paul",
			pre: "von der",
			last: "Rees Jones",
			suf: "",
		});
	});

	it('should parse authors of form "FirstNames Prefixes LastNames"', () => {
		deepStrictEqual(parseName("John Paul von der Rees Jones"), {
			first: "John Paul",
			pre: "von der",
			last: "Rees Jones",
			suf: "",
		});
	});

	it('should parse authors of form "LastNames, FirstNames Prefixes"', () => {
		deepStrictEqual(parseName("Rees Jones, John Paul von der"), {
			first: "John Paul",
			pre: "von der",
			last: "Rees Jones",
			suf: "",
		});
	});

	it('should parse authors of form "LastNames, Suffixes, FirstNames Prefixes"', () => {
		deepStrictEqual(parseName("Rees Jones, Sr. II, John Paul von der"), {
			first: "John Paul",
			pre: "von der",
			last: "Rees Jones",
			suf: "Sr. II",
		});
	});

	it('should parse authors of form "others"', () => {
		deepStrictEqual(parseName("others"), {
			last: "others",
			first: "",
			pre: "",
			suf: "",
		});
	});

	it("should parse authors which use initials", () => {
		deepStrictEqual(parseName("Tolkien, J. J. R."), {
			first: "J. J. R.",
			last: "Tolkien",
			pre: "",
			suf: "",
		});
	});

	it("should parse names with special characters", () => {
		deepStrictEqual(parseName('{"O}fele, Jane'), {
			first: "Jane",
			last: '{"O}fele',
			pre: "",
			suf: "",
		});
	});

	it("should parse names that start with non-alpha", () => {
		deepStrictEqual(parseName('~[]()={"O}fele, Jane'), {
			first: "Jane",
			last: '~[]()={"O}fele',
			pre: "",
			suf: "",
		});
	});

	it("should trim whitespace", () => {
		deepStrictEqual(parseName(" Foo Bar , Moo Hoo "), {
			last: "Foo Bar",
			first: "Moo Hoo",
			pre: "",
			suf: "",
		});
	});
});

describe("parseNameList", () => {
	it("should pass a single name", () => {
		deepStrictEqual(parseNameList("Angenendt, Arnold"), [
			{ first: "Arnold", last: "Angenendt", pre: "", suf: "" },
		]);
	});

	it("should pass multiple names", () => {
		deepStrictEqual(parseNameList("Feinberg, Andrew P and Vogelstein, Bert"), [
			{ first: "Andrew P", last: "Feinberg", pre: "", suf: "" },
			{ first: "Bert", last: "Vogelstein", pre: "", suf: "" },
		]);
	});

	it("should pass 'and others'", () => {
		deepStrictEqual(parseNameList("Jones, John Paul and others"), [
			{ first: "John Paul", last: "Jones", pre: "", suf: "" },
			{ first: "", last: "others", pre: "", suf: "" },
		]);
	});

	it("should split with uppercase AND", () => {
		deepStrictEqual(parseNameList("Jones, John Paul AND others"), [
			{ first: "John Paul", last: "Jones", pre: "", suf: "" },
			{ first: "", last: "others", pre: "", suf: "" },
		]);
	});
});
