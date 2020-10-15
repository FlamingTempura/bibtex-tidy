import tap from 'tap';
// @ts-ignore
import bibtexTidy from '../../bibtex-tidy.js';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync, spawn } from 'child_process';

const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'bibtex-tidy-'));
const TMP_FILE = path.join(TMP_DIR, 'tmp.bib');
const DIFFTOOL = process.env.DIFFTOOL || 'meld';

const unCamelCase = (str: string): string =>
	str.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

const api = (bibtex: string, options: Options = {}): BibTeXTidyResult =>
	bibtexTidy.tidy(bibtex, options);

const cli = (bibtex: string, options: Options = {}): BibTeXTidyResult => {
	const inputFirst = Math.random() > 0.5; // <input> [options] rather than [options] <input>
	const useEquals = Math.random() > 0.5; // --sort=name,year rather than --sort name year

	const args: string[] = [];
	for (const k of Object.keys(options)) {
		const value = options[k as keyof Options];
		let cliParam = '--' + unCamelCase(k);
		const vals: string[] = [];
		if (typeof value === 'number' || typeof value === 'string') {
			vals.push(String(value));
		} else if (Array.isArray(value)) {
			vals.push(...value);
		} else if (value === false) {
			cliParam = '--no-' + unCamelCase(k);
		}
		if (useEquals) {
			args.push(cliParam + (vals.length > 0 ? '=' + vals.join(',') : ''));
		} else {
			args.push(cliParam, ...vals);
		}
	}

	fs.writeFileSync(TMP_FILE, bibtex, 'utf8');

	if (inputFirst) {
		args.unshift(TMP_FILE);
	} else {
		args.push(TMP_FILE);
	}

	console.log('./bin/bibtex-tidy ' + args.join(' '));

	const proc = spawnSync(
		path.resolve(__dirname, '../../bin/bibtex-tidy'),
		args,
		{
			timeout: 100000,
			encoding: 'utf8',
		}
	);
	console.log(proc.stdout);
	if (proc.status !== 0) {
		console.error(proc.stderr, proc.error);
		throw new Error('CLI failed');
	}
	const tidied = fs.readFileSync(TMP_FILE, 'utf8');
	const warnings = (proc.stderr || '')
		.split('\n')
		.filter((line) => line.includes(': '))
		.map((line) => {
			const [code, message] = line.split(': ');
			return {
				code: code as Warning['code'],
				message,
				entry: {} as BibTeXItem, // hacky way to make typechecker happy
				duplicateOf: {} as BibTeXItem,
			};
		});
	fs.unlinkSync(TMP_FILE);
	return { bibtex: tidied, entries: [], warnings };
};

// Allows \ to be used and removes the empty line at the start
export const bibtex = (str: TemplateStringsArray): string =>
	String.raw(str).slice(1);

export const checkSame = (
	t: TapTest,
	a: string | number,
	b: string | number,
	message = 'Incorrect output'
) => {
	if (a !== b) {
		launchDifftool(String(a), String(b), message);
	}
	t.same(a, b, message);
};

export const launchDifftool = (a: string, b: string, message: string): void => {
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
};

type Tidy = typeof cli | typeof api;

type Tap = typeof tap;
type TapTest = Tap['Test']['prototype'];

type TestOptions = {
	apiOnly?: boolean;
};

type TestCallback = (
	t: TapTest,
	cb: (bibtexInput: string, tidyOptions?: Options) => ReturnType<Tidy>
) => void;

export const test = (
	title: string,
	cb: TestCallback,
	{ apiOnly }: TestOptions = {}
) => {
	const stablecb = (t: TapTest, tidy: Tidy) => {
		cb(t, (bibtexInput, tidyOptions) => {
			const a = tidy(bibtexInput, tidyOptions);
			try {
				// Re-tidy output from tidy to check that output is stable
				const b = tidy(a.bibtex, tidyOptions);
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
	tap.test(`JS API: ${title}`, { autoend: true }, (t) => stablecb(t, api));
	if (!apiOnly) {
		tap.test(`CLI: ${title}`, { autoend: true }, (t) => stablecb(t, cli));
	}
};
