const { bibtex, test } = require('./utils');

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
	(t, tidy) => {
		const tidied = tidy(input, { duplicates: ['doi'] });
		t.same(tidied.warnings.length, 1);
	},
	{ apiOnly: true }
);
