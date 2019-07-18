/* jshint esversion: 6 */
const tap = require('tap');
const bibtexTidy = require('..');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const unCamelCase = str => str.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);

const cli = (bibtex, options = {}) => {
	let args = [];
	for (let k of Object.keys(options)) {
		args.push('--' + unCamelCase(k));
		if (typeof options[k] === 'number') {
			args.push(options[k]);
		} else if (options[k] instanceof Array) {
			args.push(...options[k]);
		} else if (options[k] === false) {
			args[args.length - 1] = '--no-' + unCamelCase(k);
		}
	}

	fs.writeFileSync(__dirname + '/.tmp.bib', bibtex, 'utf8');

	args.unshift(__dirname + '/.tmp.bib');

	console.log('./bin/bibtex-tidy ' + args.join(' '));

	let proc = spawnSync(path.resolve(__dirname, '../bin/bibtex-tidy'), args),
		tidied = fs.readFileSync(__dirname + '/.tmp.bib', 'utf8'),
		warnings = (proc.stderr.toString() || '').split('\n')
			.filter(line => line.includes(': '))
			.map(line => {
				let [code, message] = line.split(': ');
				return { code, message };
			});
	fs.unlinkSync(__dirname + '/.tmp.bib');
	return { bibtex: tidied, warnings };
};

const test = (title, cb, { apiOnly } = {}) => {
	if (!apiOnly) { tap.test(`CLI: ${title}`, t => cb(t, cli)); }
	tap.test(`JS API: ${title}`, t => cb(t, bibtexTidy.tidy));
};

let files = fs.readdirSync(`${__dirname}/bibliographies`),
	bib = {};
for (let file of files) {
	if (!file.endsWith('.bib')) { continue; }
	bib[file.slice(0, -4)] = fs.readFileSync(`${__dirname}/bibliographies/${file}`, 'utf8');
}

test('defaults', (t, tidy) => {
	t.plan(1);
	let tidied = tidy(bib.input1);
	t.same(tidied.bibtex, bib.testdefaults);
});

test('indent with tabs', (t, tidy) => {
	t.plan(1);
	let tidied = tidy(bib.input1, { tab: true });
	t.same(tidied.bibtex, bib.testtabs);
});

test('indent with spaces', (t, tidy) => {
	t.plan(2);
	let tidied = tidy(bib.input1, { space: true });
	t.same(tidied.bibtex, bib.testspaces);
	tidied = tidy(bib.input1, { space: 4 });
	t.same(tidied.bibtex, bib.testspaces4);
});

test('omit properties', (t, tidy) => {
	t.plan(1);
	let tidied = tidy(bib.input1, { omit: ['title', 'pages'] });
	t.same(tidied.bibtex, bib.testomit);
});

test('enforce braced values', (t, tidy) => {
	t.plan(1);
	let tidied = tidy(bib.input1, { curly: true });
	t.same(tidied.bibtex, bib.testcurly);
});

test('enforce numeric values', (t, tidy) => {
	t.plan(1);
	let tidied = tidy(bib.input1, { numeric: true });
	t.same(tidied.bibtex, bib.testnumeric);
});

test('alignment', (t, tidy) => {
	t.plan(2);
	let tidied = tidy(bib.input1, { align: false });
	t.same(tidied.bibtex, bib.testnoalign);
	tidied = tidy(bib.input1, { align: 20 });
	t.same(tidied.bibtex, bib.testalign20);
});

test('sort properties', (t, tidy) => {
	t.plan(2);
	let tidied = tidy(bib.input1, { sortFields: true });
	t.same(tidied.bibtex, bib.testsortprops);
	tidied = tidy(bib.input1, { sortFields: ['year', 'author'] });
	t.same(tidied.bibtex, bib.testsortpropscustom);
});

test('strip double braces', (t, tidy) => {
	t.plan(1);
	let tidied = tidy(bib.input2, { stripEnclosingBraces: true });
	t.same(tidied.bibtex, bib.teststripbraces);
});

test('drop all caps', (t, tidy) => {
	t.plan(1);
	let tidied = tidy(bib.input2, { dropAllCaps: true });
	t.same(tidied.bibtex, bib.testdropcaps);
});

test('encode urls', (t, tidy) => {
	t.plan(1);
	let tidied = tidy(bib.input2, { encodeUrls: true });
	t.same(tidied.bibtex, bib.testencodeurl);
});

test('merge duplicates', (t, tidy) => {
	t.plan(2);
	let tidied = tidy(bib.input3, { merge: true });
	t.same(tidied.bibtex, bib.testmerge);
	t.same(tidied.warnings.filter(w => w.code === 'DUPLICATE_ENTRY').length, 3);
});

