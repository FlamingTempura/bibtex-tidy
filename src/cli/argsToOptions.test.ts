import { argsToOptions } from "./argsToOptions.ts";

describe("argsToOptions", () => {
	it("parses CLI arguments to bibtex options", () => {
		expect(
			argsToOptions([
				"foo.bib",
				"something.txt",
				"--no-wrap",
				"--space",
				"3",
				"foo",
				"--align=10,11",
			]),
		).toEqual({
			inputFiles: ["foo.bib", "something.txt"],
			options: { wrap: false, space: 3, align: 10 },
			unknownArgs: [],
		});

		expect(
			argsToOptions([
				"--no-wrap",
				"--space",
				"3",
				"foo",
				"--moo",
				"--align=10,11",
				"foo.bib",
				"something.txt",
			]),
		).toEqual({
			inputFiles: ["foo.bib", "something.txt"],
			options: { wrap: false, space: 3, align: 10 },
			unknownArgs: ["--moo"],
		});

		expect(argsToOptions(["/some/path/to/a/file", "-mo", "foo"])).toEqual({
			inputFiles: ["/some/path/to/a/file"],
			options: { outputPath: "foo", modify: true },
			unknownArgs: [],
		});

		expect(
			argsToOptions(["/some/path/to/a/file", "-m", "--output", "foo"]),
		).toEqual({
			inputFiles: ["/some/path/to/a/file"],
			options: { outputPath: "foo", modify: true },
			unknownArgs: [],
		});

		expect(argsToOptions(["-"])).toEqual({
			inputFiles: ["-"],
			options: {},
			unknownArgs: [],
		});

		expect(argsToOptions(["--no-align"])).toEqual({
			inputFiles: [],
			options: { align: false },
			unknownArgs: [],
		});
	});
});
