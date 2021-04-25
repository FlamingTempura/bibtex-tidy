import { strictEqual } from 'assert';
import { bibtex, bibtexTidy, test } from './utils';

const input = bibtex`
@article{a,
    title={foo},
    doi=1
}
@article{b,
    title={bar},
    doi=1
}`;

test('duplicate doi warnings', async () => {
	const tidied = await bibtexTidy(input, { duplicates: ['doi'] }, ['api']);
	strictEqual(tidied.api?.warnings.length, 1);
});
