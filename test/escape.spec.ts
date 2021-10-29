import { strictEqual } from 'assert';
import { bibtex, bibtexTidy, test } from './utils';

const input = bibtex`
@misc{q,
  author = {Chars \", _, $, @, &, é, ɛ, ū},
  title = {Math expression $\\alpha$ stay unescaped},
  url = {something#boo}
}`;

const outputEscaped = bibtex`
@misc{q,
  author        = {Chars \", \_, \$, \@, \&, \'{e}, \varepsilon{}, \={u}},
  title         = {Math expression $\\alpha$ stay unescaped},
  url           = {something\#boo}
}
`;

const outputUnescaped = bibtex`
@misc{q,
  author        = {Chars \", _, $, @, &, é, ɛ, ū},
  title         = {Math expression $\\alpha$ stay unescaped},
  url           = {something#boo}
}
`;

test('do not escape latex characters', async () => {
	const tidied1 = await bibtexTidy(input, { escape: true });
	strictEqual(tidied1.bibtex, outputEscaped);

	const tidied2 = await bibtexTidy(input, { escape: false });
	strictEqual(tidied2.bibtex, outputUnescaped);
});
