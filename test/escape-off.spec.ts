import tap from 'tap';
import { bibtex, bibtexTidy } from './utils';

const input = bibtex`
@misc{q,
  author = {Chars _, $, @, &, é, ɛ, ū},
  url = {something#boo}
}`;

const output = bibtex`
@misc{q,
  author        = {Chars _, $, @, &, é, ɛ, ū},
  url           = {something#boo}
}
`;

tap.test('do not escape latex characters', async (t) => {
	const tidied = await bibtexTidy(input, { escape: false });
	t.equal(tidied.bibtex, output);
});
