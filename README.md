## bibtex-tidy

Tidy bibtex files. [Try it out](https://flamingtempura.github.io/bibtex-tidy/).

![Screen Recording 2020-10-23 at 16 25 26(1)](https://user-images.githubusercontent.com/1085434/97023051-dcbcf180-154c-11eb-9185-6f6de7c2fc68.gif)

bibtex-tidy is free to use at https://flamingtempura.github.io/bibtex-tidy/

### Example

Before:

```bibtex
@ARTICLE {feinberg1983technique,
  title={A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
author={Feinberg, Andrew P and Vogelstein, Bert},
  journal    = {Analytical biochemistry},
  volume = 132,
  number=1,
  pages={6--13},
  year=1983,
  publisher={Elsevier},}
@article{miles1984qualitative,
    title={Qualitative data analysis: A sourcebook},
    author={Miles, Matthew B and Huberman, A Michael and Saldana, J},
    journal={Beverly Hills},
    year=1984
}
```

After `bibtex-tidy references.bib`:

```bibtex
@article{feinberg1983technique,
  title         = {A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
  author        = {Feinberg, Andrew P and Vogelstein, Bert},
  year          = 1983,
  journal       = {Analytical biochemistry},
  publisher     = {Elsevier},
  volume        = 132,
  number        = 1,
  pages         = {6--13}
}
@article{miles1984qualitative,
  title         = {Qualitative data analysis: A sourcebook},
  author        = {Miles, Matthew B and Huberman, A Michael and Saldana, J},
  year          = 1984,
  journal       = {Beverly Hills}
}
```

### Installation

```sh
npm install -g bibtex-tidy
bibtex-tidy references.bib
```

```manpage
Usage: bibtex-tidy [OPTION]... FILE.BIB
BibTeX Tidy v1.7.1 - cleaner and formatter for BibTeX files.

Options:
  --help, -h               Show help

  --omit                   Remove specified fields from bibliography entries.
                           Examples:
                           --omit=id,name

  --curly, --no-curly      Enclose all property values in braces. Quoted values
                           will be converted to braces. For example, "Journal of
                           Tea" will become {Journal of Tea}.

  --numeric, --no-numeric  Strip quotes and braces from numeric/month values. For
                           example, {1998} will become 1998.

  --space                  Indent all fields with the specified number of spaces.
                           Ignored if tab is set.
                           Examples:
                           --space=2 (default)
                           --space=4

  --tab, --no-tab          Intent all fields with a tab.

  --align, --no-align      Insert whitespace between fields and values so that
                           values are visually aligned.
                           Examples:
                           --align=14 (default)

  --sort, --no-sort        Sort entries by specified fields. For descending order,
                           prefix the field with a dash (-).
                           Examples:
                           --sort (sort by id)
                           --sort=-year,name (sort year descending then name
                           ascending)
                           --sort=name,year

  --duplicates             Warn if duplicates are found, which are entries where
                           DOI, abstract, or author and title are the same.
                           Examples:
                           --duplicates doi (same DOIs)
                           --duplicates key (same IDs)
                           --duplicates abstract (similar abstracts)
                           --duplicates citation (similar author and titles)
                           --duplicates doi, key (identical DOI or keys)
                           --duplicates (same DOI, key, abstract, or citation)

  --merge, --no-merge      Merge duplicates entries. Use the duplicates option to
                           determine how duplicates are identified. There are
                           different ways to merge:
                           - first: only keep the original entry
                           - last: only keep the last found duplicate
                           - combine: keep original entry and merge in fields of
                           duplicates if they do not already exist
                           - overwrite: keep original entry and merge in fields of
                           duplicates, overwriting existing fields if they exist

  --strip-enclosing-braces Where an entire value is enclosed in double braces,
                           remove the extra braces. For example, {{Journal of Tea}}
                           will become {Journal of Tea}.

  --drop-all-caps          Where values are all caps, make them title case. For
                           example, {JOURNAL OF TEA} will become {Journal of Tea}.

  --escape, --no-escape    Escape special characters, such as umlaut. This ensures
                           correct typesetting with latex. Enabled by default.

  --sort-fields            Sort the fields within entries.
                           If no fields are specified fields will be sorted by:
                           title, shorttitle, author, year, month, day, journal,
                           booktitle, location, on, publisher, address, series,
                           volume, number, pages, doi, isbn, issn, url, urldate,
                           copyright, category, note, metadata
                           Examples:
                           --sort-fields=name,author

  --strip-comments,        Remove all comments from the bibtex source.
  --no-strip-comments      

  --trailing-commas,       End the last key value pair in each entry with a comma.
  --no-trailing-commas     

  --encode-urls,           Replace invalid URL characters with percent encoded
  --no-encode-urls         values.

  --tidy-comments,         Remove whitespace surrounding comments.
  --no-tidy-comments       

  --remove-empty-fields,   Remove any fields that have empty values.
  --no-remove-empty-fields 

  --remove-dupe-fields,    Only allow one of each field in each entry. Enabled by
  --no-remove-dupe-fields  default.

  --max-authors            Truncate authors if above a given number into "and
                           others".

  --no-lowercase           Lowercase field names and entry type. Enabled by
                           default.

  --enclosing-braces       Enclose the given fields in double braces, such that
                           case is preserved during BibTeX compilation.
                           Examples:
                           --enclosing-braces=title,journal (output title and
                           journal fields will be of the form {{This is a title}})
                           --enclosing-braces (equivalent to
                           ---enclosing-braces=title)

  --wrap, --no-wrap        Wrap long values at the given column
                           Examples:
                           --wrap (80 by default)
                           --wrap=82

  --version, -v            Show bibtex-tidy version.

  --quiet                  Suppress logs and warnings.

  --backup, --no-backup    Make a backup <filename>.original. Enabled by default.

Full documentation <https://github.com/FlamingTempura/bibtex-tidy>
```

### Programmatic usage

```
npm install bibtex-tidy
```

```js
const tidy = require('bibtex-tidy');
const bibtex = fs.readFileSync('references.bib', 'utf8');
tidy.tidy(bibtex, { curly: true });
```

Documentation for the options can be found [here](https://github.com/FlamingTempura/bibtex-tidy/blob/master/src/__generated__/optionsType.ts)
