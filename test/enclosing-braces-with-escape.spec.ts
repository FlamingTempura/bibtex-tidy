import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@article{foo,
  title         = {{bar \& baz}}
}`;

const expected = bibtex`
@article{foo,
  title         = {{bar \& baz}}
}
`;

// https://github.com/FlamingTempura/bibtex-tidy/issues/406
test("enclosing braces should work with escapes", async () => {
	const output = await bibtexTidy(input, { enclosingBraces: true });
	strictEqual(output.bibtex, expected);
});
