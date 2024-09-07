import { join } from "node:path";
import type { EditorView } from "@codemirror/view";
import puppeteer, { type ElementHandle, type Page } from "puppeteer";
import type { Warning } from "../../src/index";
import { type Options, normalizeOptions } from "../../src/optionUtils";

const WEB_ROOT = join(__dirname, "..", "..", "docs", "index.html");

declare global {
	interface Window {
		cmEditor: EditorView;
	}
}

export type WebResult = {
	bibtex: string;
	warnings: Warning[];
};

let page: Page | undefined;
async function getPage(): Promise<Page> {
	if (page) return page;
	const browser = await puppeteer.launch({ headless: true });
	page = await browser.newPage();
	await page.goto(`file://${WEB_ROOT}`);
	return page;
}

export async function teardown() {
	return page?.browser().close();
}

export async function testWeb(
	input: string,
	options_: Options = {},
): Promise<WebResult> {
	const options = normalizeOptions(options_);
	const page = await getPage();

	async function select(
		selector: string,
		timeout = 100,
	): Promise<ElementHandle<Element>> {
		const element = await page.waitForSelector(selector, { timeout });
		if (!element) throw new Error(`Could not find element ${selector}`);
		return element;
	}

	async function setCheckbox(name: string, checked: boolean): Promise<void> {
		(await select(`input[name=${name}]`)).evaluate((el_, checked) => {
			const el = el_ as HTMLInputElement;
			if (el.checked !== checked) el.click();
		}, checked);
	}

	async function setRadio(value: string): Promise<void> {
		await page.locator(`input[value=${value}]`).click();
	}

	async function setValue(name: string, value: string): Promise<void> {
		await page.locator(`[name=${name}]`).fill(value);
	}

	await page.evaluate(
		(value) =>
			window.cmEditor.dispatch({
				changes: {
					from: 0,
					to: window.cmEditor.state.doc.length,
					insert: value,
				},
			}),
		input,
	);

	await setCheckbox("curly", !!options.curly);
	await setCheckbox("numeric", !!options.numeric);
	await setCheckbox("months", !!options.months);
	await setCheckbox("stripEnclosingBraces", !!options.stripEnclosingBraces);
	await setCheckbox("dropAllCaps", !!options.dropAllCaps);
	await setCheckbox("escape", !!options.escape);
	await setCheckbox("stripComments", !!options.stripComments);
	await setCheckbox("encodeUrls", !!options.encodeUrls);
	await setCheckbox("tidyComments", !!options.tidyComments);
	await setCheckbox("trailingCommas", !!options.trailingCommas);
	await setCheckbox("removeEmptyFields", !!options.removeEmptyFields);
	await setCheckbox("removeDuplicateFields", !!options.removeDuplicateFields);
	await setCheckbox("lowercase", !!options.lowercase);
	await setCheckbox("blankLines", !!options.blankLines);

	if (options.space) {
		await setRadio("spaces");
		await setValue("spaces", String(options.space));
	}
	if (options.tab) {
		await setRadio("tabs");
	}

	if (options.generateKeys) {
		await setCheckbox("generateKeys", true);
		await setValue("generateKeysTemplate", options.generateKeys);
	} else {
		await setCheckbox("generateKeys", false);
	}

	if (typeof options.align === "number") {
		await setCheckbox("align", true);
		await setValue("alignnum", String(options.align));
	} else {
		await setCheckbox("align", false);
	}

	if (options.omit && options.omit.length > 0) {
		await setCheckbox("omit", true);
		await setValue("omitList", options.omit.join(" "));
	} else {
		await setCheckbox("omit", false);
	}
	if (options.sort) {
		await setCheckbox("sort", true);
		await setValue("sortList", options.sort.join(" "));
	} else {
		await setCheckbox("sort", false);
	}
	if (options.duplicates) {
		await setCheckbox("duplicates", true);
		await setCheckbox("uniqKEY", options.duplicates.includes("key"));
		await setCheckbox("uniqDOI", options.duplicates.includes("doi"));
		await setCheckbox("uniqCIT", options.duplicates.includes("citation"));
		await setCheckbox("uniqABS", options.duplicates.includes("abstract"));
	} else {
		await setCheckbox("duplicates", false);
	}
	if (options.merge) {
		await setCheckbox("merge", true);
		await setRadio(options.merge);
	} else {
		await setCheckbox("merge", false);
	}

	if (options.sortFields) {
		await setCheckbox("sortFields", true);
		await setValue("sortFieldList", options.sortFields.join(" "));
	} else {
		await setCheckbox("sortFields", false);
	}

	if (options.enclosingBraces) {
		await setCheckbox("enclosingBraces", true);
		await setValue("enclosingBracesList", options.enclosingBraces.join(" "));
	} else {
		await setCheckbox("enclosingBraces", false);
	}

	if (options.removeBraces) {
		await setCheckbox("removeBraces", true);
		await setValue("removeBracesList", options.removeBraces.join(" "));
	} else {
		await setCheckbox("removeBraces", false);
	}

	if (options.maxAuthors) {
		await setCheckbox("maxAuthors", true);
		await setValue("maxAuthorsNum", String(options.maxAuthors));
	}

	if (options.wrap) {
		await setCheckbox("wrap", true);
		await setValue("wrapnum", String(options.wrap));
	}

	await page.locator("button::-p-text(Tidy)").click();

	await select("[role=alert]", 3000);

	const bibtex = await page.evaluate(() =>
		window.cmEditor.state.doc.toString(),
	);

	const warnings = (await page.evaluate(() =>
		[...document.querySelectorAll("[role=alert] li")].map((li) => ({
			code: li.textContent?.includes("duplicate") ? "DUPLICATE_ENTRY" : "",
		})),
	)) as Warning[];

	return { bibtex, warnings };
}
