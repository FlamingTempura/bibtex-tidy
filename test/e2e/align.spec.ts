import { bibtex } from '../config/utils';

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

const outputAligned = bibtex`
@article{feinberg1983technique,
  number              = {1},
  title               = {A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
  author              = "Feinberg, Andrew P and Vogelstein, Bert",
  journal             = {Analytical biochemistry},
  volume              = 132,
  pages               = {6--13},
  year                = {1983},
  month               = {aug},
  publisher           = {Elsevier}
}
`;

const outputUnaligned = bibtex`
@article{feinberg1983technique,
  number = {1},
  title = {A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
  author = "Feinberg, Andrew P and Vogelstein, Bert",
  journal = {Analytical biochemistry},
  volume = 132,
  pages = {6--13},
  year = {1983},
  month = {aug},
  publisher = {Elsevier}
}
`;

test('align 20', async () => {
	const tidied = await bibtexTidy(input, { align: 20 });
	expect(tidied.bibtex).toBe(outputAligned);
});

test('no align', async () => {
	const tidied = await bibtexTidy(input, { align: false });
	expect(tidied.bibtex).toBe(outputUnaligned);
});
