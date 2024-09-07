import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = `@ARTICLE {foobar,
  title={Foo Bar},
  abstract={
    Paragraph 1
    ...continued

    Paragraph 2\r\n\r\nParagraph 3\r\rParagraph 4
  },
}`;

const output = bibtex`
@article{foobar,
  title               = {Foo Bar},
  abstract            = {
    Paragraph 1 ...continued

    Paragraph 2

    Paragraph 3

    Paragraph 4
  }
}
`;

test("paragraphs in values", async () => {
	const tidied = await bibtexTidy(input, { align: 20 });
	strictEqual(tidied.bibtex, output);
});
