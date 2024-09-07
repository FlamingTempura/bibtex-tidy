import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@book{sweig42,
	title        = {The impossible book},
	author       = {Stefa{n} Sweig},
	year         = 1942,
	month        = mar,
	publisher    = {Dead Poet Society}
}
@book{sweigdd42,
	title        = {The impossible BOOK},
	author       = {Stefa{n} Sweig},
	year         = 1942,
	month        = mar,
	publisher    = {Dead Poet Society},
    n=1
}`;

const output = bibtex`
@book{sweig42,
  title         = {The impossible book},
  author        = {Stefa{n} Sweig},
  year          = 1942,
  month         = mar,
  publisher     = {Dead Poet Society}
}
`;

test("merge duplicates (keep first)", async () => {
	const tidied = await bibtexTidy(input, { merge: "first" });
	const warnings = tidied.api?.warnings.filter(
		(w) => w.code === "DUPLICATE_ENTRY",
	);
	strictEqual(tidied.bibtex, output);
	strictEqual(warnings?.length, 1);
});
