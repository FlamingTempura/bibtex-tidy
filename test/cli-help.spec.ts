import { test } from './utils';

test(
	'CLI help',
	(t, tidy) => {
		const tidied1 = tidy(undefined);
		const tidied2 = tidy(undefined, { help: true });

		const stdout1 = 'stdout' in tidied1 && tidied1.stdout;
		const stdout2 = 'stdout' in tidied2 && tidied2.stdout;

		t.same(stdout1, stdout2);
		t.contains(stdout1, 'cleaner and formatter');
		t.contains(stdout1, 'Examples');
		t.contains(stdout1, '--space');
	},
	{ cliOnly: true }
);
