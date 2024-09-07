import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@article{ art,
Author = {No, one},
Title = {{Blah blah blah blah blah blah blah blah blah blah blah blah blah blah
   @blah blah blah blah blah.}},
}`;

const output = bibtex`
@article{art,
  author        = {No, one},
  title         = {{Blah blah blah blah blah blah blah blah blah blah blah blah blah blah \@blah blah blah blah blah.}}
}
`;

test("@ in title", async () => {
	const tidied = await bibtexTidy(input); // @ in title - #124 (https://github.com/sciunto-org/python-bibtexparser/issues/124)
	strictEqual(tidied.bibtex, output);
});
