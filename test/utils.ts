import tap from 'tap';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync, spawn } from 'child_process';
import { CLIOptions, Options } from '../src/options.js';
import { testCLI } from './targets/cli.js';
import { testAPI } from './targets/api.js';

const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'bibtex-tidy-'));

const DIFFTOOL = process.env.DIFFTOOL || 'meld';

// Allows \ to be used and removes the empty line at the start
export function bibtex(str: TemplateStringsArray): string {
	return String.raw(str).slice(1);
}

export function checkSame(
	t: TapTest,
	a: string | number,
	b: string | number,
	message = 'Incorrect output'
) {
	if (a !== b) {
		launchDifftool(String(a), String(b), message);
	}
	t.same(a, b, message);
}

export function launchDifftool(a: string, b: string, message: string): void {
	const ps = spawnSync('ps ax', { stdio: 'pipe', shell: true });
	if (ps.stdout.toString().includes(DIFFTOOL)) {
		console.log(`${DIFFTOOL} already running, not launching diff`);
		return;
	}
	console.log(`${message} :: Launching ${DIFFTOOL}...`);
	const now = Date.now();
	const tmpA = path.join(TMP_DIR, `output ${now}.bib`);
	const tmpB = path.join(TMP_DIR, `expected ${now}.bib`);
	fs.writeFileSync(tmpA, a);
	fs.writeFileSync(tmpB, b);
	try {
		spawn(DIFFTOOL, [tmpA, tmpB]);
	} catch (e) {
		console.error(`Failed to launch ${DIFFTOOL} diff tool`);
	}
}

type Tidy = typeof testCLI | typeof testAPI;

type Tap = typeof tap;
type TapTest = Tap['Test']['prototype'];

type TestOptions = {
	apiOnly?: boolean;
	cliOnly?: boolean;
};

type TestCallback = (
	t: TapTest,
	cb: (
		bibtexInput: string | string[] | undefined,
		tidyOptions?: Options | CLIOptions
	) => Promise<ReturnType<Tidy>>
) => void;

export function test(
	title: string,
	cb: TestCallback,
	{ apiOnly, cliOnly }: TestOptions = {}
) {
	const stablecb = (t: TapTest, tidy: Tidy) => {
		cb(t, async (bibtexInput = [], tidyOptions) => {
			const inputs =
				typeof bibtexInput === 'string' ? [bibtexInput] : bibtexInput;

			const a = tidy(inputs, tidyOptions);
			try {
				// Re-tidy output from tidy to check that output is stable
				const b = tidy(bibtexInput.length > 0 ? [a.bibtex] : [], tidyOptions);
				checkSame(
					t,
					a.bibtex,
					b.bibtex,
					`Unstable output for ${JSON.stringify(tidyOptions)}`
				);
				return a;
			} catch (e) {
				console.error(e);
				fs.writeFileSync('tmp.bib', a.bibtex);
				process.exit(1);
			}
		});
	};
	const testOptions = { autoend: true };
	if (!cliOnly) {
		tap.test(`JS API: ${title}`, testOptions, (t) => stablecb(t, testAPI));
	}
	if (!apiOnly) {
		tap.test(`CLI: ${title}`, testOptions, (t) => stablecb(t, testCLI));
	}
}
