import { bibtex, test, checkSame } from './utils.js';

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

test('escape latex charaters', async (t, tidy) => {
	const tidied = await tidy(input, { escape: true });
	checkSame(t, tidied.bibtex, output);
});
