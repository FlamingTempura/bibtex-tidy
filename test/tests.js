/* jshint esversion: 6 */
const tap = require('tap');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync, spawn } = require('child_process');
const bibtexTidy = require('..');

const unCamelCase = str => str.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);

const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'bibtex-tidy-'));
const TMP_FILE = path.join(TMP_DIR, 'tmp.bib');

const cli = (bibtex, options = {}) => {
	const inputFirst = Math.random() > 0.5; // <input> [options] rather than [options] <input>
	const useEquals = Math.random() > 0.5; // --sort=name,year rather than --sort name year

	const args = [];
	for (let k of Object.keys(options)) {
		let key = '--' + unCamelCase(k);
		const vals = [];

		if (typeof options[k] === 'number') {
			vals.push(options[k]);
		} else if (options[k] instanceof Array) {
			vals.push(...options[k]);
		} else if (options[k] === false) {
			key = '--no-' + unCamelCase(k);
		}
		if (useEquals) {
			args.push(key + (vals.length > 0 ? '=' + vals.join(',') : ''));
		} else {
			args.push(key, ...vals);
		}
	}

	fs.writeFileSync(TMP_FILE, bibtex, 'utf8');

	if (inputFirst) {
		args.unshift(TMP_FILE);
	} else {
		args.push(TMP_FILE);
	}

	console.log('./bin/bibtex-tidy ' + args.join(' '));

	const proc = spawnSync(path.resolve(__dirname, '../bin/bibtex-tidy'), args, {
		timeout: 100000
	});
	const tidied = fs.readFileSync(TMP_FILE, 'utf8');
	const warnings = (proc.stderr.toString() || '')
		.split('\n')
		.filter(line => line.includes(': '))
		.map(line => {
			let [code, message] = line.split(': ');
			return { code, message };
		});
	fs.unlinkSync(TMP_FILE);
	return { bibtex: tidied, warnings };
};

const test = (title, cb, { apiOnly } = {}) => {
	const tidyTool = (t, tidyTool) => {
		const tidy = (input, args) => {
			const a = tidyTool(input, args);
			try {
				const b = tidyTool(a.bibtex, args); // check that output is stable
				checkSame(t, a.bibtex, b.bibtex, 'Unstable output');
				return a;
			} catch (e) {
				console.error(e);
				fs.writeFileSync('tmp.bib', a.bibtex);
				process.exit(1);
			}
		};
		cb(t, tidy);
	};

	tap.test(`JS API: ${title}`, t => tidyTool(t, bibtexTidy.tidy), {
		autoend: true
	});
	if (!apiOnly) {
		tap.test(`CLI: ${title}`, t => tidyTool(t, cli), {
			autoend: true
		});
	}
};

const files = fs.readdirSync(`${__dirname}/bibliographies`);
const bib = {};
for (let file of files) {
	if (!file.endsWith('.bib')) {
		continue;
	}
	bib[file.slice(0, -4)] = fs.readFileSync(
		`${__dirname}/bibliographies/${file}`,
		'utf8'
	);
}

let diffOpened;
const checkSame = (t, a, b, message = 'Incorrect output') => {
	if (a !== b) {
		console.log(message + ' :: Launching diff...');
		const now = Date.now();
		const tmpA = path.join(TMP_DIR, `output ${now}.bib`);
		const tmpB = path.join(TMP_DIR, `expected ${now}.bib`);
		fs.writeFileSync(tmpA, a);
		fs.writeFileSync(tmpB, b);
		try {
			if (!diffOpened) spawn('meld', [tmpA, tmpB]);
			diffOpened = true;
		} catch (e) {
			console.error('Failed to launch Meld diff tool');
		}
	}
	t.same(a, b, message);
};

test('defaults', (t, tidy) => {
	const tidied = tidy(bib.input1);
	checkSame(t, tidied.bibtex, bib.testdefaults);
});

test('indent with tabs', (t, tidy) => {
	const tidied = tidy(bib.input1, { tab: true });
	checkSame(t, tidied.bibtex, bib.testtabs);
});

test('indent with default number of spaces', (t, tidy) => {
	const tidied = tidy(bib.input1, { space: true });
	checkSame(t, tidied.bibtex, bib.testspaces);
});

test('indent with 4 spaces', (t, tidy) => {
	const tidied = tidy(bib.input1, { space: 4 });
	checkSame(t, tidied.bibtex, bib.testspaces4);
});

test('omit properties', (t, tidy) => {
	const tidied = tidy(bib.input1, { omit: ['title', 'pages'] });
	checkSame(t, tidied.bibtex, bib.testomit);
});

test('enforce braced values', (t, tidy) => {
	const tidied = tidy(bib.input1, { curly: true });
	checkSame(t, tidied.bibtex, bib.testcurly);
});

test('enforce numeric values', (t, tidy) => {
	const tidied = tidy(bib.input1, { numeric: true });
	checkSame(t, tidied.bibtex, bib.testnumeric);
});

test('no alignment', (t, tidy) => {
	const tidied = tidy(bib.input1, { align: false });
	checkSame(t, tidied.bibtex, bib.testnoalign);
});

test('20 space alignment', (t, tidy) => {
	const tidied = tidy(bib.input1, { align: 20 });
	checkSame(t, tidied.bibtex, bib.testalign20);
});

test('sort properties in default order', (t, tidy) => {
	const tidied = tidy(bib.input1, { sortFields: true });
	checkSame(t, tidied.bibtex, bib.testsortprops);
});

