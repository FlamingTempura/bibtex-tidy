import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@preamble{Foo}
Comment
@article{foo,
  title={Foo}
}
@article{bar,
  title={Bar}
}`;

const output = bibtex`
@preamble{Foo}

Comment
@article{foo,
  title         = {Foo}
}

@article{bar,
  title         = {Bar}
}
`;

test("insert blank lines between blocks", async () => {
	const tidied = await bibtexTidy(input, { blankLines: true });
	strictEqual(tidied.bibtex, output);
});
