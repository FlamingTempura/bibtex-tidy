import { bibtex, test, checkSame } from './utils.js';

const input = bibtex`
@ARTICLE{Cesar2013
, author = {Jean César}
, title = {An amazing title}
, year = {2013}
, month = jan
, volume = {12}
, pages = {12--23}
, journal = {Nice Journal}
, abstract = {This is an abstract. This line should be long enough to test}
, comments = {A comment}
, keywords = {keyword1, keyword2}
}`;

const output = bibtex`
@article{Cesar2013,
  author        = {Jean C\'{e}sar},
  title         = {An amazing title},
  year          = {2013},
  month         = jan,
  volume        = {12},
  pages         = {12--23},
  journal       = {Nice Journal},
  abstract      = {This is an abstract. This line should be long enough to test},
  comments      = {A comment},
  keywords      = {keyword1, keyword2}
}
`;

test('leading commas', async (t, tidy) => {
	const tidied = await tidy(input); // leading commas - #48
	checkSame(t, tidied.bibtex, output);
});
