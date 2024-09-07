import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`

@inproceedings{Smith2009,
    author="Caroline JA Smith",
    year=2009,
    month=dec,
    title={{Quantum somethings}},journal={Journal of {B}lah},
    booktitle={JOURNAL OF SOMETHINGS},
  url={http://example.com/something_with/unusual?characters=faoo#bar},
  volume = {VOLUME VII}
  }`;

const output = bibtex`
@inproceedings{Smith2009,
  author        = "Caroline JA Smith",
  year          = 2009,
  month         = dec,
  title         = {{Quantum somethings}},
  journal       = {Journal of {B}lah},
  booktitle     = {Journal Of Somethings},
  url           = {http://example.com/something_with/unusual?characters=faoo#bar},
  volume        = {Volume VII}
}
`;

test("drop all caps", async () => {
	const tidied = await bibtexTidy(input, { dropAllCaps: true });
	strictEqual(tidied.bibtex, output);
});
