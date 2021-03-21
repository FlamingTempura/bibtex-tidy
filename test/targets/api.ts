// @ts-ignore
import bibtexTidy from '../../../bibtex-tidy.js';
import { Options } from '../../src/options.js';
import { BibTeXTidyResult } from '../../src/index.js';

export type APIResult = BibTeXTidyResult;

export function testAPI(bibtexs: string[], options: Options = {}): APIResult {
	if (bibtexs.length > 1) throw new Error('API only supports one input bibtex');
	return bibtexTidy.tidy(bibtexs[0], options);
}
