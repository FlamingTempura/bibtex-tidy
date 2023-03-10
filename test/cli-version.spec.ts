import { match } from 'assert';
import { bibtexTidy, test } from './utils';

test('CLI version', async () => {
	const { cli } = await bibtexTidy([], { version: true }, ['cli']);
	match(cli?.stdout ?? '', /^v\d+\.\d+.\d+\n$/);
});
