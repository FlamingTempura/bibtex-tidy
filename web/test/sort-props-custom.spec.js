import { bibtex, test, checkSame } from './utils.js';

const input = bibtex`
@ARTICLE {feinberg1983technique,
  number={1},
  title={A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
author="Feinberg, Andrew P and Vogelstein, Bert",
  journal    = {Analytical biochemistry},
  volume = 132,
  pages={6-13},
  year={1983},
  month={aug},
  publisher={Elsevier},}`;

const output = bibtex`
@article{feinberg1983technique,
  year          = {1983},
  author        = "Feinberg, Andrew P and Vogelstein, Bert",
  number        = {1},
  title         = {A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
  journal       = {Analytical biochemistry},
  volume        = 132,
  pages         = {6--13},
  month         = {aug},
  publisher     = {Elsevier}
}
`;

test('sort properties in custom order', async (t, tidy) => {
	const tidied = await tidy(input, { sortFields: ['year', 'author'] });
	checkSame(t, tidied.bibtex, output);
});
