import type { BibTeXTidyResult, tidy } from '../../src';
import type { Options } from '../../src/optionUtils';

declare global {
	function bibtexTidy(
		bibtex: string,
		option?: Options
	): Promise<BibTeXTidyResult>;
}
