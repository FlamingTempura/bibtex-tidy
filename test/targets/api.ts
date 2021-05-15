import { Options } from '../../src/optionUtils';
import { tidy as tidyImport, BibTeXTidyResult } from '../../src/index';

// require the actual build. Using import would cause it to bundled into the
// test and we won't be testing the actual build.
const tidy =
	process.env.NODE_ENV === 'coverage'
		? tidyImport
		: require('../../bibtex-tidy.js').tidy;

export type APIResult = BibTeXTidyResult;

export function testAPI(bibtexs: string[], options?: Options): APIResult {
	if (bibtexs.length > 1) throw new Error('API only supports one input bibtex');
	return tidy(bibtexs[0], options);
}
