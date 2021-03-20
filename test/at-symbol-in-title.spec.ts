import tap from 'tap';
import { bibtex, bibtexTidy } from './utils';

const input = bibtex`
@article{ art,
Author = {No, one},
Title = {{Blah blah blah blah blah blah blah blah blah blah blah blah blah blah
   @blah blah blah blah blah.}},
}`;

const output = bibtex`
@article{art,
  author        = {No, one},
  title         = {{Blah blah blah blah blah blah blah blah blah blah blah blah blah blah \@blah blah blah blah blah.}}
}
`;

tap.test('@ in title', async (t) => {
	const tidied = await bibtexTidy(input); // @ in title - #124 (https://github.com/sciunto-org/python-bibtexparser/issues/124)
	t.equal(tidied.bibtex, output);
});
