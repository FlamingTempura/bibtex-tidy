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

const expected = bibtex`
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
	const output = await bibtexTidy(input, { tidyComments: false });
	strictEqual(output.bibtex, expected);
});
