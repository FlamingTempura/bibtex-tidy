import {
	normalizeOptions,
	Options,
	OptionsNormalized,
} from '../../src/optionUtils';
import { BibTeXTidyResult, Warning } from '../../src/index';
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
	options: Options = {}
): Promise<WebResult> {
	const page = await getPage();

	const result = await new Promise<BibTeXTidyResult>((resolve) => {
		const callbackName =
			'onEditorChange' + Math.floor(Math.random() * 1000000000);
		page.exposeFunction(callbackName, resolve);

		const evalCallback = (
			input: string,
			options: OptionsNormalized,
			fn: string
		) => {
			document.querySelector('textarea')!.value = input;
			//@ts-ignore
			window.cmEditor.setValue(input);

			const getOpt = (name: string) =>
				document.querySelector<HTMLInputElement>(`[name=${name}]`)!;

			getOpt('curly').checked = !!options.curly;
			getOpt('numeric').checked = !!options.numeric;
			getOpt('stripEnclosingBraces').checked = !!options.stripEnclosingBraces;
			getOpt('dropAllCaps').checked = !!options.dropAllCaps;
			getOpt('escape').checked = !!options.escape;
			getOpt('stripComments').checked = !!options.stripComments;
			getOpt('encodeUrls').checked = !!options.encodeUrls;
			getOpt('tidyComments').checked = !!options.tidyComments;
			getOpt('trailingCommas').checked = !!options.trailingCommas;
			getOpt('removeEmptyFields').checked = !!options.removeEmptyFields;
			getOpt('removeDuplicateFields').checked = !!options.removeDuplicateFields;
			getOpt('lowercase').checked = !!options.lowercase;
			getOpt('generateKeys').checked = !!options.generateKeys;

			if (typeof options.align === 'number') {
				getOpt('align').checked = true;
				getOpt('alignnum').value = String(options.align);
			} else {
				getOpt('align').checked = false;
			}
			if (options.omit) {
				getOpt('omit').checked = true;
				getOpt('omitList').value = options.omit.join(' ');
			} else {
				getOpt('omit').checked = false;
			}
			if (options.space) {
				document.querySelector<HTMLInputElement>('[value=spaces]')!.checked =
					true;
				getOpt('spaces').value = String(options.space);
			}
			if (options.tab) {
				document.querySelector<HTMLInputElement>('[value=tabs]')!.checked =
					true;
			}
			if (options.sort) {
				getOpt('sort').checked = true;
				getOpt('sortList').value = options.sort.join(' ');
			} else {
				getOpt('sort').checked = false;
				getOpt('sortList').value = '';
			}
			if (options.duplicates) {
				getOpt('duplicates').checked = true;
				getOpt('uniqKEY').checked = options.duplicates.includes('key');
				getOpt('uniqDOI').checked = options.duplicates.includes('doi');
				getOpt('uniqCIT').checked = options.duplicates.includes('citation');
				getOpt('uniqABS').checked = options.duplicates.includes('abstract');
			} else {
				getOpt('duplicates').checked = false;
			}
			if (options.merge) {
				getOpt('merge').checked = true;
				getOpt('mergeStrategy').value = options.merge;
			} else {
				getOpt('merge').checked = false;
			}

			if (options.sortFields) {
				getOpt('sortFields').checked = true;
				getOpt('sortFieldList').value = options.sortFields.join(' ');
			} else {
				getOpt('sortFields').checked = false;
				getOpt('sortFieldList').value = '';
			}

			if (options.enclosingBraces) {
				getOpt('enclosingBraces').checked = true;
				getOpt('enclosingBracesList').value = options.enclosingBraces.join(' ');
			} else {
				getOpt('enclosingBraces').checked = false;
				getOpt('enclosingBracesList').value = '';
			}

			if (options.maxAuthors) {
				getOpt('maxAuthors').checked = true;
				getOpt('maxAuthorsNum')!.value = String(options.maxAuthors);
			}

			if (options.wrap) {
				getOpt('wrap').checked = true;
				getOpt('wrapnum').value = String(options.wrap);
			}

			getOpt('blankLines').checked = options.blankLines ?? false;

			const onchange = () => {
				window.cmEditor.off('change', onchange);
				// wait for feedback to be written
				window.requestAnimationFrame(() => {
					//@ts-ignore
					window[fn]({
						bibtex: window.cmEditor.getValue(),
						warnings: [...document.querySelectorAll('#feedback li')].map(
							(li) => ({
								code: li.textContent?.includes('duplicate')
									? 'DUPLICATE_ENTRY'
									: '',
							})
						),
					});
				});
			};
			window.cmEditor.on('change', onchange);

			document.querySelector<HTMLButtonElement>('#tidy')!.click();
		};
		page.evaluate(evalCallback, input, normalizeOptions(options), callbackName);
	});

	return result;
}
