import { bibtex, test, checkSame } from './utils.js';

const input = bibtex`

@inproceedings{Smith2009,
    author="Caroline JA Smith",
    year=2009,
    month=dec,
    title={{Quantum somethings}},journal={Journal of {B}lah},
    booktitle={JOURNAL OF SOMETHINGS},
  url={http://example.com/something_with/unusual?characters=faoo#bar}
  }`;

const output = bibtex`
@inproceedings{Smith2009,
  author        = "Caroline JA Smith",
  year          = 2009,
  month         = dec,
  title         = {{Quantum somethings}},
  journal       = {Journal of {B}lah},
  booktitle     = {JOURNAL OF SOMETHINGS},
  url           = {http://example.com/something\%5Fwith/unusual?characters=faoo\#bar}
}
`;

test('encode urls', async (t, tidy) => {
	const tidied = await tidy(input, { encodeUrls: true });
	checkSame(t, tidied.bibtex, output);
});
