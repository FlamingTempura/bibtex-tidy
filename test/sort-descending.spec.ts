import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`

@inproceedings{Q,
  title = {Q},
  year = 2008
}
@article{W,
  title = {W},
  year = 2001
}
@article{E,
  title = {E},
  year = 2004
}
@book{R,
  title = {R},
  year = 2018
}
@Misc{R,
  title = {R},
  year = 2011
}
@conference{T,
  title = {T},
  year = 1998
}
@ARTICLE{Y,
  title = {Y},
  year = 2019
}
@misc{U,
  title = {U},
  year = 2001
}
@inproceedings{I,
  title = {I},
  year = 2018
}`;

const output = bibtex`
@article{Y,
  title         = {Y},
  year          = 2019
}
@book{R,
  title         = {R},
  year          = 2018
}
@inproceedings{I,
  title         = {I},
  year          = 2018
}
@misc{R,
  title         = {R},
  year          = 2011
}
@inproceedings{Q,
  title         = {Q},
  year          = 2008
}
@article{E,
  title         = {E},
  year          = 2004
}
@article{W,
  title         = {W},
  year          = 2001
}
@misc{U,
  title         = {U},
  year          = 2001
}
@conference{T,
  title         = {T},
  year          = 1998
}
`;

test("sort entries in descending order", async () => {
	const tidied = await bibtexTidy(input, { sort: ["-year", "type", "title"] });
	strictEqual(tidied.bibtex, output);
});
