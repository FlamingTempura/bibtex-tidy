import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

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

test("align", async () => {
	const tidied1 = await bibtexTidy(input, { align: 20 });
	strictEqual(tidied1.bibtex, outputAligned);

	const tidied2 = await bibtexTidy(input, { align: false });
	strictEqual(tidied2.bibtex, outputUnaligned);
});
