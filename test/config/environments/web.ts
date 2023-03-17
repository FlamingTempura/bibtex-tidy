import { join } from 'path';
import NodeEnvironment from 'jest-environment-node';
import puppeteer, { Page } from 'puppeteer';
import type { BibTeXTidyResult, Warning } from '../../../src/index';
import { normalizeOptions, type Options } from '../../../src/optionUtils';
import { cacheTidyResults } from './utils';

const WEB_ROOT = join(__dirname, '..', '..', '..', 'docs', 'index.html');

export default class BrowserEnvironment extends NodeEnvironment {
	async setup() {
		await super.setup();
		this.global.bibtexTidy = cacheTidyResults(tidyWeb, 'web', this.context);
	}

	async teardown() {
		await teardown();
		await super.teardown();
	}
}

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Window {
		cmEditor: any;
	}
}

export type WebResult = {
	bibtex: string;
	warnings: Warning[];
};

let page: Page | undefined;
async function getPage(): Promise<Page> {
	if (page) return page;
	const browser = await puppeteer.launch();
	page = await browser.newPage();
	await page.goto(`file://${WEB_ROOT}`);
	return page;
}

async function teardown() {
	return page?.browser().close();
}

async function tidyWeb(
	input: string,
	options_: Options = {}
): Promise<BibTeXTidyResult> {
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
			window.cmEditor.dispatch({
				changes: {
					from: 0,
					to: window.cmEditor.state.doc.length,
					insert: value,
				},
			}),
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
	await setCheckbox('blankLines', !!options.blankLines);

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
		window.cmEditor.state.doc.toString()
	);

	const warnings = (await page.evaluate(() =>
		[...document.querySelectorAll('[data-test-feedback] li')].map((li) => ({
			code: li.textContent?.includes('duplicate') ? 'DUPLICATE_ENTRY' : '',
		}))
	)) as Warning[];

	return { bibtex, warnings, count: -1 };
}
