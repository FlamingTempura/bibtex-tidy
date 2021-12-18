import { strictEqual, match } from 'assert';
import { bibtexTidy, test } from './utils';

test('CLI help', async () => {
	const tidied1 = await bibtexTidy([], undefined, ['cli']);
	const tidied2 = await bibtexTidy([], { help: true }, ['cli']);

	const stdout1 = tidied1.cli?.stdout;
	const stdout2 = tidied2.cli?.stdout;

	strictEqual(stdout1, stdout2);
	match(stdout1 ?? '', /cleaner and formatter/i);
	match(stdout1 ?? '', /Examples/i);
	match(stdout1 ?? '', /--space/i);
});
