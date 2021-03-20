import { bibtex, test } from './utils';

const input = bibtex`
@article{a,
    title={foo},
    abstract="  something blah BLAH."
}
@article{b,
    title={bar},
    abstract={Something blah blah}
}`;

test(
	'duplicate abstract warnings',
	async (t, tidy) => {
		const tidied = await tidy(input, { duplicates: ['abstract'] });
		t.same(tidied.warnings.length, 1);
	},
	{ apiOnly: true }
);
