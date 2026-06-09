import { normalizeOptions, type OptionsNormalized } from "../optionUtils.ts";
import { getOptionsFromSearch } from "./urlOptions.ts";

describe("urlOptions", () => {
	const uiDefaults: OptionsNormalized = normalizeOptions({
		tab: true,
		align: 13,
		curly: true,
		numeric: true,
		escape: false,
		duplicates: ["key"],
		sortFields: true,
		removeDuplicateFields: false,
	});

	it("keeps UI defaults when URL options are partial", () => {
		const search = `?opt=${encodeURIComponent(JSON.stringify({ sort: true }))}`;

		expect(getOptionsFromSearch(search, uiDefaults)).toMatchObject({
			sort: ["key"],
			numeric: true,
			curly: true,
			tab: true,
			align: 13,
		});
	});

	it("allows explicit URL options to override UI defaults", () => {
		const search = `?opt=${encodeURIComponent(
			JSON.stringify({ numeric: false, tab: false, sort: false }),
		)}`;

		expect(getOptionsFromSearch(search, uiDefaults)).toMatchObject({
			numeric: false,
			tab: false,
			sort: undefined,
		});
	});

	it("returns undefined when no URL options are present", () => {
		expect(getOptionsFromSearch("", uiDefaults)).toBeUndefined();
	});
});
