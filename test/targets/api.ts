import { Options } from '../../src/options';
import { BibTeXTidyResult } from '../../src/index';

// require the actual build. Using import would cause it to bundled into the
// test and we won't be testing the actual build.
const bibtexTidy = require('../../bibtex-tidy.js');

export type APIResult = BibTeXTidyResult;

export function testAPI(bibtexs: string[], options: Options = {}): APIResult {
	if (bibtexs.length > 1) throw new Error('API only supports one input bibtex');
	return bibtexTidy.tidy(bibtexs[0], options);
}
