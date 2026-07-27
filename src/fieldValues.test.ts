import { renderFieldValue } from "./fieldValues.ts";
import { isNodeType, parseBibTeX } from "./parsers/bibtexParser.ts";

describe("renderFieldValue", () => {
	it("renders the current field value without caching", () => {
		const field = parseBibTeX("@article{key, month = jan}")
			.children.filter((node) => isNodeType(node, "block"))
			.map((node) => node.block)
			.filter((node) => isNodeType(node, "entry"))[0]?.fields[0];
		const literal = field?.value.values[0];

		if (!field || !isNodeType(literal, "literal")) {
			throw new Error("Expected a literal field value");
		}

		expect(renderFieldValue(field)).toBe("jan");
		literal.value = "feb";
		expect(renderFieldValue(field)).toBe("feb");
	});

	it("renders parsed LaTeX values and concatenations directly", () => {
		const field = parseBibTeX(
			'@article{key, title = {Hello} # "W\\\\textbf{or}ld"}',
		)
			.children.filter((node) => isNodeType(node, "block"))
			.map((node) => node.block)
			.filter((node) => isNodeType(node, "entry"))[0]?.fields[0];

		if (!field) throw new Error("Expected a field");
		expect(renderFieldValue(field)).toBe("Hello # World");
	});
});
