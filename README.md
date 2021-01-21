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

```
Usage: bibtex-tidy [OPTION]... FILE.BIB
BibTeX Tidy - cleaner and formatter for BibTeX files.

Options:
  --help                   Show help

  --omit                   Remove fields - Remove specified fields from
                           bibliography entries.
                           Examples:
                           --omit=id,name

  --curly                  Enclose values in curly braces - Enclose all property
                           values in braces. Quoted values will be converted to
                           braces. For example, "Journal of Tea"
                           will become {Journal of Tea}.

  --numeric                Use numeric values where possible - Strip quotes and
                           braces from numeric/month values. For example, {1998}
                           will become 1998.

  --space                  Indent with spaces - Prefix all fields with the
                           specified number of spaces
                           (ignored if tab is set).
                           Examples:
                           --space=2 (default)
                           --space=4

  --tab                    Indent with tabs - Prefix all fields with a tab.

  --align                  Align values - Insert whitespace between fields and
                           values so that values are visually aligned.
                           Examples:
                           --align=14 (default)
                           --no-align

  --sort                   Sort bibliography entries - Sort entries by specified
                           fields. For descending order, prefix the field with a
                           dash (-).
                           Examples:
                           --sort (sort by id)
                           --sort=-year,name (sort year descending then name
                           ascending)
                           --sort=name,year

  --duplicates             Check for duplicates - If there are duplicates, output
                           warnings. When using with the `merge` option, this
                           determines which entries to merge. Two entries are
                           considered duplicates in the following cases:
                           - their DOIs are identical,
                           - their abstracts are identical, or
                           - their authors and titles are both identical. The
                           first-most entry is kept and any extra properties from
                           duplicate entries are incorporated.
                           Examples:
                           --duplicates (warn if sharing doi, key, abstract, or
                           citation)
                           --duplicates doi (warn if DOIs are identical)
                           --duplicates key (warn if IDs are identical)
                           --duplicates abstract (warn if abstracts are similar)
                           --duplicates citation (warn if author and titles are
                           similar)
                           --duplicates doi, key (warn if DOI or keys are
                           identical)

  --merge                  Merge duplicate entries - Merge duplicates entries. How
                           duplicates are identified can be set using the
                           `duplicates` option. There are different ways to merge:
                           - first: only keep the original entry
                           - last: only keep the last found duplicate
                           - combine: keep original entry and merge in fields of
                           duplicates if they do not already exist
                           - overwrite: keep original entry and merge in fields of
                           duplicates, overwriting existing fields if they exist

  --strip-enclosing-braces Strip double-braced values - Where an entire value is
                           enclosed in double braces, remove the extra braces. For
                           example, {{Journal of Tea}} will become {Journal of
                           Tea}.

  --drop-all-caps          Drop all caps - Where values are all caps, make them
                           title case. For example, {JOURNAL OF TEA} will become
                           {Journal of Tea}.

  --escape                 Escape special characters - Escape special characters,
                           such as umlaut. This ensures correct typesetting with
                           latex.
                           Examples:
                           --escape (default)
                           --no-escape

  --sort-fields            Sort fields - Sort the fields within entries. If
                           sort-fields is specified without fields, fields will be
                           sorted as follows: title, shorttitle, author, year,
                           month, day, journal, booktitle, location, on, publisher,
                           address, series, volume, number, pages, doi, isbn, issn,
                           url, urldate, copyright, category, note, metadata.
                           Alternatively, you can specify field names delimited by
                           spaces or commas.
                           Examples:
                           --sort-fields=name,author

  --strip-comments         Remove comments - Remove all comments from the bibtex
                           source

  --trailing-commas        End the last key value pair in each entry with a comma

  --encode-urls            Encode URLs - Replace invalid URL characters with
                           percent encoded values.

  --tidy-comments          Tidy comments - Remove whitespace surrounding

  --remove-empty-fields    Remove any fields that have empty values

  --max-authors=NUMBER     Maximum authors - truncates authors if above a given
                           number into "and others".

  --lowercase              Make field names and entry type lowercase.
                           Examples:
                           --lowercase (default)
                           --no-lowercase (keep original case)

  --enclosing-braces       Wrap the given fields in double braces, such that case
                           is preserved when compiling your document.
                           Examples:
                           --enclosing-braces=title,journal (output title and
                           journal fields will be of the form {{This is a title}})
                           --enclosing-braces (equivalent to
                           ---enclosing-braces=title)

  --wrap                   Wrap values at the given column (80 by default)

  --quiet                  Suppress logs and warnings.

  --backup                 Make a backup <filename>.original
                           Examples:
                           --backup (default)
                           --no-backup (do not create a backup)
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

Documentation for the options can be found [here](https://github.com/FlamingTempura/bibtex-tidy/blob/master/src/options.d.ts)
