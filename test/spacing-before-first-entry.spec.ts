import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`

	@article{a,
	  title = {Something},
    }

@article{b,
    title = {Something},
}

	@article{c,
	  title = {Something},
	}
`;

const output = bibtex`
@article{a,
  title         = {Something}
}

@article{b,
  title         = {Something}
}

@article{c,
  title         = {Something}
}
`;

test("spacing before first entry", async () => {
	const tidied = await bibtexTidy(input, { tidyComments: false });
	strictEqual(tidied.bibtex, output);
});
