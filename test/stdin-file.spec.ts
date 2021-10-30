// When passing "-" as a filename on the command line the output should also go to stdout.
// Expected behaviour: the following command should output the formatted file to stdout.
//
// $ cat mybib.bib | bibtex-tidy --quiet -

import { strictEqual } from 'assert';
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

test('stdin outputs to stdout', async () => {
	const { cli } = await bibtexTidy({ stdin: input }, { quiet: true }, ['cli']);
	strictEqual(cli?.stdout, output);
});