test('sort properties in custom order', (t, tidy) => {
	const tidied = tidy(bib.input1, { sortFields: ['year', 'author'] });
	checkSame(t, tidied.bibtex, bib.testsortpropscustom);
});

test('strip double braces', (t, tidy) => {
	const tidied = tidy(bib.input2, { stripEnclosingBraces: true });
	checkSame(t, tidied.bibtex, bib.teststripbraces);
});

test('drop all caps', (t, tidy) => {
	const tidied = tidy(bib.input2, { dropAllCaps: true });
	checkSame(t, tidied.bibtex, bib.testdropcaps);
});

test('encode urls', (t, tidy) => {
	const tidied = tidy(bib.input2, { encodeUrls: true });
	checkSame(t, tidied.bibtex, bib.testencodeurl);
});

test('merge duplicates', (t, tidy) => {
	const tidied = tidy(bib.input3, { merge: true });
	const warnings = tidied.warnings.filter(w => w.code === 'DUPLICATE_ENTRY');
	checkSame(t, tidied.bibtex, bib.testmerge);
	checkSame(t, warnings.length, 3);
});

test('merge duplicates 2', (t, tidy) => {
	const tidied = tidy(bib.input12, {
		merge: true,
		tab: true,
		align: false,
		encodeUrls: false,
		escape: false
	});
	checkSame(t, tidied.bibtex, bib.testdupes);
	//checkSame(t, tidied.warnings, 0);
});

test('strip comments', (t, tidy) => {
	const tidied = tidy(bib.input3, { stripComments: true });
	checkSame(t, tidied.bibtex, bib.testnocomments);
});

test('untidy comments', (t, tidy) => {
	const tidied = tidy(bib.input3, { tidyComments: false });
	checkSame(t, tidied.bibtex, bib.testuntidycomments);
});

test('sort entries by default', (t, tidy) => {
	const tidied = tidy(bib.input3, { sort: true });
	checkSame(t, tidied.bibtex, bib.testsorted);
});

test('sort entries by single key', (t, tidy) => {
	const tidied = tidy(bib.input5, { sort: ['year'] });
	checkSame(t, tidied.bibtex, bib.testsorted2);
});

test('sort entries by multiple keys', (t, tidy) => {
	const tidied = tidy(bib.input5, { sort: ['type', 'title'] });
	checkSame(t, tidied.bibtex, bib.testsorted1);
});

test('sort entries in descending order', (t, tidy) => {
	const tidied = tidy(bib.input5, { sort: ['-year', 'type', 'title'] });
	checkSame(t, tidied.bibtex, bib.testsorted3);
});

test('escaping', (t, tidy) => {
	const tidied = tidy(bib.input4, { escape: true });
	checkSame(t, tidied.bibtex, bib.testescape);
});

test('no escaping', (t, tidy) => {
	const tidied = tidy(bib.input4, { escape: false });
	checkSame(t, tidied.bibtex, bib.testnoescape);
});

test('complex bib', (t, tidy) => {
	const tidied = tidy(bib.input7);
	checkSame(t, tidied.bibtex, bib.test7);
});

test('one line bib', (t, tidy) => {
	const tidied = tidy(bib.input9);
	checkSame(t, tidied.bibtex, bib.test9);
});

test('@ in title', (t, tidy) => {
	const tidied = tidy(bib.input8); // @ in title - #124 (https://github.com/sciunto-org/python-bibtexparser/issues/124)
	checkSame(t, tidied.bibtex, bib.test8);
});

test('leading commas', (t, tidy) => {
	const tidied = tidy(bib.input10); // leading commas - #48
	checkSame(t, tidied.bibtex, bib.test10);
});

test('multiline fields', (t, tidy) => {
	const tidied = tidy(bib.input11); // #86, #177 (multiline fields), #198 (ACM bibtex)
	checkSame(t, tidied.bibtex, bib.test11);
});

test(
	'duplicate ID warnings',
	(t, tidy) => {
		const tidied = tidy(bib.input3, { escape: true }),
			warnings = [
				{
					entry: {
						itemtype: 'entry',
						key: 'Smith2009',
						type: 'inproceedings',
						enclosed: 'braces',
						fields: [
							{
								name: 'author',
								raw: '"Caroline JA Smith"',
								value: 'Caroline JA Smith',
								datatype: 'quoted'
							},
							{ name: 'year', raw: '2009', value: 2009, datatype: 'number' },
							{
								name: 'month',
								raw: 'dec',
								value: 'dec',
								datatype: 'identifier'
							},
							{
								name: 'title',
								raw: '{{Quantum somethings}}',
								value: '{Quantum somethings}',
								datatype: 'braced'
							},
							{
								name: 'journal',
								raw: '{Journal of {B}lah}',
								value: 'Journal of {B}lah',
								datatype: 'braced'
							}
						]
					},
					code: 'DUPLICATE_KEY',
					message: 'Smith2009 is a duplicate entry key.'
				}
			];
		delete tidied.warnings[0].entry.raw;
		t.same(tidied.warnings, warnings);
	},
	{ apiOnly: true }
);

test(
	'duplicate ID warnings (no duplicates)',
	(t, tidy) => {
		const tidied = tidy(bib.input1, { escape: false });
		t.same(tidied.warnings, []);
	},
	{ apiOnly: true }
);

const validfiles = fs.readdirSync(`${__dirname}/bibliographies/valid`);
for (let bib of validfiles) {
	if (!bib.endsWith('.bib')) {
		continue;
	}

	const bibtex = fs.readFileSync(
		`${__dirname}/bibliographies/valid/${bib}`,
		'utf8'
	);

	test(`valid bib: ${bib}`, (t, tidy) => {
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

