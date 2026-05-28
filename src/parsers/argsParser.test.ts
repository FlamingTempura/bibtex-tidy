import { parseCLIArguments, parseLongCLIOption } from "./argsParser.ts";

describe("parseCLIArguments", () => {
	it("parses 0 arguments", () => {
		expect(parseCLIArguments([])).toEqual({ "": [] });
	});

	it("parses input paths", () => {
		expect(parseCLIArguments(["foo.bib", "something.txt"])).toEqual({
			"": ["foo.bib", "something.txt"],
		});
	});

	it("parses options", () => {
		expect(parseCLIArguments(["--arg", "-a"])).toEqual({
			"": [],
			"--arg": [],
			"-a": [],
		});
	});

	it("parses options with values", () => {
		expect(parseCLIArguments(["--arg", "foo", "bar", "-a"])).toEqual({
			"": [],
			"--arg": ["foo", "bar"],
			"-a": [],
		});
	});

	it("parses inputs paths and options", () => {
		expect(parseCLIArguments(["moo.bib", "--arg", "foo", "bar", "-a"])).toEqual(
			{
				"": ["moo.bib"],
				"--arg": ["foo", "bar"],
				"-a": [],
			},
		);
	});

	it("parses trailing inputs paths", () => {
		expect(parseCLIArguments(["--arg", "foo", "bar", "-a", "moo.bib"])).toEqual(
			{
				"": ["moo.bib"],
				"--arg": ["foo", "bar"],
				"-a": [],
			},
		);
	});

	it("does not parse trailing inputs paths if disabled", () => {
		expect(
			parseCLIArguments(["--arg", "foo", "bar", "-a", "moo.bib"], true),
		).toEqual({
			"": [],
			"--arg": ["foo", "bar"],
			"-a": ["moo.bib"],
		});
	});

	it("does not parse negated value as option", () => {
		expect(parseCLIArguments(["moo.bib", "--sort", "-foo"])).toEqual({
			"": ["moo.bib"],
			"--sort": ["-foo"],
		});
	});

	it("parses short args", () => {
		expect(parseCLIArguments(["moo.bib", "-mo"])).toEqual({
			"": ["moo.bib"],
			"-m": [],
			"-o": [],
		});
	});

	it("parses short args with values", () => {
		expect(parseCLIArguments(["moo.bib", "-mo", "foo"])).toEqual({
			"": ["moo.bib"],
			"-m": [],
			"-o": ["foo"],
		});
	});
});

describe("parseCLIOption", () => {
	it("parses option without value", () => {
		expect(parseLongCLIOption("-f")).toEqual({
			key: "-f",
			values: [],
		});
		expect(parseLongCLIOption("--foo")).toEqual({
			key: "--foo",
			values: [],
		});
	});

	it("parses option with a value", () => {
		expect(parseLongCLIOption("--foo=bar")).toEqual({
			key: "--foo",
			values: ["bar"],
		});
	});

	it("parses option with multiple values", () => {
		expect(parseLongCLIOption("--foo=bar,moo")).toEqual({
			key: "--foo",
			values: ["bar", "moo"],
		});
	});

	it("parses option with quoted values", () => {
		expect(parseLongCLIOption("--foo=\"bar\",'moo'")).toEqual({
			key: "--foo",
			values: ["bar", "moo"],
		});
	});

	it("parses option with values including spaces", () => {
		expect(parseLongCLIOption('--foo="bar moo"')).toEqual({
			key: "--foo",
			values: ["bar moo"],
		});
	});
});
