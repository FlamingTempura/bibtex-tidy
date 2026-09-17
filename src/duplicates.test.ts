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

	it("should not flag distinct DOIs when they differ after an escaped underscore", () => {
		const ast = parseBibTeX(
			[
				'@inproceedings{10.1007/978-3-031-38100-3_13, doi="10.1007/978-3-031-38100-3\\_13"}',
				'@inproceedings{10.1007/978-3-031-38100-3_2, doi="10.1007/978-3-031-38100-3\\_2"}',
			].join(""),
		);
		const result = checkForDuplicates(new ASTProxy(ast), ["doi"]);
		expect(result.warnings).toHaveLength(0);
	});
});
