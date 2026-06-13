import { type Browser, chromium, type Page } from "playwright";
import { normalizeOptions, type Options } from "../../src/optionUtils.ts";
import { loadSpecFiles } from "../support/spec-loader.ts";
import { WEB_URL } from "../support/ui.ts";

type WebResult = {
	bibtex: string;
};

async function setCheckbox(
	page: Page,
	name: string,
	checked: boolean,
): Promise<void> {
	const input = page.locator(`input[name="${name}"]`);
	await input.waitFor({ state: "attached" });
	await input.evaluate((element, checked) => {
		const input = element as HTMLInputElement;
		if (input.checked !== checked) input.click();
	}, checked);
}

async function setRadio(page: Page, value: string): Promise<void> {
	await page
		.locator(`input[type="radio"][value="${value}"]`)
		.evaluate((element) => (element as HTMLInputElement).click());
}

async function setValue(
	page: Page,
	name: string,
	value: string,
): Promise<void> {
	await page.locator(`[name="${name}"]`).fill(value, { force: true });
}

async function setEditorValue(page: Page, input: string): Promise<void> {
	await page.evaluate((value) => {
		window.cmEditor.dispatch({
			changes: {
				from: 0,
				to: window.cmEditor.state.doc.length,
				insert: value,
			},
		});
	}, input);
}

async function testWeb(page: Page, input: string, options_: Options = {}) {
	const options = normalizeOptions(options_);

	await page.goto(WEB_URL);
	await setEditorValue(page, input);

	await setCheckbox(page, "curly", !!options.curly);
	await setCheckbox(page, "numeric", !!options.numeric);
	await setCheckbox(page, "months", !!options.months);
	await setCheckbox(
		page,
		"stripEnclosingBraces",
		!!options.stripEnclosingBraces,
	);
	await setCheckbox(page, "dropAllCaps", !!options.dropAllCaps);
	await setCheckbox(
		page,
		"transformSpecialCharacters",
		!!options.escape || !!options.unescape,
	);
	if (options.unescape) {
		await setRadio(page, "unescape");
	} else if (options.escape) {
		await setRadio(page, options.escape === true ? "legacyEscape" : "escape");
	}
	await setCheckbox(page, "stripComments", !!options.stripComments);
	await setCheckbox(page, "encodeUrls", !!options.encodeUrls);
	await setCheckbox(page, "tidyComments", !!options.tidyComments);
	await setCheckbox(page, "trailingCommas", !!options.trailingCommas);
	await setCheckbox(page, "removeEmptyFields", !!options.removeEmptyFields);
	await setCheckbox(
		page,
		"removeDuplicateFields",
		!!options.removeDuplicateFields,
	);
	await setCheckbox(page, "lowercase", !!options.lowercase);
	await setCheckbox(page, "blankLines", !!options.blankLines);

	if (options.space) {
		await setRadio(page, "spaces");
		await setValue(page, "spaces", String(options.space));
	}
	if (options.tab) {
		await setRadio(page, "tabs");
	}

	if (options.generateKeys) {
		await setCheckbox(page, "generateKeys", true);
		await setValue(page, "generateKeysTemplate", options.generateKeys);
	} else {
		await setCheckbox(page, "generateKeys", false);
	}

	if (typeof options.align === "number") {
		await setCheckbox(page, "align", true);
		await setValue(page, "alignnum", String(options.align));
	} else {
		await setCheckbox(page, "align", false);
	}

	if (options.omit && options.omit.length > 0) {
		await setCheckbox(page, "omit", true);
		await setValue(page, "omitList", options.omit.join(" "));
	} else {
		await setCheckbox(page, "omit", false);
	}
	if (options.sort) {
		await setCheckbox(page, "sort", true);
		await setValue(page, "sortList", options.sort.join(" "));
	} else {
		await setCheckbox(page, "sort", false);
	}
	if (options.duplicates) {
		await setCheckbox(page, "duplicates", true);
		await setCheckbox(page, "uniqKEY", options.duplicates.includes("key"));
		await setCheckbox(page, "uniqDOI", options.duplicates.includes("doi"));
		await setCheckbox(page, "uniqCIT", options.duplicates.includes("citation"));
		await setCheckbox(page, "uniqABS", options.duplicates.includes("abstract"));
	} else {
		await setCheckbox(page, "duplicates", false);
	}
	if (options.merge) {
		await setCheckbox(page, "merge", true);
		await setRadio(page, options.merge);
	} else {
		await setCheckbox(page, "merge", false);
	}

	if (options.sortFields) {
		await setCheckbox(page, "sortFields", true);
		await setValue(page, "sortFieldList", options.sortFields.join(" "));
	} else {
		await setCheckbox(page, "sortFields", false);
	}

	if (options.enclosingBraces) {
		await setCheckbox(page, "enclosingBraces", true);
		await setValue(
			page,
			"enclosingBracesList",
			options.enclosingBraces.join(" "),
		);
	} else {
		await setCheckbox(page, "enclosingBraces", false);
	}

	if (options.removeBraces) {
		await setCheckbox(page, "removeBraces", true);
		await setValue(page, "removeBracesList", options.removeBraces.join(" "));
	} else {
		await setCheckbox(page, "removeBraces", false);
	}

	if (options.maxAuthors) {
		await setCheckbox(page, "maxAuthors", true);
		await setValue(page, "maxAuthorsNum", String(options.maxAuthors));
	}

	if (options.wrap) {
		await setCheckbox(page, "wrap", true);
		await setValue(page, "wrapnum", String(options.wrap));
	}

	await page.getByRole("button", { name: "Tidy" }).click();
	await page.locator("[role=alert]").waitFor();

	const bibtex = await page.evaluate(() =>
		window.cmEditor.state.doc.toString(),
	);
	return { bibtex } satisfies WebResult;
}

const specFiles = await loadSpecFiles();

describe("UI E2E specs", () => {
	let browser: Browser | undefined;

	beforeAll(async () => {
		browser = await chromium.launch();
	});

	afterAll(async () => {
		await browser?.close();
	});

	for (const { filename, specs } of specFiles) {
		for (const [index, spec] of specs.entries()) {
			test(`${filename} document ${index + 1}: ${spec.title}`, async () => {
				if (!browser) throw new Error("Browser was not started");
				const page = await browser.newPage();
				try {
					const result = await testWeb(page, spec.input, spec.options);
					if (spec.expected) {
						expect(result.bibtex).toBe(spec.expected);
					}
				} finally {
					await page.close();
				}
			});
		}
	}
});
