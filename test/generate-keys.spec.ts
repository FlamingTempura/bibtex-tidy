import { strictEqual } from 'assert';
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
}`;

const output = bibtex`
@article{aamport1986the,
  author        = {L[eslie] A. Aamport},
  title         = {The Gnats and Gnus Document Preparation System},
  journal       = {\\mbox{G-Animal's} Journal},
  year          = 1986
}
@article{aamport1986the2,
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
@inbook{knuth1973fundamental,
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
@book{knuth1968the,
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
@manual{manmaker1986the,
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
@inproceedings{oaho1983on,
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
@unpublished{underwood1988lower,
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
`;

test('generate keys', async () => {
	const tidied = await bibtexTidy(input, { generateKeys: true });
	strictEqual(tidied.bibtex, output);
});
