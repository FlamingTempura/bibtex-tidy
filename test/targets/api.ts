import type { Options } from '../../src/optionUtils';
import { tidy as tidyImport, type BibTeXTidyResult } from '../../src/index';

// require the actual build. Using import would cause it to bundled into the
// test and we won't be testing the actual build.
const tidy =
	process.env.NODE_ENV === 'coverage'
		? tidyImport
		: require('../../bibtex-tidy.js').tidy;

export type APIResult = BibTeXTidyResult;

export function testAPI(bibtex: string, options?: Options): APIResult {
	return tidy(bibtex, options);
}
