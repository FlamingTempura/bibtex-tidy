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

const output = bibtex`
@article{feinberg1983technique,
	number        = {1},
	title         = {A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
	author        = "Feinberg, Andrew P and Vogelstein, Bert",
	journal       = {Analytical biochemistry},
	volume        = 132,
	pages         = {6--13},
	year          = {1983},
	month         = {aug},
	publisher     = {Elsevier}
}
`;

test("indent with tabs", async () => {
	const tidied = await bibtexTidy(input, { tab: true });
	strictEqual(tidied.bibtex, output);
});
