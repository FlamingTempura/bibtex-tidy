import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
%references
@preamble{{abc}}
@ARTICLE {feinberg1983technique,
  number={1},
  title={A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
author="Feinberg, Andrew P and Vogelstein, Bert",
  journal    = {Analytical biochemistry},
  volume = 132,
  pages={6-13},
  year={1983},
  publisher={Elsevier},}
@article{miles1984qualitative,
    title={Qualitative data analysis: A sourcebook},
    author={Miles, Matthew B 
          and Huberman, A Michael and 
          Saldana, J},
    journal={Beverly Hills},
    year={1984} ,
    doi = {1.1}
    }
@inproceedings{Smith2009,
  author="Smith, Caroline JA",
  year=2009,
  month=dec,
  title={{Quantum somethings}},
  journal={Journal of {B}lah}
}

% test duplicate (author and title)
@inproceedings{Smith2009a,
  author="Smith, Caroline JA",
  year=2009,
  month=dec,
  title={{Quantum somethings}},
  journal={Journal of {B}lah},
  booktitle={blah}
}

@inproceedings{Smith2009b,
  author="Smith, Caroline",
  year=2009,
  month=dec,
  title={{Quantum somethings}},
  journal={Journal of {B}lah},
  booktitle={blah}
}

@book{IP:1990,
author = "Prince, Ian",
year = {1990},
title = {Methods for Research}
}

% test duplicate (DOI)
@article{dupe1,
    title={Qualitative data analysis: A sourcebooka},
    booktitle={things},
    doi = {1.1},
    }

% boo!
  @article{thing_a,
    title={blah},
    weird-key="{cheese} {"}in brie{"}"
  }
  % another comment
  @inproceedings{Smith2009,
    author="Smith, Caroline JA",
  year=2009,
  month=dec,
  title={{Quantum somethings}},journal={Journal of {B}lah}
}@conference_at{4,
  a__="{Caroline JA Smith}",
  _#bo={Q{Uantum} {s}omethings},
  key with spaces = thing,
}
% last thing
% another last thing`;

const output = bibtex`
%references
@preamble{{abc}}
@article{feinberg1983technique,
  number        = {1},
  title         = {A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
  author        = "Feinberg, Andrew P and Vogelstein, Bert",
  journal       = {Analytical biochemistry},
  volume        = 132,
  pages         = {6--13},
  year          = {1983},
  publisher     = {Elsevier}
}
@article{miles1984qualitative,
  title         = {Qualitative data analysis: A sourcebook},
  author        = {Miles, Matthew B and Huberman, A Michael and Saldana, J},
  journal       = {Beverly Hills},
  year          = {1984},
  doi           = {1.1},
  booktitle     = {things}
}
@inproceedings{Smith2009,
  author        = "Smith, Caroline JA",
  year          = 2009,
  month         = dec,
  title         = {{Quantum somethings}},
  journal       = {Journal of {B}lah},
  booktitle     = {blah}
}
% test duplicate (author and title)
@book{IP:1990,
  author        = "Prince, Ian",
  year          = {1990},
  title         = {Methods for Research}
}
% test duplicate (DOI)
% boo!
@article{thing_a,
  title         = {blah},
  weird-key     = "{cheese} {"}in brie{"}"
}
% another comment
@conference_at{4,
  a__           = "{Caroline JA Smith}",
  _#bo          = {Q{Uantum} {s}omethings},
  key with spaces = thing
}
% last thing
% another last thing
`;

test("merge duplicates", async () => {
	const tidied = await bibtexTidy(input, { duplicates: true, merge: true });
	const warnings = tidied.api?.warnings.filter(
		(w) => w.code === "DUPLICATE_ENTRY",
	);
	strictEqual(tidied.bibtex, output);
	strictEqual(
		warnings?.filter(
			(warning) => warning.code === "DUPLICATE_ENTRY" && warning.rule !== "key",
		).length,
		4,
	);
});
