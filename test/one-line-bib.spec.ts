import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@preamble{ "Maintained by " # maintainer }@string{mar = "march"}@book{sweig42,author = {Stefan Sweig},title = {The impossible book},publisher = {Dead Poet Society},year = 1942,  month = mar}@article{thing_a,title = {blah},  weird-key = "{cheese} {"}in brie{"}"}% another comment @inproceedings{Smith2009,  author = "Caroline JA Smith",  year = 2009,  month = dec,title = {{Quantum somethings}},journal = {Journal of {B}lah}}@conference_at{4,a__ = "{Caroline JA Smith}",_#bo = {Q{Uantum} {s}omethings},key with spaces = thing}@comment{boo}@book{steward03,author = {Martha Steward},title      = {Cooking behind bars},publisher = {Culinary Expert Series},year = 2003}
`;

const output = bibtex`
@preamble{ "Maintained by " # maintainer }
@string{mar = "march"}
@book{sweig42,
  author        = {Stefan Sweig},
  title         = {The impossible book},
  publisher     = {Dead Poet Society},
  year          = 1942,
  month         = mar
}
@article{thing_a,
  title         = {blah},
  weird-key     = "{cheese} {"}in brie{"}"
}
% another comment
@inproceedings{Smith2009,
  author        = "Caroline JA Smith",
  year          = 2009,
  month         = dec,
  title         = {{Quantum somethings}},
  journal       = {Journal of {B}lah}
}
@conference_at{4,
  a__           = "{Caroline JA Smith}",
  _#bo          = {Q{Uantum} {s}omethings},
  key with spaces = thing
}
@comment{boo}
@book{steward03,
  author        = {Martha Steward},
  title         = {Cooking behind bars},
  publisher     = {Culinary Expert Series},
  year          = 2003
}
`;

test("one line bib", async () => {
	const tidied = await bibtexTidy(input);
	strictEqual(tidied.bibtex, output);
});
