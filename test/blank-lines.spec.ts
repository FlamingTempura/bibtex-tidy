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

const expected = bibtex`
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
	const output = await bibtexTidy(input, { blankLines: true });
	strictEqual(output.bibtex, expected);
});
