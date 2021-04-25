import { strictEqual } from 'assert';
import { bibtex, bibtexTidy, test } from './utils';

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

test('escape latex charaters', async () => {
	const tidied = await bibtexTidy(input, { escape: true });
	strictEqual(tidied.bibtex, output);
});
