import { equal } from "node:assert";
import { describe, it } from "node:test";
import { getEntries } from ".";
import { Cache } from "./cache";
import { checkForDuplicates } from "./duplicates";
import { parseBibTeX } from "./parsers/bibtexParser";

describe("checkForDuplicates", () => {
	it("should flag similar citations", () => {
		const entries = getEntries(
			parseBibTeX(
				[
					'@article{a, author={Smith, James}, title="  something blah BLAH."}',
					"@article{b, author={Smith, JA},title={Something blah blah}}",
				].join(""),
			),
		);
		const result = checkForDuplicates(entries, new Cache(), ["citation"]);
		equal(result.warnings.length, 1);
	});
});
