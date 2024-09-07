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

const outputSortedDefault = bibtex`
@article{feinberg1983technique,
  title         = {A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
  author        = "Feinberg, Andrew P and Vogelstein, Bert",
  year          = {1983},
  month         = {aug},
  journal       = {Analytical biochemistry},
  publisher     = {Elsevier},
  volume        = 132,
  number        = {1},
  pages         = {6--13}
}
`;

const outputSortedCustom = bibtex`
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

test("sort fields", async () => {
	const tidied = await bibtexTidy(input, { sortFields: true });
	strictEqual(tidied.bibtex, outputSortedDefault);

	const tidied2 = await bibtexTidy(input, { sortFields: ["year", "author"] });
	strictEqual(tidied2.bibtex, outputSortedCustom);
});
