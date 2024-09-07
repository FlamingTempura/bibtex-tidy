import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

test("abbreviate months", async () => {
	const inputs = [
		bibtex`@article{foo, title={Foo}, month = {3} }`,
		bibtex`@article{foo, title={Foo}, month = 3 }`,
		bibtex`@article{foo, title={Foo}, month = "3" }`,
		bibtex`@article{foo, title={Foo}, month = "mar" }`,
		bibtex`@article{foo, title={Foo}, month = {mar} }`,
		bibtex`@article{foo, title={Foo}, month = mar }`,
		bibtex`@article{foo, title={Foo}, month = "March" }`,
		bibtex`@article{foo, title={Foo}, month = {march} }`,
		bibtex`@article{foo, title={Foo}, month = {MArCH} }`,
	];

	const expected = bibtex`
@article{foo,
  title         = {Foo},
  month         = mar
}
`;

	for (const input of inputs) {
		const tidied = await bibtexTidy(input, { months: true });
		strictEqual(tidied.bibtex, expected);
	}
});

test("do not abbreviate invalid months", async () => {
	const input1 = bibtex`@article{foo, title={Foo}, month = {17} }`;

	const expected1 = bibtex`
@article{foo,
  title         = {Foo},
  month         = {17}
}
`;

	const tidied1 = await bibtexTidy(input1, { months: true });
	strictEqual(tidied1.bibtex, expected1);

	const input2 = bibtex`@article{foo, title={Foo}, month = "blah" }`;

	const expected2 = bibtex`
@article{foo,
  title         = {Foo},
  month         = "blah"
}
`;

	const tidied2 = await bibtexTidy(input2, { months: true });
	strictEqual(tidied2.bibtex, expected2);
});
