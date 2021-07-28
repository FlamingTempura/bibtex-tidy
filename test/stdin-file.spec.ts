// TODO: Write a test for when the filename is stdin/stdout, i.e. when passing
// "-" as a filename on the command line. The output should also go to stdout.
// Expected behaviour: the following command should output the formatted file
// to stdout.
// $ cat mybib.bib | bibtex-tidy --quiet -

// Maybe it would be something as follows? I don't know how to pass stdin to
// bibtexTidy.

/* import { strictEqual } from 'assert';
import { bibtex, bibtexTidy, test } from './utils';

const file = bibtex`
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
	const { cli } = await bibtexTidy('-', { quiet: true }, ['cli']);
	strictEqual(cli?.stdout, output);
}); */
