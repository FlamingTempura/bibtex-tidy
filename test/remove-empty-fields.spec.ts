import tap from 'tap';
import { bibtex, bibtexTidy } from './utils';

const input = bibtex`
@ARTICLE {feinberg1983technique,
    number={1},
    title={A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
  author="Feinberg, Andrew P and Vogelstein, Bert",
    journal    = {Analytical biochemistry},
    volume = 132,
    pages={},
    year={},
    month={aug},
    publisher={Elsevier},}`;

const output = bibtex`
@article{feinberg1983technique,
  number        = {1},
  title         = {A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
  author        = "Feinberg, Andrew P and Vogelstein, Bert",
  journal       = {Analytical biochemistry},
  volume        = 132,
  month         = {aug},
  publisher     = {Elsevier}
}
`;

tap.test('remove empty fields', async (t) => {
	const tidied = await bibtexTidy(input, { removeEmptyFields: true });
	t.equal(tidied.bibtex, output);
});
