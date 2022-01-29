import { strictEqual } from 'assert';
import { bibtex, bibtexTidy, test } from './utils';

const input = bibtex`
@ARTICLE {feinberg1983technique,
    number={1},
    title={A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
    shorttitle={A technique for radiolabeling {DNA} restriction endonuclease fragments to high specific activity},
  author="Feinberg, Andrew P and Vogelstein, Bert",
    journal    = "Analytical biochemistry",
    volume = 132,
    pages={6-13},
    year={1983},
    month={aug},
    publisher={Elsevier},}`;

const output1 = bibtex`
@article{feinberg1983technique,
  number        = {1},
  title         = {{A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity}},
  shorttitle    = {{A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity}},
  author        = {Feinberg, Andrew P and Vogelstein, Bert},
  journal       = {{Analytical biochemistry}},
  volume        = {132},
  pages         = {6--13},
  year          = {1983},
  month         = {aug},
  publisher     = {Elsevier}
}
`;

const output2 = bibtex`
@article{feinberg1983technique,
  number        = {1},
  title         = {{A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity}},
  shorttitle    = {A technique for radiolabeling {DNA} restriction endonuclease fragments to high specific activity},
  author        = "Feinberg, Andrew P and Vogelstein, Bert",
  journal       = "Analytical biochemistry",
  volume        = 132,
  pages         = {6--13},
  year          = {1983},
  month         = {aug},
  publisher     = {Elsevier}
}
`;

test('enclosing braces', async () => {
	const tidied1 = await bibtexTidy(input, {
		enclosingBraces: ['title', 'shorttitle', 'journal'],
		curly: true,
	});
	strictEqual(output1, tidied1.bibtex);

	const tidied2 = await bibtexTidy(input, { enclosingBraces: true });
	strictEqual(output2, tidied2.bibtex);
});
