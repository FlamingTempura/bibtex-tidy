import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const file1 = bibtex`
@article{a,
    number={1},
    title={A}
}`;

const file2 = bibtex`
@article{b,
  number={1},
  title={B}
}`;

const output1 = bibtex`
@article{a,
  number        = {1},
  title         = {A}
}
`;

const output2 = bibtex`
@article{b,
  number        = {1},
  title         = {B}
}
`;

test("multiple files", async () => {
	const tidied = await bibtexTidy([file1, file2], undefined, ["cli"]);
	strictEqual(tidied.cli?.bibtexs[0], output1);
	strictEqual(tidied.cli.bibtexs[1], output2);
});
