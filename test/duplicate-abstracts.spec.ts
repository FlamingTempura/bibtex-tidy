import { strictEqual } from 'assert';
import { bibtex, bibtexTidy, test } from './utils';

const input = bibtex`
@article{a,
    title={foo},
    abstract="  something blah BLAH."
}
@article{b,
    title={bar},
    abstract={Something blah blah}
}`;

test('duplicate abstract warnings', async () => {
	const tidied = await bibtexTidy(input, { duplicates: ['abstract'] }, ['api']);
	strictEqual(tidied.api?.warnings.length, 1);
});
