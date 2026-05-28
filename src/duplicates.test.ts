import { ASTProxy } from "./ASTProxy.ts";
import { checkForDuplicates } from "./duplicates.ts";
import { parseBibTeX } from "./parsers/bibtexParser.ts";

describe("checkForDuplicates", () => {
	it("should flag similar citations", () => {
		const ast = parseBibTeX(
			[
				'@article{a, author={Smith, James}, title="  something blah BLAH."}',
				"@article{b, author={Smith, JA},title={Something blah blah}}",
			].join(""),
		);
		const result = checkForDuplicates(new ASTProxy(ast), ["citation"]);
		expect(result.warnings.length).toBe(1);
	});
});
