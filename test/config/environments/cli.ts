import { spawnSync } from 'child_process';
import { join } from 'path';
import NodeEnvironment from 'jest-environment-node';
import { optionsToCLIArgs } from '../../../src/cliUtils';
import type { BibTeXTidyResult } from '../../../src/index';
import type { Options } from '../../../src/optionUtils';
import { cacheTidyResults } from './utils';

export const TMP_DIR = join(__dirname, '..', '..', '..', '.tmp');
export const BIN_PATH =
	process.env.BIBTEX_TIDY_BIN ??
	join(__dirname, '..', '..', '..', 'bin', 'bibtex-tidy');

export default class CLIEnvironment extends NodeEnvironment {
	async setup() {
		await super.setup();
		this.global.bibtexTidy = cacheTidyResults(tidyCLI, 'cli', this.context);
	}
}

async function tidyCLI(
	bibtex: string,
	options: Options = {}
): Promise<BibTeXTidyResult> {
	const args = ['--v2', ...optionsToCLIArgs(options)];

	const proc = spawnSync(BIN_PATH, args, {
		timeout: 100000,
		encoding: 'utf8',
		input: bibtex,
	});

	if (proc.status !== 0) {
		console.log(`> bibtex-tidy ${args.join(' ')}`);
		throw new Error('CLI error: ' + proc.stderr);
	}

	return { bibtex: proc.stdout, warnings: [], count: 0 };
}
