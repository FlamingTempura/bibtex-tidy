import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@article{
  title = "A year of trees",
  volume = {5},
  number = 6
}`;

const output = bibtex`
@article{
  title         = "A year of trees",
  volume        = {5},
  number        = 6
}
`;

test("empty key", async () => {
	const tidied = await bibtexTidy(input);
	strictEqual(output, tidied.bibtex);
});
