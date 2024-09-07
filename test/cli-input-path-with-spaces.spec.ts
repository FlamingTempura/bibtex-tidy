import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const file1 = bibtex`
@article{a,
    number={1}
}`;

const output1 = bibtex`
@article{a,
  number        = {1}
}
`;

test("input paths with spaces", async () => {
	const tidied = await bibtexTidy([file1], undefined, ["cli"], {
		inputPaths: ["foo bar.bib"],
	});
	strictEqual(tidied.cli?.bibtexs[0], output1);
});
