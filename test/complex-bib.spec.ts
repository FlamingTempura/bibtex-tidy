import { strictEqual } from "node:assert";
import { bibtex, bibtexTidy, test } from "./utils";

const input = bibtex`
@comment{jabref-meta: groupsversion:3;} % zotero export

%references
@inproceedings{Smith2009,   
  author="Caroline JA Smith",
  year=2009,
  month=dec,
  title={{Quantum somethings}},  
  journal={Journal of {B}lah}
}

comment
@book{IP:1990,
author = "Prince, Ian",
year = {1990},
title = {Methods for Research}
}

@Comment{A comment}
@Article{py03,
     author = {Xavier D\'ecoret},
     title  = "PyBiTex",
     year   = 2003
}

@Comment{
  @Book{steward03,
    author = {Martha Steward},
    title = {Cooking behind bars},
    publisher = {Culinary Expert Series},
    year = 2003
  }
  @Article{py03,
     author = {Xavier D\'ecoret},
     title  = "PyBiTex",
     year = 2003
  }
  @boo{fd{},fds}
}


@String(mar = "march")
      
@Book{sweig42,
  month =        "1~mar"
}

@String(mar = "march")
      
@Book{sweig42,
  month =        "1~" # mar
}

@String {firstname = "Xavier"}
@String {lastname  = "Decoret"}
@String {email      = firstname # "." # lastname # "@imag.fr"}

@String {maintainer = "Xavier D\'ecoret"}

@preamble { "Maintained by " # maintainer }

@String(mar = "march")
      
@Book{sweig42,
  Author =   { Stefan Sweig },
  title =  { The impossible book },
  publisher =  { Dead Poet Society},
  year =   1942,
  month =        mar
}

...and finally an entry commented by the use of the special @Comment entry type.

@Comment{steward03,
  author =   {Martha Steward},
  title =  {Cooking behind bars},
  publisher =  {Culinary Expert Series},
  year =   2003
}

% boo!
  @article{thing_a,
    title={blah},
    weird-key="{cheese} {"}in brie{"}"
  }
  % another comment
  @inproceedings{Smith2009,
    author="Caroline JA Smith",
    year=2009,
    month=dec,
    title={{Quantum somethings}},journal={Journal of {B}lah}
  }@conference_at{4,
    a__="{Caroline JA Smith}",
    _#bo={Q{Uantum} {s}omethings},
    key with spaces = thing,
  }
  % last thing
  % another last thing

Some {{comments} with unbalanced braces
....and a "commented" entry...

Book{landru21,
  author =   {Landru, Henri D\\'esir\\'e},
  title =  {A hundred recipes for you wife},
  publisher =  {Culinary Expert Series},
  year =   1921
}

..some other comments..before a valid entry...

@Book{steward03,
  author =   { Martha Steward },
  title =  {Cooking behind bars},
  publisher =  {Culinary Expert Series},
  year =   2003
}`;

const output = bibtex`
@comment{jabref-meta: groupsversion:3;}
% zotero export

%references
@inproceedings{Smith2009,
  author        = "Caroline JA Smith",
  year          = 2009,
  month         = dec,
  title         = {{Quantum somethings}},
  journal       = {Journal of {B}lah}
}
comment
@book{IP:1990,
  author        = "Prince, Ian",
  year          = {1990},
  title         = {Methods for Research}
}
@comment{A comment}
@article{py03,
  author        = {Xavier D\'ecoret},
  title         = "PyBiTex",
  year          = 2003
}
@comment{
  @Book{steward03,
    author = {Martha Steward},
    title = {Cooking behind bars},
    publisher = {Culinary Expert Series},
    year = 2003
  }
  @Article{py03,
     author = {Xavier D\'ecoret},
     title  = "PyBiTex",
     year = 2003
  }
  @boo{fd{},fds}
}
@string(mar = "march")
@book{sweig42,
  month         = "1~mar"
}
@string(mar = "march")
@book{sweig42,
  month         = "1~" # mar
}
@string{firstname = "Xavier"}
@string{lastname  = "Decoret"}
@string{email      = firstname # "." # lastname # "@imag.fr"}
@string{maintainer = "Xavier D\'ecoret"}
@preamble{ "Maintained by " # maintainer }
@string(mar = "march")
@book{sweig42,
  author        = {Stefan Sweig},
  title         = {The impossible book},
  publisher     = {Dead Poet Society},
  year          = 1942,
  month         = mar
}
...and finally an entry commented by the use of the special @Comment entry type.
@comment{steward03,
  author =   {Martha Steward},
  title =  {Cooking behind bars},
  publisher =  {Culinary Expert Series},
  year =   2003
}
% boo!
@article{thing_a,
  title         = {blah},
  weird-key     = "{cheese} {"}in brie{"}"
}
% another comment
@inproceedings{Smith2009,
  author        = "Caroline JA Smith",
  year          = 2009,
  month         = dec,
  title         = {{Quantum somethings}},
  journal       = {Journal of {B}lah}
}
@conference_at{4,
  a__           = "{Caroline JA Smith}",
  _#bo          = {Q{Uantum} {s}omethings},
  key with spaces = thing
}
% last thing
  % another last thing

Some {{comments} with unbalanced braces
....and a "commented" entry...

Book{landru21,
  author =   {Landru, Henri D\\'esir\\'e},
  title =  {A hundred recipes for you wife},
  publisher =  {Culinary Expert Series},
  year =   1921
}

..some other comments..before a valid entry...
@book{steward03,
  author        = {Martha Steward},
  title         = {Cooking behind bars},
  publisher     = {Culinary Expert Series},
  year          = 2003
}
`;

test("complex bib", async () => {
	const tidied = await bibtexTidy(input);
	strictEqual(tidied.bibtex, output);
});
