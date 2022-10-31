import { strictEqual } from 'assert';
import { generateKey } from '../src/generateKeys';
import { bibtex, bibtexTidy, test } from './utils';

const input = bibtex`
@ARTICLE{article-minimal,
  author = {L[eslie] A. Aamport},
  title = {The Gnats and Gnus Document Preparation System},
  journal = {\\mbox{G-Animal's} Journal},
  year = 1986,
}

@ARTICLE{article-full,
  author = {L[eslie] A. Aamport},
  title = {The Gnats and Gnus Document Preparation System},
  journal = {\\mbox{G-Animal's} Journal},
  year = 1986,
  volume = 41,
  number = 7,
  pages = "73+",
  month = jul,
  note = "This is a full ARTICLE entry",
}

@INBOOK{inbook-minimal,
  author = "Donald E. Knuth",
  title = "Fundamental Algorithms",
  publisher = "Addison-Wesley",
  year = "1973",
  chapter = "1.2",
}

@INBOOK{inbook-full,
  author = "Donald E. Knuth",
  title = "Fundamental Algorithms",
  volume = 1,
  series = "The Art of Computer Programming",
  publisher = "Addison-Wesley",
  address = "Reading, Massachusetts",
  edition = "Second",
  month = "10~" # jan,
  year = "1973",
  type = "Section",
  chapter = "1.2",
  pages = "10--119",
  note = "This is a full INBOOK entry",
}

@BOOK{whole-set,
  author = "Donald E. Knuth",
  publisher = "Addison-Wesley",
  title = "The Art of Computer Programming",
  series = "Four volumes",
  year = "1968",
  note = "Seven volumes planned (this is a cross-referenced set of BOOKs)",
}

@BOOKLET{booklet-minimal,
  key = "Kn{\\printfirst{v}{1987}}",
  title = "The Programming of Computer Art",
}

@BOOK{whole-collection,
  editor = "David J. Lipcoll and D. H. Lawrie and A. H. Sameh",
  title = "High Speed Computer and Algorithm Organization",
  booktitle = "High Speed Computer and Algorithm Organization",
  number = 23,
  series = "Fast Computers",
  publisher = "Academic Press",
  address = "New York",
  edition = "Third",
  month = sep,
  year = 1977,
  note = "This is a cross-referenced BOOK (collection) entry",
}

@MANUAL{manual-minimal,
  key = "Manmaker",
  title = "The Definitive Computer Manual",
}

@MANUAL{manual-full,
  author = "Larry Manmaker",
  title = "The Definitive Computer Manual",
  organization = "Chips-R-Us",
  address = "Silicon Valley",
  edition = "Silver",
  month = apr # "-" # may,
  year = 1986,
  note = "This is a full MANUAL entry",
}

@MASTERSTHESIS{mastersthesis-minimal,
  author = "{\\'{E}}douard Masterly",
  title = "Mastering Thesis Writing",
  school = "Stanford University",
  year = 1988,
}

@INPROCEEDINGS{inproceedings-full,
  author = "Alfred V. Oaho and Jeffrey D. Ullman and Mihalis Yannakakis",
  title = "On Notions of Information Transfer in {VLSI} Circuits",
  editor = "Wizard V. Oz and Mihalis Yannakakis",
  booktitle = "Proc. Fifteenth Annual ACM" # STOC,
  number = 17,
  series = "All ACM Conferences",
  pages = "133--139",
  month = mar,
  year = 1983,
  address = "Boston",
  organization = ACM,
  publisher = "Academic Press",
  note = "This is a full INPROCEDINGS entry",
}

@PROCEEDINGS{whole-proceedings,
  key = STOC-key,
  organization = ACM,
  title = "Proc. Fifteenth Annual" # STOC,
  address = "Boston",
  year = 1983,
  booktitle = "Proc. Fifteenth Annual ACM" # STOC,
  note = "This is a cross-referenced PROCEEDINGS",
}

@UNPUBLISHED{unpublished-minimal,
  author = "Ulrich Underwood and Ned Net and Paul Pot",
  title = "Lower Bounds for Wishful Research Results",
  note = "Talk at Fanstord University (this is a minimal UNPUBLISHED entry)",
}

@UNPUBLISHED{unpublished-full,
  author = "Ulrich Underwood and Ned Net and Paul Pot",
  title = "Lower Bounds for Wishful Research Results",
  month = nov # ", " # dec,
  year = 1988,
  note = "Talk at Fanstord University (this is a full UNPUBLISHED entry)",
}

@UNPUBLISHED{unpublished-full,
  author = "Ulrich Underwood and Ned Net and Paul Pot",
  booktitle = "Lower Bounds for Wishful Research Results 2",
  month = nov # ", " # dec,
  year = 1988,
  note = "Talk at Fanstord University (this is a full UNPUBLISHED entry)",
}
@inproceedings{aristidou2008predicting,
  title = {
  Predicting Missing Markers to Drive Real-Time Centre of Rotation
  
    Estimation
  },
  author       = {Aristidou, Andreas and Cameron, Jonathan and Lasenby, Joan},
  year         = 2008,
  booktitle    = {
    AMDO '08: Proceedings of the 5th international conference on Articulated
  
    Motion and Deformable Objects
  },
  location     = {Port d'Andratx, Mallorca, Spain},
  publisher    = {Springer-Verlag},
  address      = {Berlin, Heidelberg},
  pages        = {238--247},
  isbn         = {978-3-540-70516-1}
  }

  @article{foo_bar,
    author = {~[]()=Foo Bar , Moo},
    year = 2000,
    title = "Baa baa",
  }`;

