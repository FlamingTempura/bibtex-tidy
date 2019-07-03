## bibtex-tidy

Tidy bibtex files. [Try it out](https://flamingtempura.github.io/bibtex-tidy/).

```sh
npm install -g bibtex-tidy
bibtex-tidy references.bib
```

### Example

Before:
```latex
@ARTICLE {feinberg1983technique,
  title={A technique for radiolabeling DNA restriction endonuclease fragments to high specific activity},
author="Feinberg, Andrew P and Vogelstein, Bert",
  journal    = {Analytical biochemistry},
  volume = 132,
  number={1},
  pages={6--13},
  year={1983},
  publisher={Elsevier},}
@article{miles1984qualitative,
    title={Qualitative data analysis: A sourcebook},
    author={Miles, Matthew B and Huberman, A Michael and Saldana, J},
    journal={Beverly Hills},
    year={1984} 
}
```

After `bibtex-tidy references.bib --curly --numeric`:
```latex
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

### Options
```
Usage: bibtex-tidy <file.bib> [options]

Options:
  --omit                    Provide a list of properties which should be removed from every bibliography entry.
  --curly                   Setting this to true will cause all property values to be enclosed in braces. Quoted values will be converted to braces.
  --numeric                 Setting this to true will strip quotes and braces from numeric/month values. For example, {1998} will become 1998.
  --space                   Providing a number causes all properties to be prefixed with the corresponding number of spaces. This is ignored if tab is true.
  --tab                     If this is set then all properties will be prefixed with a tab.
  --align                   Insert whitespace between properties and values so that values are visually aligned.
  --sort                    Sort entries alphabetically by id (or other provided properties).
  --merge                   Two entries are considered duplicates in the following cases: (a) their DOIs are identical, (b) their abstracts are identical, or (c) their authors and titles are both identical. The firstmost entry is kept and any extra properties from duplicate entries are incorporated.
  --strip-enclosing-braces  Where an entire value is enclosed in double braces, remove the extra braces. For example, convert {{Journal of Tea}} to {Journal of Tea}.
  --drop-all-caps           Where values are all caps, make them title case. For example, convert {JOURNAL OF TEA} to {Journal of Tea}.
  --escape                  Escape special characters, such as umlaut. This ensures correct typesetting with latex.
  --sort-properties         Sort the properties within entries. The default sort order is title, shorttitle, author, year, month, day, journal, booktitle, location, on, publisher, address, series, volume, number, pages, doi, isbn, issn, url, urldate, copyright, category, note, metadata. Alternatively you can specify space delimited properties.
  --strip-comments          Remove all comments from the bibtex source.
```

#### Merging duplicates

Using --merge will cause bibtex-tidy to merge any entries which share the same DOI, have identical abstracts, or have identical authors and title.

### Programmatic usage

```
npm install bibtex-tidy
```
```js
const tidy = require('bibtex-tidy');
const bibtex = fs.readFileSync('references.bib', 'utf8');
tidy.tidy(bibtex, { curly: true }); // options are identical to command line usage
```

### Browser

```html
<script src="https://unpkg.com/bibtex-tidy"></script>
<script>
var bibtex = document.getElementById('input').value;
var result = bibtexTidy.tidy(bibtex);
console.log(result.bibtex); // the tidied bibtex
```

Also available on bower
```sh
bower install bibtex-tidy
```
