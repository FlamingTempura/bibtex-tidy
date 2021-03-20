import tap from 'tap';
import { bibtexTidy } from './utils';

tap.test('CLI help', async (t) => {
	const tidied1 = await bibtexTidy([], undefined, ['cli']);
	const tidied2 = await bibtexTidy([], { help: true }, ['cli']);

	const stdout1 = tidied1.cli?.stdout;
	const stdout2 = tidied2.cli?.stdout;

	t.same(stdout1, stdout2);
	t.contains(stdout1, 'cleaner and formatter');
	t.contains(stdout1, 'Examples');
	t.contains(stdout1, '--space');
});
