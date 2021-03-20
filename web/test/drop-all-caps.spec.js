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
  booktitle     = {Journal Of Somethings},
  url           = {http://example.com/something\_with/unusual?characters=faoo\#bar}
}
`;

test('drop all caps', async (t, tidy) => {
	const tidied = await tidy(input, { dropAllCaps: true });
	checkSame(t, tidied.bibtex, output);
});
