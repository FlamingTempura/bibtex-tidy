import { equal } from "node:assert";
import { describe, it } from "node:test";
import { checkForDuplicates } from "./duplicates";
import { normalizeOptions } from "./optionUtils";
import { generateAST } from "./parsers/bibtexParser";
import { generateValueLookup } from "./tidy";

describe("checkForDuplicates", () => {
	it("should flag similar citations", () => {
		const ast = generateAST(
			[
				'@article{a, author={Smith, James}, title="  something blah BLAH."}',
				"@article{b, author={Smith, JA},title={Something blah blah}}",
			].join(""),
		);
		const values = generateValueLookup(ast, normalizeOptions({}));
		const result = checkForDuplicates(ast, values, ["citation"]);
		equal(result.warnings.length, 1);
	});
});
