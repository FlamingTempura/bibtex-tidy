import { strictEqual } from 'assert';
import { bibtex, bibtexTidy, test } from './utils';

const input = bibtex`
@misc{emptyref,
  
}`;

const output = bibtex`
@misc{emptyref,
}
`;

test('empty entry', async () => {
	const tidied = await bibtexTidy(input);
	strictEqual(output, tidied.bibtex);
});
