import { equal } from "node:assert";
import { describe, it } from "node:test";
import { ASTProxy } from "./ASTProxy";
import { checkForDuplicates } from "./duplicates";
import { parseBibTeX } from "./parsers/bibtexParser";

describe("checkForDuplicates", () => {
	it("should flag similar citations", () => {
		const ast = parseBibTeX(
			[
				'@article{a, author={Smith, James}, title="  something blah BLAH."}',
				"@article{b, author={Smith, JA},title={Something blah blah}}",
			].join(""),
		);
		const result = checkForDuplicates(new ASTProxy(ast), ["citation"]);
		equal(result.warnings.length, 1);
	});
});
