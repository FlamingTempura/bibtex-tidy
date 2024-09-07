import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@article{foo,
  title         = {{bar \& baz}},
  author={Garc{\'\i}a-Patr{\'o}n, Ra{\'u}l and Renema, Jelmer J and Shchesnovich, Valery}
}`;

const expected = bibtex`
@article{foo,
  title         = {{bar \& baz}},
  author        = {Garc{\'\i}a-Patr{\'o}n, Ra{\'u}l and Renema, Jelmer J and Shchesnovich, Valery}
}
`;

// https://github.com/FlamingTempura/bibtex-tidy/issues/406
test("enclosing braces should work with escapes", async () => {
	const output = await bibtexTidy(input, { enclosingBraces: true });
	strictEqual(output.bibtex, expected);
});
