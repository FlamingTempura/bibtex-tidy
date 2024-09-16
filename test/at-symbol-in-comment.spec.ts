import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@blah @article{foo,foo=bar}
foo@blah @article{bar,foo=bar}
`;

const expected = bibtex`
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
	const output = await bibtexTidy(input);
	strictEqual(output.bibtex, expected);
});
