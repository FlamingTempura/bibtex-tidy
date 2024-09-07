import { deepStrictEqual } from "node:assert";

import { describe, it } from "node:test";
import { parseCLIArguments, parseLongCLIOption } from "./argsParser";

describe("parseCLIArguments", () => {
	it("parses 0 arguments", () => {
		deepStrictEqual(parseCLIArguments([]), { "": [] });
	});

	it("parses input paths", () => {
		deepStrictEqual(parseCLIArguments(["foo.bib", "something.txt"]), {
			"": ["foo.bib", "something.txt"],
		});
	});

	it("parses options", () => {
		deepStrictEqual(parseCLIArguments(["--arg", "-a"]), {
			"": [],
			"--arg": [],
			"-a": [],
		});
	});

	it("parses options with values", () => {
		deepStrictEqual(parseCLIArguments(["--arg", "foo", "bar", "-a"]), {
			"": [],
			"--arg": ["foo", "bar"],
			"-a": [],
		});
	});

	it("parses inputs paths and options", () => {
		deepStrictEqual(
			parseCLIArguments(["moo.bib", "--arg", "foo", "bar", "-a"]),
			{
				"": ["moo.bib"],
				"--arg": ["foo", "bar"],
				"-a": [],
			},
		);
	});

	it("parses trailing inputs paths", () => {
		deepStrictEqual(
			parseCLIArguments(["--arg", "foo", "bar", "-a", "moo.bib"]),
			{
				"": ["moo.bib"],
				"--arg": ["foo", "bar"],
				"-a": [],
			},
		);
	});

	it("does not parse trailing inputs paths if disabled", () => {
		deepStrictEqual(
			parseCLIArguments(["--arg", "foo", "bar", "-a", "moo.bib"], true),
			{
				"": [],
				"--arg": ["foo", "bar"],
				"-a": ["moo.bib"],
			},
		);
	});

	it("does not parse negated value as option", () => {
		deepStrictEqual(parseCLIArguments(["moo.bib", "--sort", "-foo"]), {
			"": ["moo.bib"],
			"--sort": ["-foo"],
		});
	});

	it("parses short args", () => {
		deepStrictEqual(parseCLIArguments(["moo.bib", "-mo"]), {
			"": ["moo.bib"],
			"-m": [],
			"-o": [],
		});
	});

	it("parses short args with values", () => {
		deepStrictEqual(parseCLIArguments(["moo.bib", "-mo", "foo"]), {
			"": ["moo.bib"],
			"-m": [],
			"-o": ["foo"],
		});
	});
});

describe("parseCLIOption", () => {
	it("parses option without value", () => {
		deepStrictEqual(parseLongCLIOption("-f"), {
			key: "-f",
			values: [],
		});
		deepStrictEqual(parseLongCLIOption("--foo"), {
			key: "--foo",
			values: [],
		});
	});

	it("parses option with a value", () => {
		deepStrictEqual(parseLongCLIOption("--foo=bar"), {
			key: "--foo",
			values: ["bar"],
		});
	});

	it("parses option with multiple values", () => {
		deepStrictEqual(parseLongCLIOption("--foo=bar,moo"), {
			key: "--foo",
			values: ["bar", "moo"],
		});
	});

	it("parses option with quoted values", () => {
		deepStrictEqual(parseLongCLIOption("--foo=\"bar\",'moo'"), {
			key: "--foo",
			values: ["bar", "moo"],
		});
	});

	it("parses option with values including spaces", () => {
		deepStrictEqual(parseLongCLIOption('--foo="bar moo"'), {
			key: "--foo",
			values: ["bar moo"],
		});
	});
});
