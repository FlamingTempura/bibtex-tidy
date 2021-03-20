import { bibtex, test, checkSame } from './utils.js';

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
		checkSame(t, tidied.warnings.length, 1);
	},
	{ apiOnly: true }
);
