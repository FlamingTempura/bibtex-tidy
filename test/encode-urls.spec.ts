import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@inproceedings{Smith2009,
  url={http://example.com/something_with/unusual?characters=faoo#bar}
  }`;

const expectedUnencoded = bibtex`
@inproceedings{Smith2009,
  url           = {http://example.com/something_with/unusual?characters=faoo#bar}
}
`;

const expectedEncoded = bibtex`
@inproceedings{Smith2009,
  url           = {http://example.com/something\%5Fwith/unusual?characters=faoo#bar}
}
`;

test("encode urls", async () => {
	const output1 = await bibtexTidy(input, { encodeUrls: false });
	strictEqual(output1.bibtex, expectedUnencoded);

	const output2 = await bibtexTidy(input, { encodeUrls: true });
	strictEqual(output2.bibtex, expectedEncoded);
});
