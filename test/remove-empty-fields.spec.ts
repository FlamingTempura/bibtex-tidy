import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@ARTICLE {feinberg1983technique,
    number={1},
    title={A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
  author="Feinberg, Andrew P and Vogelstein, Bert",
    journal    = {Analytical biochemistry},
    volume = 132,
    pages={},
    year={},
    day,
    month={aug},
    publisher={Elsevier},}`;

const outputWithEmpty = bibtex`
@article{feinberg1983technique,
  number        = {1},
  title         = {A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
  author        = "Feinberg, Andrew P and Vogelstein, Bert",
  journal       = {Analytical biochemistry},
  volume        = 132,
  pages         = {},
  year          = {},
  day,
  month         = {aug},
  publisher     = {Elsevier}
}
`;

const outputWithoutEmpty = bibtex`
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

test("remove empty fields", async () => {
	const tidiedWithEmpty = await bibtexTidy(input, { removeEmptyFields: false });
	const tidiedWithoutEmpty = await bibtexTidy(input, {
		removeEmptyFields: true,
	});
	strictEqual(tidiedWithEmpty.bibtex, outputWithEmpty);
	strictEqual(tidiedWithoutEmpty.bibtex, outputWithoutEmpty);
});
