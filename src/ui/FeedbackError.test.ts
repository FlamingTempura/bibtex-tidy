// @vitest-environment happy-dom

import { render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom/vitest";
import { BibTeXSyntaxError } from "../parsers/bibtexParser.ts";
import FeedbackError from "./FeedbackError.svelte";

describe("FeedbackError", () => {
	it("renders parser errors without throwing when no node property exists on the error", () => {
		const error = new BibTeXSyntaxError(
			"abc}",
			{ type: "concat" } as never,
			3,
			1,
			4,
		);

		expect(() => render(FeedbackError, { error })).not.toThrow();

		const alert = screen.getByText(
			"There's a problem with the bibtex",
		).parentElement;

		expect(alert).not.toBeNull();
		expect(alert).toHaveTextContent("There's a problem with the bibtex");
		expect(alert).toHaveTextContent("Syntax Error on line 1 column 4");
		expect(alert).toHaveTextContent('Unexpected "}".');
	});
});
