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
  author="Caroline JA Smith",
  year=2009,
  month=dec,
  title={{Quantum somethings}},
  journal={Journal of {B}lah}
}

% test duplicate (author and title)
@inproceedings{Smith2009a,
  author="Caroline JA Smith",
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
    title={Qualitative data analysis: A sourcebook},
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
    author="Caroline JA Smith",
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
@conference_at{4,
  a__           = "{Caroline JA Smith}",
  _#bo          = {Q{Uantum} {s}omethings},
  key with spaces = thing
}
% test duplicate (DOI)
@article{dupe1,
  title         = {Qualitative data analysis: A sourcebook},
  booktitle     = {things},
  doi           = {1.1}
}
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
@book{IP:1990,
  author        = "Prince, Ian",
  year          = {1990},
  title         = {Methods for Research}
}
@article{miles1984qualitative,
  title         = {Qualitative data analysis: A sourcebook},
  author        = {Miles, Matthew B and Huberman, A Michael and Saldana, J},
  journal       = {Beverly Hills},
  year          = {1984},
  doi           = {1.1}
}
@inproceedings{Smith2009,
  author        = "Caroline JA Smith",
  year          = 2009,
  month         = dec,
  title         = {{Quantum somethings}},
  journal       = {Journal of {B}lah}
}
% another comment
@inproceedings{Smith2009,
  author        = "Caroline JA Smith",
  year          = 2009,
  month         = dec,
  title         = {{Quantum somethings}},
  journal       = {Journal of {B}lah}
}
% test duplicate (author and title)
@inproceedings{Smith2009a,
  author        = "Caroline JA Smith",
  year          = 2009,
  month         = dec,
  title         = {{Quantum somethings}},
  journal       = {Journal of {B}lah},
  booktitle     = {blah}
}
% boo!
@article{thing_a,
  title         = {blah},
  weird-key     = "{cheese} {"}in brie{"}"
}
% last thing
% another last thing
`;

test("sort entries by default", async () => {
	const tidied = await bibtexTidy(input, { sort: true });
	strictEqual(tidied.bibtex, output);
});
