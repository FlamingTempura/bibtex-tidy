import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

test("duplicate key warnings", async () => {
	const input = bibtex`
		@article{foo,
			title={foo}
		}
		@article{foo,
			title={foo}
		}
		@article{bar,
			title={bar}
		}`;
	const tidied1 = await bibtexTidy(input, { duplicates: ["key"] }, ["api"]);
	strictEqual(tidied1.api?.warnings.length, 1);
});

test("duplicate DOI warnings", async () => {
	const input = bibtex`
		@article{a,
			title={foo},
			doi=1
		}
		@article{b,
			title={bar},
			doi=1
		}
		@article{c,
			title={moo},
			doi=123
		}`;
	const tidied1 = await bibtexTidy(input, { duplicates: ["doi"] }, ["api"]);
	strictEqual(tidied1.api?.warnings.length, 1);
});

test("duplicate citation warnings", async () => {
	const input = bibtex`
		@article{a,
				author={Smith, James},
				title="  something blah BLAH."
		}
		@article{b,
				author={Smith, JA},
				title={Something blah blah}
		}
		@article{c,
				author={J. A. Smith},
				title={Something blah blah}
		}
		@article{d,
				author={James Smith},
				title={Something blah blah}
		}
		Issue #11 - these should not be flagged as duplicates
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
			}
		Issue #364 - differently numbered entries should not be detected as dupes
		@article{foo1,
			author={Mr Foo},
			title={Foo},
			number={1}
		}
		@article{foo2,
			author={Mr Foo},
			title={Foo},
			number={2}
		}`;
	const tidied = await bibtexTidy(input, { duplicates: ["citation"] }, ["api"]);
	strictEqual(tidied.api?.warnings.length, 2);
});

test("duplicate abstract warnings", async () => {
	const input = bibtex`
		@article{a,
			title={foo},
			abstract="  something blah BLAH."
		}
		@article{b,
			title={bar},
			abstract={Something blah blah}
		}
		@article{c,
			title={bar},
			abstract={Something completely different}
		}`;

	const tidied = await bibtexTidy(input, { duplicates: ["abstract"] }, ["api"]);
	strictEqual(tidied.api?.warnings.length, 1);
});
