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
  --version    Show version number
  --omit       Properties to remove (eg. abstract keywords)
  --sort       Sort entries alphabetically by id
  --curly      Enclose property values in curly brackets
  --numeric    Don't enclose numeric/month values
  --space      Indent using n spaces (default: 2)
  --tab        Indent using tabs
  --merge      Merge duplicates
  --metadata   Generate metadata for each entry
  --citations  In metadata, count citations within tex files in this directory
  --stats      Print statistics about entries
  --help       Show help
```

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