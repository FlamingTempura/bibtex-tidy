import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@incollection{BlattelMink2021,
	title = {{Das Innovationsverst{\"a}ndnis von Joseph A. Schumpeter}},
	author = {Bl{\"a}ttel-Mink, Birgit},
}`;

const output = bibtex`
@incollection{BlattelMink2021,
  title         = {{Das Innovationsverst{\"a}ndnis von Joseph A. Schumpeter}},
  author        = {Bl{\"a}ttel-Mink, Birgit}
}
`;

// https://github.com/FlamingTempura/bibtex-tidy/issues/423
test("enclosing braces should keep braces directly around commands", async () => {
	const tidied1 = await bibtexTidy(input, { enclosingBraces: true });
	strictEqual(output, tidied1.bibtex);
});
