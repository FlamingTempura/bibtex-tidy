import { strictEqual } from 'assert';
import { bibtex, bibtexTidy, test } from './utils';

const dupeAbstracts = bibtex`
@article{a,
    title={foo},
    abstract="  something blah BLAH."
}
@article{b,
    title={bar},
    abstract={Something blah blah}
}`;

const dupeCitations = bibtex`
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

const dupeDOIs = bibtex`
@article{a,
    title={foo},
    doi=1
}
@article{b,
    title={bar},
    doi=1
}`;

test('duplicate entry warnings', async () => {
	const tidied1 = await bibtexTidy(dupeDOIs, { duplicates: ['doi'] }, ['api']);
	strictEqual(tidied1.api?.warnings.length, 1);

	const tidied2 = await bibtexTidy(
		dupeCitations,
		{ duplicates: ['citation'] },
		['api']
	);
	strictEqual(tidied2.api?.warnings.length, 1);

	const tidied3 = await bibtexTidy(
		dupeAbstracts,
		{ duplicates: ['abstract'] },
		['api']
	);
	strictEqual(tidied3.api?.warnings.length, 1);
});
