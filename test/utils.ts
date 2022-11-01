import { CLIOptions } from '../src/optionUtils';
import { CLIResult, testCLI } from './targets/cli';
import { APIResult, testAPI } from './targets/api';
import { testWeb, WebResult, teardown } from './targets/web';
import assert, { AssertionError, deepStrictEqual, strictEqual } from 'assert';

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

	let api: APIResult | undefined;
	if (targets.includes('api')) {
		assert(!('stdin' in inputs), 'API does not support stdin');
		assert(inputs.length === 1, 'API only supports one input bibtex');
		api = testAPI(inputs[0], options);
		const check = testAPI(api.bibtex, options);
		deepStrictEqual(api.bibtex, check.bibtex, 'API result unstable');
	}

	let cli: CLIResult | undefined;
	if (targets.includes('cli')) {
		cli = testCLI(inputs, options);
		const check = testCLI(cli.bibtexs, options);
		deepStrictEqual(cli.bibtexs, check.bibtexs, 'CLI result unstable');
	}

	let web: WebResult | undefined;
	if (targets.includes('web') && process.env.NODE_ENV !== 'coverage') {
		assert(!('stdin' in inputs), 'Web does not support stdin');
		assert(inputs.length === 1, 'Web only supports one input bibtex');
		web = await testWeb(inputs[0], options);
		const check = await testWeb(web.bibtex, options);
		deepStrictEqual(web.bibtex, check.bibtex, 'Web result unstable');
	}

	if (api && cli) {
		strictEqual(
			api.bibtex,
			cli.bibtexs[0],
			'API (+) and CLI (-) outputs differ'
		);
	}
	if (cli && web) {
		strictEqual(
			cli.bibtexs[0],
			web.bibtex,
			'CLI (+) and Web (-) outputs differ'
		);
	}
	if (web && api) {
		strictEqual(web.bibtex, api.bibtex, 'Web (+) and API (-) outputs differ');
	}

	const bibtex = api?.bibtex ?? cli?.bibtexs[0] ?? web?.bibtex;

	return { api, cli, web, bibtex };
}
