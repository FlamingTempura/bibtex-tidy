import { bibtex } from '../config/utils';

const input = bibtex`
@blah @article{foo,foo=bar}
foo@blah @article{bar,foo=bar}
`;

const output = bibtex`
@blah
@article{foo,
  foo           = bar
}
foo@blah
@article{bar,
  foo           = bar
}
`;

test('@ in comment', async () => {
	const tidied = await bibtexTidy(input);
	expect(tidied.bibtex).toBe(output);
});
