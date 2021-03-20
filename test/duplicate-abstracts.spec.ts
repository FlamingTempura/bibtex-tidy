import tap from 'tap';
import { bibtex, bibtexTidy } from './utils';

const input = bibtex`
@article{a,
    title={foo},
    abstract="  something blah BLAH."
}
@article{b,
    title={bar},
    abstract={Something blah blah}
}`;

tap.test('duplicate abstract warnings', async (t) => {
	const tidied = await bibtexTidy(input, { duplicates: ['abstract'] }, ['api']);
	t.same(tidied.api?.warnings.length, 1);
});