test('strip comments', (t, tidy) => {
	t.plan(1);
	let tidied = tidy(bib.input3, { stripComments: true });
	t.same(tidied.bibtex, bib.testnocomments);
});

test('untidy comments', (t, tidy) => {
	t.plan(1);
	let tidied = tidy(bib.input3, { tidyComments: false });
	t.same(tidied.bibtex, bib.testuntidycomments);
});

test('sort entries', (t, tidy) => {
	t.plan(3);
	let tidied = tidy(bib.input3, { sort: true });
	t.same(tidied.bibtex, bib.testsorted);
	tidied = tidy(bib.input5, { sort: ['type', 'title'] });
	t.same(tidied.bibtex, bib.testsorted1);
	tidied = tidy(bib.input5, { sort: ['year'] });
	t.same(tidied.bibtex, bib.testsorted2);
});

test('escaping', (t, tidy) => {
	t.plan(2);
	let tidied = tidy(bib.input4, { escape: true });
	t.same(tidied.bibtex, bib.testescape);
	tidied = tidy(bib.input4, { escape: false });
	t.same(tidied.bibtex, bib.testnoescape);
});

test('complex bib', (t, tidy) => {
	t.plan(1);
	let tidied = tidy(bib.input7);
	t.same(tidied.bibtex, bib.test7);
});

test('one line bib', (t, tidy) => {
	t.plan(1);
	let tidied = tidy(bib.input9);
	t.same(tidied.bibtex, bib.test9);
});

test('python-bibtexparser issues', (t, tidy) => {
	t.plan(3);
	let tidied = tidy(bib.input8); // @ in title - #124 (https://github.com/sciunto-org/python-bibtexparser/issues/124)
	t.same(tidied.bibtex, bib.test8);
	tidied = tidy(bib.input10); // leading commas - #48
	t.same(tidied.bibtex, bib.test10);
	tidied = tidy(bib.input11); // #86, #177 (multiline fields), #198 (ACM bibtex)
	t.same(tidied.bibtex, bib.test11);
});

test('duplicate ID warnings', (t, tidy) => {
	t.plan(2);
	let tidied = tidy(bib.input3, { escape: true }),
		warnings = [
			{
				entry: {
					itemtype: 'entry',
					key: 'Smith2009',
					type: 'inproceedings',
					enclosed: 'braces',
					fields: [
						{ name: 'author', raw: '"Caroline JA Smith"', value: 'Caroline JA Smith', datatype: 'quoted' },
						{ name: 'year', raw: '2009', value: 2009, datatype: 'number' },
						{ name: 'month', raw: 'dec', value: 'dec', datatype: 'identifier' },
						{ name: 'title', raw: '{{Quantum somethings}}', value: '{Quantum somethings}', datatype: 'braced' },
						{ name: 'journal', raw: '{Journal of {B}lah}', value: 'Journal of {B}lah', datatype: 'braced' }
					]
				},
				code: 'DUPLICATE_KEY',
				message: 'Smith2009 is a duplicate entry key.'
			}
		];
	delete tidied.warnings[0].entry.raw;
	t.same(tidied.warnings, warnings);
	tidied = tidy(bib.input1, { escape: false });
	t.same(tidied.warnings, []);
}, { apiOnly: true });

files = fs.readdirSync(`${__dirname}/bibliographies/valid`);
for (let bib of files) {
	if (!bib.endsWith('.bib')) { continue; }
	
	let bibtex = fs.readFileSync(`${__dirname}/bibliographies/valid/${bib}`, 'utf8');
	
	test(`valid bib: ${bib}`, (t, tidy) => {
		t.plan(1);
		let error;
		try {
			tidy(bibtex, {
				omit: Math.random > 0.5 ? ['author'] : null,
				escape: Math.random() > 0.5,
				curly: Math.random() > 0.5,
				numeric: Math.random() > 0.5,
				space: Math.random() > 0.5 ? 2 : 4,
				tab: Math.random() > 0.5,
				align: Math.random() > 0.5 ? 0 : 10,
				sort: Math.random() > 0.5,
				merge: Math.random() > 0.5,
				stripEnclosingBraces: Math.random() > 0.5,
				dropAllCaps: Math.random() > 0.5,
				sortFields: Math.random() > 0.5,
				stripComments: Math.random() > 0.5,
				encodeUrls: Math.random() > 0.5,
				tidyComments: Math.random() > 0.5
			});
		} catch (e) {
			error = e;
		}
		t.same(error, undefined);
	});
}
