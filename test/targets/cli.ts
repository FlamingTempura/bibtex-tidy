import fs, { mkdirSync } from 'fs';
import path, { join } from 'path';
import { spawnSync } from 'child_process';
import { CLIOptions } from '../../src/optionUtils';
import { Warning } from '../../src/index';
import { BibTeXItem } from '../../src/bibtex-parser';
import { optionsToCLIArgs } from '../../src/cliUtils';

const TMP_DIR = join(__dirname, '..', '..', '.tmp');

mkdirSync(TMP_DIR, { recursive: true });

function getTmpPath(i: number = 0): string {
	return path.join(TMP_DIR, `tmp${i}.bib`);
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
	const tmpFiles = bibtexs.map((bibtex, i) => {
		const tmpFile = getTmpPath(i);
		fs.writeFileSync(tmpFile, bibtex, 'utf8');
		return tmpFile;
	});

	const args: string[] = [...tmpFiles, ...optionsToCLIArgs(options)];

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
		throw new Error('CLI error: ' + proc.stderr);
	}

	return {
		bibtexs: tidiedOutputs,
		warnings,
		stdout: proc.stdout,
	};
}
