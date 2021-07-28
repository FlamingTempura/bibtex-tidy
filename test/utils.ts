import { CLIOptions } from '../src/optionUtils';
import { CLIResult, testCLI } from './targets/cli';
import { APIResult, testAPI } from './targets/api';
import { testWeb, WebResult, teardown } from './targets/web';
import { AssertionError, deepStrictEqual, strictEqual } from 'assert';

const queue: (() => Promise<void>)[] = [];

let isRunning = false;
async function run() {
	if (isRunning) return;
	isRunning = true;
	while (queue.length > 0) {
		await queue.shift()?.();
	}
	teardown();
}

export async function test(name: string, callback: () => any): Promise<void> {
	queue.push(async () => {
		try {
			await callback();
			await queue;
			console.log(`✅ ${name}`);
		} catch (e: unknown) {
			console.log(`❌ ${name}`);
			if (e instanceof AssertionError) {
				// Node generates a diff in the e.message unless a message was set in the
				// assertion. In that case, generate a new diff.
				if (!e.generatedMessage) {
					const errWithDiff = new AssertionError({
						expected: e.expected,
						actual: e.actual,
						operator: e.operator,
					});
					console.error(errWithDiff.message + '\n\n' + e.stack);
				} else {
					console.error(e.stack);
				}
			} else {
				console.error(e);
			}
			process.exit(1);
		}
	});
	run();
}

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
	inputs: string | string[] | { stdin: string },
	options?: CLIOptions,
	targets: ('api' | 'cli' | 'web')[] = ['api', 'cli', 'web']
): Promise<BibTeXTidyRunResult> {
	if (typeof inputs === 'string') inputs = [inputs];

	const result: BibTeXTidyRunResult = {};

	if (process.env.NODE_ENV === 'coverage') {
		targets = targets.filter((f) => f !== 'web');
	}

	if (targets.includes('api')) {
		if ('stdin' in inputs) throw new Error('API does not support stdin');
		const apiResult = testAPI(inputs, options);
		const apiResult2 = testAPI([apiResult.bibtex], options);
		strictEqual(
			apiResult.bibtex,
			apiResult2.bibtex,
			'API result should be stable'
		);
		result.api = apiResult;
	}

	if (targets.includes('cli')) {
		const cliResult = testCLI(inputs, options);
		const cliResult2 = testCLI(cliResult.bibtexs, options);
		deepStrictEqual(
			cliResult.bibtexs,
			cliResult2.bibtexs,
			'CLI result should be stable'
		);
		result.cli = cliResult;
		if (result.api) {
			strictEqual(
				cliResult.bibtexs[0],
				result.api.bibtex,
				'API and CLI outputs should match'
			);
		}
	}

	if (targets.includes('web')) {
		if ('stdin' in inputs) throw new Error('Web does not support stdin');
		const webResult = await testWeb(inputs, options);
		const webResult2 = await testWeb([webResult.bibtex], options);
		strictEqual(
			webResult.bibtex,
			webResult2.bibtex,
			'API result should be stable'
		);
		result.web = webResult;
		if (result.api) {
			strictEqual(
				webResult.bibtex,
				result.api.bibtex,
				'Web and API outputs should match'
			);
		}
		if (result.cli) {
			strictEqual(
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
