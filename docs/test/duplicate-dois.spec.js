import { bibtex, test, checkSame } from './utils.js';

const input = bibtex`
@article{a,
    title={foo},
    doi=1
}
@article{b,
    title={bar},
    doi=1
}`;

test(
	'duplicate doi warnings',
	async (t, tidy) => {
		const tidied = await tidy(input, { duplicates: ['doi'] });
		checkSame(t, tidied.warnings.length, 1);
	},
	{ apiOnly: true }
);
