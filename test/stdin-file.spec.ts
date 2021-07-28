// When passing "-" as a filename on the command line the output should also go to stdout.
// Expected behaviour: the following command should output the formatted file to stdout.
//
// $ cat mybib.bib | bibtex-tidy --quiet -

import { strictEqual } from 'assert';
import { env } from 'process';
import { bibtex, bibtexTidy, test } from './utils';

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

// Currently this test will fail on github actions with the following error:
//
// Error: ENXIO: no such device or address, open '/dev/stdin'
//
// This is possibly due to this issue https://github.com/actions/runner/issues/241
if (!env.GITHUB_WORKFLOW) {
	test('stdin outputs to stdout', async () => {
		const { cli } = await bibtexTidy({ stdin: input }, { quiet: true }, [
			'cli',
		]);
		strictEqual(cli?.stdout, output);
	});
}
