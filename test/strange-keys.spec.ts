import { equal, notEqual, strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@article{ strange(key)=(has_odd-characters?:*£"!<>/ ,
  title={Foo}
}
@article{
  title={An entry with no key}
}`;

const output = bibtex`
@article{strange(key)=(has_odd-characters?:*£"!<>/,
  title         = {Foo}
}
@article{
  title         = {An entry with no key}
}
`;

const invalidInputs = [
	bibtex`
@ARTICLE {invalid{,
  title={Foo}
}`,
	bibtex`
@ARTICLE {invalid$,
  title={Foo}
}`,
	bibtex`
@ARTICLE {invalid%,
  title={Foo}
}`,
	bibtex`
@ARTICLE {invalid#,
  title={Foo}
}`,
	bibtex`
@ARTICLE {invalid~,
  title={Foo}
}`,
];

const invalidInputWithSpaces = bibtex`
@ARTICLE {in valid,
title={Foo}
}`;

test("strange characters in citation key", async () => {
	const tidied = await bibtexTidy(input);
	strictEqual(tidied.bibtex, output);

	for (const input of invalidInputs) {
		let err: unknown;
		try {
			await bibtexTidy(input);
		} catch (e) {
			err = e;
		}
		notEqual(err, undefined);
		equal(
			String(err).includes("The entry key cannot contain the character"),
			true,
		);
	}
	let err: unknown;
	try {
		await bibtexTidy(invalidInputWithSpaces);
	} catch (e) {
		err = e;
	}
	notEqual(err, undefined);
	equal(String(err).includes("The entry key cannot contain whitespace"), true);
});
