import { bibtex, test, checkSame } from './utils';

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

test('remove empty fields', (t, tidy) => {
	const tidied = tidy(input, { removeEmptyFields: true });
	checkSame(t, tidied.bibtex, output);
});
