// @vitest-environment happy-dom

import { render } from "@testing-library/svelte";
import "@testing-library/jest-dom/vitest";
import type { OptionsNormalized } from "../optionUtils.ts";
import Cli from "./Cli.svelte";

describe("Cli", () => {
	const baseOptions: OptionsNormalized = {
		align: 14,
		space: 2,
		blankLines: false,
	};

	it("renders single key with no value", () => {
		const options: OptionsNormalized = { ...baseOptions, curly: true };

		render(Cli, { options });

		expect(document.querySelector("#cli")).toHaveTextContent(
			"bibtex-tidy --curly YOUR_FILE.bib",
		);
	});

	it("renders single key with value", () => {
		const options: OptionsNormalized = { ...baseOptions, align: 13 };

		render(Cli, { options });

		expect(document.querySelector("#cli")).toHaveTextContent(
			"bibtex-tidy --align=13 YOUR_FILE.bib",
		);
	});

	it("renders multiple arguments", () => {
		const options: OptionsNormalized = {
			...baseOptions,
			curly: true,
			align: 13,
			duplicates: ["key"],
			removeDuplicateFields: false,
		};

		render(Cli, { options });

		expect(document.querySelector("#cli")).toHaveTextContent(
			"bibtex-tidy --curly --align=13 --duplicates=key --no-remove-dupe-fields YOUR_FILE.bib",
		);
	});
});
