import { strictEqual } from 'assert';
import { bibtex, bibtexTidy, test } from './utils';

const input = bibtex`
@article{foo,
  title         = {{bar \& baz}}
}`;

const output = bibtex`
@article{foo,
  title         = {{bar \& baz}}
}
`;

// https://github.com/FlamingTempura/bibtex-tidy/issues/406
test('enclosing braces should work with escapes', async () => {
	const tidied1 = await bibtexTidy(input, { enclosingBraces: true });
	strictEqual(output, tidied1.bibtex);
});
