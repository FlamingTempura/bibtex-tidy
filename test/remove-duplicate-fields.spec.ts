import { deepStrictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@book{test,
author = "Alan, Jo",
author = "Alan, Les",
year = {1990},
title = {Methods}
}`;

const output1 = bibtex`
@book{test,
  author        = "Alan, Jo",
  year          = {1990},
  title         = {Methods}
}
`;

const output2 = bibtex`
@book{test,
  author        = "Alan, Jo",
  author        = "Alan, Les",
  year          = {1990},
  title         = {Methods}
}
`;

test("remove duplicate fields", async () => {
	const tidied1 = await bibtexTidy(input, {});
	const tidied2 = await bibtexTidy(input, { removeDuplicateFields: false });

	deepStrictEqual(tidied1.bibtex, output1);
	deepStrictEqual(tidied2.bibtex, output2);
});
