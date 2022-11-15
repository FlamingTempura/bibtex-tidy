# bibtex-tidy

Tidy bibtex files. [Try it out](https://flamingtempura.github.io/bibtex-tidy/).

![Screen Recording 2020-10-23 at 16 25 26(1)](https://user-images.githubusercontent.com/1085434/97023051-dcbcf180-154c-11eb-9185-6f6de7c2fc68.gif)

There are several ways you can use bibtex-tidy:
* [In your browser](https://flamingtempura.github.io/bibtex-tidy/)
* [CLI](#sec-cli)
* As a pre-commit-hook
* [Javascript/Typescript API](#sec-api)

## Example

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

<a name="sec-cli" />

## CLI

Requires node v12 or later.

```sh
npm install -g bibtex-tidy
bibtex-tidy references.bib
```

```manpage
  --help, -h
      Show help
      
  --omit
      Remove specified fields from bibliography entries.
      
      Examples:
      --omit=id,name
      
  --curly, --no-curly
      Enclose all property values in braces. Quoted values will be converted to
      braces. For example, "Journal of Tea" will become {Journal of Tea}.
      
  --numeric, --no-numeric
      Strip quotes and braces from numeric/month values. For example, {1998} will
      become 1998.
      
  --space
      Indent all fields with the specified number of spaces. Ignored if tab is set.
      
      Examples:
      --space=2 (default), --space=4
      
  --tab, --no-tab
      Indent all fields with a tab.
      
  --align, --no-align
      Insert whitespace between fields and values so that values are visually
      aligned.
      
      Examples:
      --align=14 (default)
      
  --blank-lines, --no-blank-lines
      Insert an empty line between each entry.
      
  --sort, --no-sort
      Sort entries by specified fields. For descending order, prefix the field with
      a dash (-).
      
      Examples:
      --sort (sort by id), --sort=-year,name (sort year descending then name
      ascending), --sort=name,year
      
  --duplicates
      Warn if duplicates are found, which are entries where DOI, abstract, or
      author and title are the same.
      
      Examples:
      --duplicates doi (same DOIs), --duplicates key (same IDs), --duplicates
      abstract (similar abstracts), --duplicates citation (similar author and
      titles), --duplicates doi, key (identical DOI or keys), --duplicates (same
      DOI, key, abstract, or citation)
      
  --merge, --no-merge
      Merge duplicates entries. Use the duplicates option to determine how
      duplicates are identified. There are different ways to merge:
      
      - first: only keep the original entry
      
      - last: only keep the last found duplicate
      
      - combine: keep original entry and merge in fields of duplicates if they do
      not already exist
      
      - overwrite: keep original entry and merge in fields of duplicates,
      overwriting existing fields if they exist
      
  --strip-enclosing-braces
      Where an entire value is enclosed in double braces, remove the extra braces.
      For example, {{Journal of Tea}} will become {Journal of Tea}.
      
  --drop-all-caps
      Where values are all caps, make them title case. For example, {JOURNAL OF
      TEA} will become {Journal of Tea}.
      
  --escape, --no-escape
      Escape special characters, such as umlaut. This ensures correct typesetting
      with latex. Enabled by default.
      
  --sort-fields
      Sort the fields within entries.
      
      If no fields are specified fields will be sorted by: title, shorttitle,
      author, year, month, day, journal, booktitle, location, on, publisher,
      address, series, volume, number, pages, doi, isbn, issn, url, urldate,
      copyright, category, note, metadata
      
      Examples:
      --sort-fields=name,author
      
  --strip-comments, --no-strip-comments
      Remove all comments from the bibtex source.
      
  --trailing-commas, --no-trailing-commas
      End the last key value pair in each entry with a comma.
      
  --encode-urls, --no-encode-urls
      Replace invalid URL characters with percent encoded values.
      
  --tidy-comments, --no-tidy-comments
      Remove whitespace surrounding comments.
      
  --remove-empty-fields, --no-remove-empty-fields
      Remove any fields that have empty values.
      
  --remove-dupe-fields, --no-remove-dupe-fields
      Only allow one of each field in each entry. Enabled by default.
      
  --generate-keys
      [Experimental] For all entries replace the key with a new key of the form
      <author><year><title>.
      
  --max-authors
      Truncate authors if above a given number into "and others".
      
  --no-lowercase
      Lowercase field names and entry type. Enabled by default.
      
  --enclosing-braces
      Enclose the given fields in double braces, such that case is preserved during
      BibTeX compilation.
      
      Examples:
      --enclosing-braces=title,journal (output title and journal fields will be of
      the form {{This is a title}}), --enclosing-braces (equivalent to
      ---enclosing-braces=title)
      
  --wrap, --no-wrap
      Wrap long values at the given column
      
      Examples:
      --wrap (80 by default), --wrap=82
      
  --version, -v
      Show bibtex-tidy version.
      
  --quiet
      Suppress logs and warnings.
      
  --backup, --no-backup
      Make a backup <filename>.original. Enabled by default.
      
```

<a name="sec-api" />

## Javascript/Typescript API

```
npm install bibtex-tidy
```

```js
const tidy = require('bibtex-tidy');
const bibtex = fs.readFileSync('references.bib', 'utf8');
tidy.tidy(bibtex, { curly: true });
```

Documentation for the options can be found [here](https://github.com/FlamingTempura/bibtex-tidy/blob/master/src/__generated__/optionsType.ts)

## Docker

The web application can be deployed locally using the provided Docker configuration:

1. Build the Docker container: `docker build -t bibtex-tidy . -f docker/Dockerfile`
2. Start the docker container as a service: `cd docker && docker-compose up -d`
3. Visit the web application at http://localhost:8080 and do your BibTeX work
4. Stop the docker service, when you don't need it anymore: `cd docker && docker-compose down`

