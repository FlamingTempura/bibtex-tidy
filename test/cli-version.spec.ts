import { match } from 'assert';
import { spawnSync } from 'child_process';
import { BIN_PATH } from './targets/cli';
import { test } from './config/utils';

test('CLI version', async () => {
	const proc = spawnSync(BIN_PATH, ['--version'], { encoding: 'utf8' });
	match(proc.stdout, /^v\d+\.\d+.\d+\n$/);
});
