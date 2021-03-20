import tap from 'tap';
import { bibtex, bibtexTidy } from './utils';

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

const output1 = bibtex`
@article{feinberg1983technique,
  number        = {1},
  title         = {{A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity}},
  author        = "Feinberg, Andrew P and Vogelstein, Bert",
  journal       = {{Analytical biochemistry}},
  volume        = 132,
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
  author        = "Feinberg, Andrew P and Vogelstein, Bert",
  journal       = {Analytical biochemistry},
  volume        = 132,
  pages         = {6--13},
  year          = {1983},
  month         = {aug},
  publisher     = {Elsevier}
}
`;

tap.test('enclosing braces', async (t) => {
	const tidied1 = await bibtexTidy(input, {
		enclosingBraces: ['title', 'journal'],
	});
	t.equal(tidied1.bibtex, output1);

	const tidied2 = await bibtexTidy(input, { enclosingBraces: true });
	t.equal(tidied2.bibtex, output2);
});
