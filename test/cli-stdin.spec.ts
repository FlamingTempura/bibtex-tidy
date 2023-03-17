import { match, strictEqual } from 'assert';
import { spawnSync } from 'child_process';
import { BIN_PATH } from './targets/cli';
import { bibtex, test } from './config/utils';

const input = bibtex`
@article{a,
    number={1},
    title={A}
}`;

const output = bibtex`
@article{a,
  number        = {1},
  title         = {A}
}
`;

test('CLI should accept stdin', async () => {
	const proc = spawnSync(BIN_PATH, [], { input, encoding: 'utf8' });
	strictEqual(proc.stdout, output);
});

test('CLI should throw if specifying --backup with stdin', async () => {
	const proc = spawnSync(BIN_PATH, ['--backup'], { input, encoding: 'utf8' });
	match(proc.stderr, /--backup is only valid when specifying input files/);
	strictEqual(proc.stdout, '');
	strictEqual(proc.status, 1);
});

test('CLI should throw if specifying --modify with stdin', async () => {
	const proc = spawnSync(BIN_PATH, ['--modify'], { input, encoding: 'utf8' });
	match(proc.stderr, /--modify\/-m is only valid when specifying input files/);
	strictEqual(proc.stdout, '');
	strictEqual(proc.status, 1);
});
