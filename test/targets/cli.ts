import fs, { mkdirSync } from 'fs';
import path, { join } from 'path';
import { spawnSync } from 'child_process';
import { CLIOptions, Options } from '../../src/optionUtils';
import { Warning } from '../../src/index';
import { BibTeXItem } from '../../src/bibtex-parser';

const TMP_DIR = join(__dirname, '..', '..', '.tmp');

mkdirSync(TMP_DIR, { recursive: true });

function getTmpPath(i: number = 0): string {
	return path.join(TMP_DIR, `tmp${i}.bib`);
}

function unCamelCase(str: string): string {
	return str.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

export type CLIResult = {
	bibtexs: string[];
	warnings: Warning[];
	stdout: string;
};

/**
 * Run bibtex-tidy through command line. Unlike API, this accepts multiple
 * bibtex files.
 */
export function testCLI(
	bibtexs: string[],
	options: CLIOptions = {}
): CLIResult {
	const useEquals = Math.random() > 0.5; // --sort=name,year rather than --sort name year

	const tmpFiles = bibtexs.map((bibtex, i) => {
		const tmpFile = getTmpPath(i);
		fs.writeFileSync(tmpFile, bibtex, 'utf8');
		return tmpFile;
	});

	const args: string[] = [...tmpFiles];

	for (const k of Object.keys(options)) {
		const value = options[k as keyof Options];
		if (value === undefined) continue;
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

	const proc = spawnSync(
		path.resolve(__dirname, '../../bin/bibtex-tidy'),
		args,
		{ timeout: 100000, encoding: 'utf8' }
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

	if (proc.status !== 0) {
		console.log(`> bibtex-tidy ${args.join(' ')}`);
		console.error(proc.stderr);
		throw new Error('CLI error');
	}

	return {
		bibtexs: tidiedOutputs,
		warnings,
		stdout: proc.stdout,
	};
}
