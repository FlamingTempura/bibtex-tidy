import tap from 'tap';
import { bibtex, bibtexTidy } from './utils';

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

tap.test('merge duplicates (keep first)', async (t) => {
	const tidied = await bibtexTidy(input, { merge: 'first' });
	const warnings = tidied.api?.warnings.filter(
		(w) => w.code === 'DUPLICATE_ENTRY'
	);
	t.equal(tidied.bibtex, output);
	t.equal(warnings?.length, 1);
});
