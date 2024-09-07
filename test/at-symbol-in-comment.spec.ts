import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@blah @article{foo,foo=bar}
foo@blah @article{bar,foo=bar}
`;

const output = bibtex`
@blah
@article{foo,
  foo           = bar
}
foo@blah
@article{bar,
  foo           = bar
}
`;

test("@ in comment", async () => {
	const tidied = await bibtexTidy(input);
	strictEqual(tidied.bibtex, output);
});
