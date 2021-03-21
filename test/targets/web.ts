import {
	applyOptionDefaults,
	Options,
	OptionsSanitized,
} from '../../src/options.js';
import { BibTeXTidyResult, Warning } from '../../src/index.js';
import puppeteer, { JSONObject } from 'puppeteer';
import { join } from 'path';

const WEB_ROOT = join(__dirname, '..', '..', '..', 'docs', 'index.html');

declare global {
	interface Window {
		cmEditor: any;
		onEditorChange: any;
	}
}

export type WebResult = {
	bibtex: string;
	warnings: Warning[];
};

export async function testWeb(
	bibtexs: string[],
	options: Options = {}
): Promise<WebResult> {
	if (bibtexs.length > 1) throw new Error('Web only supports one input bibtex');

	const input = bibtexs[0];

	const browser = await puppeteer.launch();

	const page = await browser.newPage();
	await page.goto(`file://${WEB_ROOT}`);

	const result = await new Promise<BibTeXTidyResult>((resolve) => {
		page.exposeFunction('onEditorChange', resolve);

		page.evaluate(
			(input: string, options: OptionsSanitized) => {
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
				getOpt('lowercase').checked = !!options.lowercase;

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
					document.querySelector<HTMLInputElement>(
						'[value=spaces]'
					)!.checked = true;
					getOpt('spaces').value = String(options.space);
				}
				if (options.tab) {
					document.querySelector<HTMLInputElement>(
						'[value=tabs]'
					)!.checked = true;
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
					getOpt('enclosingBracesList').value = options.enclosingBraces.join(
						' '
					);
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

				const onchange = () => {
					window.cmEditor.off('change', onchange);
					// wait for feedback to be written
					window.requestAnimationFrame(() => {
						window.onEditorChange({
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
			},
			input,
			applyOptionDefaults(options) as JSONObject
		);
	});

	browser.close();

	return result;
}
