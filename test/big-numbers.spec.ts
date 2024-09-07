import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@article{blah,
  title={Blah},
  isbn=993320203004020203040583893423432329499585399559303,
  year=2009
}`;

const output = bibtex`
@article{blah,
  title         = {Blah},
  isbn          = 993320203004020203040583893423432329499585399559303,
  year          = 2009
}
`;

test("should not mess up long numbers", async () => {
	const tidied = await bibtexTidy(input);
	strictEqual(tidied.bibtex, output);
});
