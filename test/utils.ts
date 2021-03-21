import tap from 'tap';
import { CLIOptions } from '../src/options.js';
import { CLIResult, testCLI } from './targets/cli.js';
import { APIResult, testAPI } from './targets/api.js';
import { testWeb, WebResult } from './targets/web.js';

// Allows \ to be used and removes the empty line at the start
export function bibtex(str: TemplateStringsArray): string {
	return String.raw(str).slice(1);
}

type BibTeXTidyRunResult = {
	api?: APIResult;
	cli?: CLIResult;
	web?: WebResult;
	bibtex?: string;
};

export async function bibtexTidy(
	inputs: string | string[],
	options?: CLIOptions,
	targets: ('api' | 'cli' | 'web')[] = ['api', 'cli', 'web']
): Promise<BibTeXTidyRunResult> {
	if (typeof inputs === 'string') inputs = [inputs];

	const result: BibTeXTidyRunResult = {};

	if (targets.includes('api')) {
		const apiResult = testAPI(inputs, options);
		const apiResult2 = testAPI([apiResult.bibtex], options);
		tap.same(
			apiResult.bibtex,
			apiResult2.bibtex,
			'API result should be stable'
		);
		result.api = apiResult;
	}

	if (targets.includes('cli')) {
		const cliResult = testCLI(inputs, options);
		const cliResult2 = testCLI(cliResult.bibtexs, options);
		tap.same(
			cliResult.bibtexs,
			cliResult2.bibtexs,
			'CLI result should be stable'
		);
		result.cli = cliResult;
		if (result.api) {
			tap.same(
				cliResult.bibtexs[0],
				result.api.bibtex,
				'API and CLI outputs should match'
			);
		}
	}

	if (targets.includes('web')) {
		const webResult = await testWeb(inputs, options);
		const webResult2 = await testWeb([webResult.bibtex], options);
		tap.same(
			webResult.bibtex,
			webResult2.bibtex,
			'API result should be stable'
		);
		result.web = webResult;
		if (result.api) {
			tap.same(
				webResult.bibtex,
				result.api.bibtex,
				'Web and API outputs should match'
			);
		}
		if (result.cli) {
			tap.same(
				webResult.bibtex,
				result.cli.bibtexs[0],
				'Web and CLI outputs should match'
			);
		}
	}

	result.bibtex =
		result.api?.bibtex ?? result.cli?.bibtexs[0] ?? result.web?.bibtex;

	return result;
}
