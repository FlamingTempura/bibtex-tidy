import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`

@inproceedings{Smith2009,
    author="Caroline JA Smith",
    year=2009,
    month=dec,
    title={{Quantum somethings}},journal={Journal of {B}lah},
    booktitle={JOURNAL OF SOMETHINGS}
  }`;

const output = bibtex`
@inproceedings{Smith2009,
  author        = "Caroline JA Smith",
  year          = 2009,
  month         = dec,
  title         = {Quantum somethings},
  journal       = {Journal of {B}lah},
  booktitle     = {JOURNAL OF SOMETHINGS}
}
`;

test("strip double braces", async () => {
	const tidied = await bibtexTidy(input, { stripEnclosingBraces: true });
	strictEqual(tidied.bibtex, output);
});
