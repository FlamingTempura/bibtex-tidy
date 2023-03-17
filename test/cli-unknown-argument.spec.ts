import { match, strictEqual } from 'assert';
import { spawnSync } from 'child_process';
import { BIN_PATH } from './targets/cli';
import { test } from './config/utils';

test('CLI should warn if an unknown argument is provided', async () => {
	const proc = spawnSync(BIN_PATH, ['--foobar'], { encoding: 'utf8' });
	strictEqual(proc.status, 1);
	match(proc.stderr, /Unknown option: --foobar/);
});
