import { bibtex, test } from './utils';

const input = bibtex`
@article{a,
    author={Smith, James},
    title="  something blah BLAH."
}
@article{b,
    author={Smith, JA},
    title={Something blah blah}
}
Issue #11 - these should not be flagged as dupelicates
@Article{Raku2,
	title = {Focusing of a vortex carrying beam with Gaussian background by a lens in the presence of spherical aberration and defocusing},
	author = {R.K.Singh and P.Senthilkumaran and K. Singh},
	year = 2007,
	journal = {Optics and Lasers in Engg.,},
	volume = 45,
	pages = {773--782},
	date-added = {2020-05-09 00:08:30 +0530},
	date-modified = {2020-05-09 00:10:16 +0530}
	}
	
	@Article{Raku10,
	title = {Focusing of a vortex carrying beam with Gaussian background by an apertured system in presence of coma},
	author = {R.K.Singh and P.Senthilkumaran and K. Singh},
	year = 2008,
	journal = {Opt.Commun.},
	volume = 281,
	pages = {923--934},
	date-added = {2020-05-09 00:13:37 +0530},
	date-modified = {2020-05-09 00:14:50 +0530}
	}`;

test(
	'duplicate citation warnings',
	(t, tidy) => {
		const tidied = tidy(input, { duplicates: ['citation'] });
		t.same(tidied.warnings.length, 1);
	},
	{ apiOnly: true }
);
