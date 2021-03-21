import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { CLIOptions, Options } from '../../src/options.js';
import { BibTeXTidyResult, Warning } from '../../src/index.js';
import { BibTeXItem } from '../../src/bibtex-parser.js';

const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'bibtex-tidy-'));

function getTmpPath(i: number = 0): string {
	return path.join(TMP_DIR, `tmp${i}.bib`);
}

function unCamelCase(str: string): string {
	return str.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

export type CLIResult = BibTeXTidyResult & {
	bibtexs: string[];
	stdout: string;
	stderr: string;
};

/**
 * Run bibtex-tidy through command line. Unlike API, this accepts multiple
 * bibtex files.
 */
export function testCLI(
	bibtexs: string[],
	options: CLIOptions = {}
): CLIResult {
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

	let tmpFiles = bibtexs.map((bibtex, i) => {
		const tmpFile = getTmpPath(i);
		fs.writeFileSync(tmpFile, bibtex, 'utf8');
		return tmpFile;
	});

	if (inputFirst) {
		args.unshift(...tmpFiles);
	} else {
		args.push(...tmpFiles);
	}

	//console.log('./bin/bibtex-tidy ' + args.join(' '));

	const proc = spawnSync(
		path.resolve(__dirname, '../../../bin/bibtex-tidy'),
		args,
		{
			timeout: 100000,
			encoding: 'utf8',
		}
	);
	const tidiedOutputs: string[] = [];

	if (proc.status === 0) {
		tmpFiles.forEach((tmpFile) =>
			tidiedOutputs.push(fs.readFileSync(tmpFile, 'utf8'))
		);
	}

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

	tmpFiles.forEach((tmpFile) => fs.unlinkSync(tmpFile));

	return {
		bibtex: tidiedOutputs[0] || '',
		bibtexs: tidiedOutputs,
		entries: [],
		warnings,
		stdout: proc.stdout,
		stderr: proc.stderr,
	};
}
