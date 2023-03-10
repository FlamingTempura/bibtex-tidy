import { match } from 'assert';
import { bibtexTidy, test } from './utils';

test('CLI should warn if an unknown argument is provided', async () => {
	let err: unknown;
	try {
		await bibtexTidy([], {}, ['cli'], ['--foobar']);
	} catch (e) {
		err = e;
	}
	match(String(err), /Unknown option: --foobar/);
});
