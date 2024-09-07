import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@ARTICLE {test,
  author   = aubert#" and "#Varacca,
  journal = abc # { 123 },
    title = "A"#"B"
}`;

const output = bibtex`
@article{test,
  author        = aubert # " and " # Varacca,
  journal       = abc # { 123 },
  title         = "A" # "B"
}
`;

test("remove empty fields", async () => {
	const tidiedWithEmpty = await bibtexTidy(input);
	strictEqual(tidiedWithEmpty.bibtex, output);
});
