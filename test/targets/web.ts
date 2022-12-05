import { normalizeOptions, type Options } from '../../src/optionUtils';
import type { Warning } from '../../src/index';
import puppeteer from 'puppeteer';
import { join } from 'path';

const WEB_ROOT = join(__dirname, '..', '..', 'docs', 'index.html');

declare global {
	interface Window {
		cmEditor: any;
	}
}

export type WebResult = {
	bibtex: string;
	warnings: Warning[];
};

let page: puppeteer.Page | undefined;
async function getPage(): Promise<puppeteer.Page> {
	if (page) return page;
	const browser = await puppeteer.launch();
	page = await browser.newPage();
	await page.goto(`file://${WEB_ROOT}`);
	return page;
}

export async function teardown() {
	return page?.browser().close();
}

export async function testWeb(
	input: string,
	options_: Options = {}
): Promise<WebResult> {
	const options = normalizeOptions(options_);
	const page = await getPage();

	async function setCheckbox(name: string, checked: boolean): Promise<void> {
		(await page.waitForSelector(`input[name=${name}]`, {
			timeout: 100,
		}))!.evaluate((el_, checked) => {
			const el = el_ as HTMLInputElement;
			if (el.checked !== checked) el.click();
		}, checked);
	}

	async function setRadio(value: string): Promise<void> {
		(await page.waitForSelector(`input[value=${value}]`, {
			timeout: 100,
		}))!.evaluate((el) => (el as HTMLInputElement).click());
	}

	async function setValue(name: string, value: string): Promise<void> {
		await (await page.waitForSelector(`[name=${name}]`, {
			timeout: 100,
		}))!.focus();

		await page.keyboard.down('ControlLeft');
		await page.keyboard.press('KeyA');
		await page.keyboard.up('ControlLeft');
		await page.keyboard.type(value);
	}

	await page.evaluate(
		(value) =>
			//@ts-ignore
			window.cmEditor.setValue(value),
		input
	);

	await setCheckbox('curly', !!options.curly);
	await setCheckbox('numeric', !!options.numeric);
	await setCheckbox('stripEnclosingBraces', !!options.stripEnclosingBraces);
	await setCheckbox('dropAllCaps', !!options.dropAllCaps);
	await setCheckbox('escape', !!options.escape);
	await setCheckbox('stripComments', !!options.stripComments);
	await setCheckbox('encodeUrls', !!options.encodeUrls);
	await setCheckbox('tidyComments', !!options.tidyComments);
	await setCheckbox('trailingCommas', !!options.trailingCommas);
	await setCheckbox('removeEmptyFields', !!options.removeEmptyFields);
	await setCheckbox('removeDuplicateFields', !!options.removeDuplicateFields);
	await setCheckbox('lowercase', !!options.lowercase);
	await setCheckbox('blankLines', options.blankLines ?? false);

	if (options.space) {
		await setRadio('spaces');
		await setValue('spaces', String(options.space));
	}
	if (options.tab) {
		await setRadio('tabs');
	}

	if (options.generateKeys) {
		await setCheckbox('generateKeys', true);
		await setValue('generateKeysTemplate', options.generateKeys);
	} else {
		await setCheckbox('generateKeys', false);
	}

	if (typeof options.align === 'number') {
		await setCheckbox('align', true);
		await setValue('alignnum', String(options.align));
	} else {
		await setCheckbox('align', false);
	}

	if (options.omit && options.omit.length > 0) {
		await setCheckbox('omit', true);
		await setValue('omitList', options.omit.join(' '));
	} else {
		await setCheckbox('omit', false);
	}
	if (options.sort) {
		await setCheckbox('sort', true);
		await setValue('sortList', options.sort.join(' '));
	} else {
		await setCheckbox('sort', false);
	}
	if (options.duplicates) {
		await setCheckbox('duplicates', true);
		await setCheckbox('uniqKEY', options.duplicates.includes('key'));
		await setCheckbox('uniqDOI', options.duplicates.includes('doi'));
		await setCheckbox('uniqCIT', options.duplicates.includes('citation'));
		await setCheckbox('uniqABS', options.duplicates.includes('abstract'));
	} else {
		await setCheckbox('duplicates', false);
	}
	if (options.merge) {
		await setCheckbox('merge', true);
		await setRadio(options.merge);
	} else {
		await setCheckbox('merge', false);
	}

	if (options.sortFields) {
		await setCheckbox('sortFields', true);
		await setValue('sortFieldList', options.sortFields.join(' '));
	} else {
		await setCheckbox('sortFields', false);
	}

	if (options.enclosingBraces) {
		await setCheckbox('enclosingBraces', true);
		await setValue('enclosingBracesList', options.enclosingBraces.join(' '));
	} else {
		await setCheckbox('enclosingBraces', false);
	}

	if (options.removeBraces) {
		await setCheckbox('removeBraces', true);
		await setValue('removeBracesList', options.removeBraces.join(' '));
	} else {
		await setCheckbox('removeBraces', false);
	}

	if (options.maxAuthors) {
		await setCheckbox('maxAuthors', true);
		await setValue('maxAuthorsNum', String(options.maxAuthors));
	}

	if (options.wrap) {
		await setCheckbox('wrap', true);
		await setValue('wrapnum', String(options.wrap));
	}

	((await page.waitForXPath(
		'//button[contains(text(),"Tidy")]'
	)) as any as HTMLElement)!.click();

	await new Promise((r) => setTimeout(r, 50));

	await page.waitForSelector('[data-test-feedback]', { timeout: 3000 });

	const bibtex = await page.evaluate(() =>
		//@ts-ignore
		window.cmEditor.getValue()
	);

	const warnings = (await page.evaluate(() =>
		[...document.querySelectorAll('[data-test-feedback] li')].map((li) => ({
			code: li.textContent?.includes('duplicate') ? 'DUPLICATE_ENTRY' : '',
		}))
	)) as Warning[];

	return { bibtex, warnings };
}
