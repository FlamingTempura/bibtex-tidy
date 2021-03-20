import tap from 'tap';
import { CLIOptions } from '../src/options.js';
import { CLIResult, testCLI } from './targets/cli.js';
import { testAPI } from './targets/api.js';
import { BibTeXTidyResult } from '../src/index.js';

// Allows \ to be used and removes the empty line at the start
export function bibtex(str: TemplateStringsArray): string {
	return String.raw(str).slice(1);
}

type BibTeXTidyRunResult = {
	api?: BibTeXTidyResult;
	cli?: CLIResult;
	bibtex?: string;
};

export async function bibtexTidy(
	inputs: string | string[],
	options?: CLIOptions,
	targets: ('api' | 'cli')[] = ['api', 'cli']
): Promise<BibTeXTidyRunResult> {
	if (typeof inputs === 'string') inputs = [inputs];

	const result: BibTeXTidyRunResult = {};

	if (targets.includes('api')) {
		const apiResult = testAPI(inputs, options);
		const apiResult2 = testAPI([apiResult.bibtex], options);
		tap.same(apiResult.bibtex, apiResult2.bibtex, 'API result is unstable');
		result.api = apiResult;
	}

	if (targets.includes('cli')) {
		const cliResult = testCLI(inputs, options);
		const cliResult2 = testCLI(cliResult.bibtexs, options);
		tap.same(cliResult.bibtex, cliResult2.bibtex, 'CLI result is unstable');
		result.cli = cliResult;
	}

	result.bibtex = result.api?.bibtex ?? result.cli?.bibtex;

	return result;
}