const output = bibtex`
@article{aamport1986gnats1,
  author        = {L[eslie] A. Aamport},
  title         = {The Gnats and Gnus Document Preparation System},
  journal       = {\\mbox{G-Animal's} Journal},
  year          = 1986
}
@article{aamport1986gnats2,
  author        = {L[eslie] A. Aamport},
  title         = {The Gnats and Gnus Document Preparation System},
  journal       = {\\mbox{G-Animal's} Journal},
  year          = 1986,
  volume        = 41,
  number        = 7,
  pages         = "73+",
  month         = jul,
  note          = "This is a full ARTICLE entry"
}
@inbook{knuth1973fundamental1,
  author        = "Donald E. Knuth",
  title         = "Fundamental Algorithms",
  publisher     = "Addison-Wesley",
  year          = "1973",
  chapter       = "1.2"
}
@inbook{knuth1973fundamental2,
  author        = "Donald E. Knuth",
  title         = "Fundamental Algorithms",
  volume        = 1,
  series        = "The Art of Computer Programming",
  publisher     = "Addison-Wesley",
  address       = "Reading, Massachusetts",
  edition       = "Second",
  month         = "10~" # jan,
  year          = "1973",
  type          = "Section",
  chapter       = "1.2",
  pages         = "10--119",
  note          = "This is a full INBOOK entry"
}
@book{knuth1968art,
  author        = "Donald E. Knuth",
  publisher     = "Addison-Wesley",
  title         = "The Art of Computer Programming",
  series        = "Four volumes",
  year          = "1968",
  note          = "Seven volumes planned (this is a cross-referenced set of BOOKs)"
}
@booklet{booklet-minimal,
  key           = "Kn{\\printfirst{v}{1987}}",
  title         = "The Programming of Computer Art"
}
@book{whole-collection,
  editor        = "David J. Lipcoll and D. H. Lawrie and A. H. Sameh",
  title         = "High Speed Computer and Algorithm Organization",
  booktitle     = "High Speed Computer and Algorithm Organization",
  number        = 23,
  series        = "Fast Computers",
  publisher     = "Academic Press",
  address       = "New York",
  edition       = "Third",
  month         = sep,
  year          = 1977,
  note          = "This is a cross-referenced BOOK (collection) entry"
}
@manual{manual-minimal,
  key           = "Manmaker",
  title         = "The Definitive Computer Manual"
}
@manual{manmaker1986definitive,
  author        = "Larry Manmaker",
  title         = "The Definitive Computer Manual",
  organization  = "Chips-R-Us",
  address       = "Silicon Valley",
  edition       = "Silver",
  month         = apr # "-" # may,
  year          = 1986,
  note          = "This is a full MANUAL entry"
}
@mastersthesis{masterly1988mastering,
  author        = "{\\'{E}}douard Masterly",
  title         = "Mastering Thesis Writing",
  school        = "Stanford University",
  year          = 1988
}
@inproceedings{oaho1983notions,
  author        = "Alfred V. Oaho and Jeffrey D. Ullman and Mihalis Yannakakis",
  title         = "On Notions of Information Transfer in {VLSI} Circuits",
  editor        = "Wizard V. Oz and Mihalis Yannakakis",
  booktitle     = "Proc. Fifteenth Annual ACM" # STOC,
  number        = 17,
  series        = "All ACM Conferences",
  pages         = "133--139",
  month         = mar,
  year          = 1983,
  address       = "Boston",
  organization  = ACM,
  publisher     = "Academic Press",
  note          = "This is a full INPROCEDINGS entry"
}
@proceedings{whole-proceedings,
  key           = STOC-key,
  organization  = ACM,
  title         = "Proc. Fifteenth Annual" # STOC,
  address       = "Boston",
  year          = 1983,
  booktitle     = "Proc. Fifteenth Annual ACM" # STOC,
  note          = "This is a cross-referenced PROCEEDINGS"
}
@unpublished{unpublished-minimal,
  author        = "Ulrich Underwood and Ned Net and Paul Pot",
  title         = "Lower Bounds for Wishful Research Results",
  note          = "Talk at Fanstord University (this is a minimal UNPUBLISHED entry)"
}
@unpublished{underwood1988lower1,
  author        = "Ulrich Underwood and Ned Net and Paul Pot",
  title         = "Lower Bounds for Wishful Research Results",
  month         = nov # ", " # dec,
  year          = 1988,
  note          = "Talk at Fanstord University (this is a full UNPUBLISHED entry)"
}
@unpublished{underwood1988lower2,
  author        = "Ulrich Underwood and Ned Net and Paul Pot",
  booktitle     = "Lower Bounds for Wishful Research Results 2",
  month         = nov # ", " # dec,
  year          = 1988,
  note          = "Talk at Fanstord University (this is a full UNPUBLISHED entry)"
}
@inproceedings{aristidou2008predicting,
  title         = {
    Predicting Missing Markers to Drive Real-Time Centre of Rotation

    Estimation
  },
  author        = {Aristidou, Andreas and Cameron, Jonathan and Lasenby, Joan},
  year          = 2008,
  booktitle     = {
    AMDO '08: Proceedings of the 5th international conference on Articulated

    Motion and Deformable Objects
  },
  location      = {Port d'Andratx, Mallorca, Spain},
  publisher     = {Springer-Verlag},
  address       = {Berlin, Heidelberg},
  pages         = {238--247},
  isbn          = {978-3-540-70516-1}
}
@article{_foo_bar2000baa,
  author        = {~[]()=Foo Bar , Moo},
  year          = 2000,
  title         = "Baa baa"
}
`;

