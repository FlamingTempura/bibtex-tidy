import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@ARTICLE {quant,
  title         = {Quantifying {Madness} in {Green {Leaf}} Ants},
  shorttitle    = {Quantifying \\textbf{Madness} in {Green {Leaf}} Ants}
}`;

const output1 = bibtex`
@article{quant,
  title         = {Quantifying Madness in Green Leaf Ants},
  shorttitle    = {Quantifying \\textbf{Madness} in Green Leaf Ants}
}
`;

const output2 = bibtex`
@article{quant,
  title         = {Quantifying Madness in Green Leaf Ants},
  shorttitle    = {Quantifying \\textbf{Madness} in {Green {Leaf}} Ants}
}
`;

test("enclosing braces", async () => {
	const tidied1 = await bibtexTidy(input, {
		removeBraces: ["title", "shorttitle"],
	});
	strictEqual(output1, tidied1.bibtex);

	const tidied2 = await bibtexTidy(input, { removeBraces: true });
	strictEqual(output2, tidied2.bibtex);
});
