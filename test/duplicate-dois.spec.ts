import tap from 'tap';
import { bibtex, bibtexTidy } from './utils';

const input = bibtex`
@article{a,
    title={foo},
    doi=1
}
@article{b,
    title={bar},
    doi=1
}`;

tap.test('duplicate doi warnings', async (t) => {
	const tidied = await bibtexTidy(input, { duplicates: ['doi'] }, ['api']);
	t.same(tidied.api?.warnings.length, 1);
});
