import { tidy } from "./tidy.ts";

describe("tidy", () => {
	it("uses the containing block type in missing-key warnings", () => {
		const result = tidy("@article{, title = {Missing key}}", {
			escape: false,
		});

		expect(result.warnings).toContainEqual({
			code: "MISSING_KEY",
			message: "article entry does not have a citation key.",
		});
	});

	it("can reuse escape templates for repeated characters", () => {
		const result = tidy("@misc{key, title = {éé}}", { escape: "new" });

		expect(result.bibtex).toContain("\\'{e}\\'{e}");
	});
});
