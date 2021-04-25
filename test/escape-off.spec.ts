import { strictEqual } from 'assert';
import { bibtex, bibtexTidy, test } from './utils';

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

test('do not escape latex characters', async () => {
	const tidied = await bibtexTidy(input, { escape: false });
	strictEqual(tidied.bibtex, output);
});
