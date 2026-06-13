// @vitest-environment happy-dom

import { render, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom/vitest";
import { normalizeOptions, type OptionsNormalized } from "../optionUtils.ts";
import type { BibTeXTidyResult } from "../types.ts";
import FeedbackSuccess from "./FeedbackSuccess.svelte";

const baseOptions: OptionsNormalized = normalizeOptions({
	tab: true,
	align: 13,
	curly: true,
	numeric: true,
	escape: false,
	duplicates: ["key"],
	sortFields: true,
	removeDuplicateFields: false,
});

describe("FeedbackSuccess", () => {
	it("shows the entry count and no-duplicate message when no duplicates exist", () => {
		const result: BibTeXTidyResult = {
			bibtex: "",
			count: 2,
			warnings: [],
		};

		render(FeedbackSuccess, { options: baseOptions, result });

		expect(screen.getByText("Successful!")).toBeInTheDocument();
		expect(screen.getByText(/Tidied\s+2\s+entries\./)).toBeInTheDocument();
		expect(screen.getByText(/No\s+duplicates/)).toBeInTheDocument();
	});

	it("renders non-duplicate warnings separately and reports duplicates found", () => {
		const result: BibTeXTidyResult = {
			bibtex: "",
			count: 3,
			warnings: [
				{ code: "MISSING_KEY", message: "Entry missing citation key" },
				{
					code: "DUPLICATE_ENTRY",
					rule: "key",
					message: "Duplicate key detected for smith2020",
				},
			],
		};

		render(FeedbackSuccess, { options: baseOptions, result });

		expect(screen.getByText("Entry missing citation key")).toBeInTheDocument();
		expect(screen.getByText("1 duplicate found:")).toBeInTheDocument();
		expect(
			screen.getByText("Duplicate key detected for smith2020"),
		).toBeInTheDocument();
	});

	it("renders unsupported escape warnings", () => {
		const result: BibTeXTidyResult = {
			bibtex: "",
			count: 1,
			warnings: [
				{
					code: "UNSUPPORTED_ESCAPE",
					character: "↳",
					codepoint: "21b3",
					message:
						"Cannot escape character ↳ (U+21B3) in author without LaTeX packages or special fonts.",
				},
			],
		};

		render(FeedbackSuccess, { options: baseOptions, result });

		expect(
			screen.getByText(
				"Cannot escape character ↳ (U+21B3) in author without LaTeX packages or special fonts.",
			),
		).toBeInTheDocument();
	});

	it("uses merged wording when merge mode is enabled", () => {
		const result: BibTeXTidyResult = {
			bibtex: "",
			count: 3,
			warnings: [
				{
					code: "DUPLICATE_ENTRY",
					rule: "doi",
					message: "Duplicate DOI detected",
				},
				{
					code: "DUPLICATE_ENTRY",
					rule: "citation",
					message: "Duplicate citation detected",
				},
			],
		};

		render(FeedbackSuccess, {
			options: { ...baseOptions, merge: "combine" },
			result,
		});

		expect(screen.getByText("2 duplicates merged:")).toBeInTheDocument();
	});
});
