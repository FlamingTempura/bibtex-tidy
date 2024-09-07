import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`

@inproceedings{Q,
  title = {Q},
  month = apr,
  year = 2008
}
@article{W,
  title = {W},
  month = feb,
  year = 2008
}
@article{E,
  title = {E},
  month = jun,
  year = 2008
}
@book{R,
  title = {R},
  month = dec,
  year = 2008
}
@Misc{R,
  title = {R},
  month = nov,
  year = 2009
}
@conference{T,
  title = {T},
  month = nov,
  year = 2007
}
@ARTICLE{Y,
  title = {Y},
  month = jul,
  year = 2007
}
@misc{U,
  title = {U},
  day = {14},
  month = oct,
  year = 2007
}
@misc{U,
  title = {U},
  day = 1,
  month = oct,
  year = 2007
}
@misc{U,
  title = {U},
  day = {12},
  month = oct,
  year = 2007
}
@inproceedings{I,
  title = {I},
  month = jan,
  year = 2008
}`;

const output = bibtex`
@article{Y,
  title         = {Y},
  month         = jul,
  year          = 2007
}
@misc{U,
  title         = {U},
  day           = 1,
  month         = oct,
  year          = 2007
}
@misc{U,
  title         = {U},
  day           = 12,
  month         = oct,
  year          = 2007
}
@misc{U,
  title         = {U},
  day           = 14,
  month         = oct,
  year          = 2007
}
@conference{T,
  title         = {T},
  month         = nov,
  year          = 2007
}
@inproceedings{I,
  title         = {I},
  month         = jan,
  year          = 2008
}
@article{W,
  title         = {W},
  month         = feb,
  year          = 2008
}
@inproceedings{Q,
  title         = {Q},
  month         = apr,
  year          = 2008
}
@article{E,
  title         = {E},
  month         = jun,
  year          = 2008
}
@book{R,
  title         = {R},
  month         = dec,
  year          = 2008
}
@misc{R,
  title         = {R},
  month         = nov,
  year          = 2009
}
`;

test("sort entries by numeric keys", async () => {
	const tidied = await bibtexTidy(input, {
		sort: ["year", "month", "day"],
		numeric: true,
	});
	strictEqual(tidied.bibtex, output);
});
