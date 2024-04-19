import { tidy as tidyImport, type BibTeXTidyResult } from '../../src/index';
import type { Options } from '../../src/optionUtils';

// require the actual build. Using import would cause it to bundled into the
// test and we won't be testing the actual build.
const tidy =
	process.env.NODE_ENV === 'coverage'
		? tidyImport
		: // eslint-disable-next-line @typescript-eslint/no-var-requires
			require('../../bibtex-tidy.js').tidy;

export type APIResult = BibTeXTidyResult;

export function testAPI(bibtex: string, options?: Options): APIResult {
	return tidy(bibtex, options);
}
