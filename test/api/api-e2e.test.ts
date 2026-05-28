import { tidy } from "../../bibtex-tidy.js";
import { loadSpecFiles } from "../support/spec-loader.ts";

const specFiles = await loadSpecFiles();

describe("JS API E2E specs", () => {
	for (const { filename, specs } of specFiles) {
		for (const [index, spec] of specs.entries()) {
			test(`${filename} document ${index + 1}: ${spec.title}`, () => {
				const result = tidy(spec.input, spec.options);

				if (spec.expected) {
					expect(result.bibtex).toBe(spec.expected);
				}
				if (spec.warnings) {
					expect(result.warnings).toHaveLength(spec.warnings.length);
					for (const [index, warning] of spec.warnings.entries()) {
						expect(result.warnings[index]).toMatchObject(warning);
					}
				}
			});
		}
	}
});
