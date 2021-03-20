import tap from 'tap';
import { bibtex, bibtexTidy } from './utils';

const input = bibtex`
@misc{q,
  author = {Chars _, $, @, &, é, ɛ, ū},
  url = {something#boo}
}`;

const output = bibtex`
@misc{q,
  author        = {Chars \_, \$, \@, \&, \'{e}, \varepsilon{}, \={u}},
  url           = {something\#boo}
}
`;

tap.test('escape latex charaters', async (t) => {
	const tidied = await bibtexTidy(input, { escape: true });
	t.equal(tidied.bibtex, output);
});