test('generate keys', async () => {
	const tidied = await bibtexTidy(input, { generateKeys: true });
	strictEqual(tidied.bibtex, output);

	const entryValues = new Map([
		['title', 'A story of 2 foo and 1 bar: the best story'],
		['author', 'Bar, Foo and Mee, Moo and One, Two'],
		['year', '2018'],
		['journal', 'Foo and Goo'],
	]);
	strictEqual(generateKey(entryValues, '[auth:upper][year]'), 'BAR2018');
	strictEqual(generateKey(entryValues, '[authEtAl:lower]'), 'barmeeetal');
	strictEqual(generateKey(entryValues, '[authEtAl:capitalize]'), 'BarMeeEtAl');
	strictEqual(generateKey(entryValues, '[authors:capitalize]'), 'BarMeeOne');
	strictEqual(generateKey(entryValues, '[authors1]'), 'BarEtAl');
	strictEqual(generateKey(entryValues, '[veryshorttitle]'), 'story');
	strictEqual(generateKey(entryValues, '[shorttitle]'), 'story2foo');
	strictEqual(
		generateKey(entryValues, '[title]'),
		'AStoryOf2FooAnd1BarTheBestStory'
	);
	strictEqual(
		generateKey(entryValues, '[fulltitle]'),
		'Astoryof2fooand1barthebeststory'
	);
	strictEqual(generateKey(entryValues, '[JOURNAL]'), 'FooandGoo');
	strictEqual(generateKey(entryValues, '[JOURNAL:capitalize]'), 'FooAndGoo');
	strictEqual(generateKey(entryValues, '[YEAR]'), '2018');
	strictEqual(generateKey(entryValues, '[AUTHOR]'), 'BarFooandMeeMooandOneTwo');
});
