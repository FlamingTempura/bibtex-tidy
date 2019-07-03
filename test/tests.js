/* jshint esversion: 6 */
const { test } = require('tap');
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

	let {stdout, stderr, error } = spawnSync(path.resolve(__dirname, '../bin/bibtex-tidy'), args, { stdio: 'inherit' });

	if (stdout) { console.log(stdout); }
	if (stderr) { console.error(stderr); }
	if (error) { console.error(error); }

	return {
		bibtex: fs.readFileSync(__dirname + '/.tmp.bib', 'utf8')
	};
};

let usecases = [['lib', bibtexTidy.tidy], ['cli', cli]];

for (let [usecase, tidy] of usecases) {
	test(`${usecase} curly, numeric, merge, sort, and omit`, t => {
		t.plan(1);

		const options = {
			curly: true,
			numeric: true,
			merge: true,
			sort: true,
			sortProperties: true,
			omit: ['weird-key']
		};

		let bib = fs.readFileSync(path.join(__dirname, '../example/input.bib'), 'utf8'),
			expected = fs.readFileSync(path.join(__dirname, 'expected-output1.bib'), 'utf8'),
			tidied = tidy(bib, options);

		t.same(tidied.bibtex, expected);
	});

	test(`${usecase} tabs, no sort, custom alignment`, t => {
		t.plan(1);

		const options = {
			tab: true,
			merge: false,
			numeric: false,
			sortProperties: true,
			align: 20
		};

		let bib = fs.readFileSync(path.join(__dirname, '../example/input.bib'), 'utf8'),
			expected = fs.readFileSync(path.join(__dirname, 'expected-output2.bib'), 'utf8'),
			tidied = tidy(bib, options);

		t.same(tidied.bibtex, expected);
	});

	test(`${usecase} strings, unusual comments, preambles, no alignment`, t => {
		t.plan(1);

		const options = {
			align: false
		};

		let bib = fs.readFileSync(path.join(__dirname, 'input2.bib'), 'utf8'),
			expected = fs.readFileSync(path.join(__dirname, 'expected-output3.bib'), 'utf8'),
			tidied = tidy(bib, options);

		t.same(tidied.bibtex, expected);

	});

	test(`${usecase} escape characters`, t => {
		t.plan(2);

		let bibtex = `@article{a,
  booktitle     = {bl%ah},
  title         = {bl@ah},
  author        = {bl&ah},
  thing         = {blæh},
  thinga        = {bl\\@h}
}`;

		let bibtexClean = `@article{a,
  booktitle     = {bl\\%ah},
  title         = {bl\\@ah},
  author        = {bl\\&ah},
  thing         = {bl\\ae{}h},
  thinga        = {bl\\@h}
}
`;

		t.same(tidy(bibtex).bibtex, bibtexClean);
		t.same(tidy(bibtex, { escape: false }).bibtex, bibtex + '\n');
	});

	test(`${usecase} strip enclosing nested brace`, t => {
		t.plan(2);

		let bibtex = `@article{a,
  booktitle     = {{blah}},
  journal     = {not {blah}},
  month = {{nov}},
  thing = {BLAH BLAH 1990}
}`;

		let bibtexClean = `@article{a,
  booktitle     = {blah},
  journal       = {not {blah}},
  month         = nov,
  thing         = {Blah Blah 1990}
}
`;
		const options = {
			stripEnclosingBraces: true,
			dropAllCaps: true,
			numeric: true
		};

		bibtex = tidy(bibtex, options).bibtex;
		t.same(bibtex, bibtexClean);
		bibtex = tidy(bibtex, options).bibtex; // run again to check not re-escaping things
		t.same(bibtex, bibtexClean);
	});

	test(`${usecase} invalid month`, t => {
		t.plan(1);

		let bibtex = `@article{a,
	  month = {nov 12}
	}
	@article{a,
	  month = {enero}
	}`;

		let bibtexClean = `@article{a,
  month         = nov
}
@article{a,
  month         = {enero}
}
`;

		t.same(tidy(bibtex, { numeric: true }).bibtex, bibtexClean);
	});

	test(`${usecase} sort by type`, t => {
		t.plan(1);

		let bibtex = `
			@misc{a,year=1}
			@article{c,year=1}
			@book{d,year=1}
			@article{b,year=1}`;

		let bibtexClean = `@article{b,
  year          = 1
}
@article{c,
  year          = 1
}
@book{d,
  year          = 1
}
@misc{a,
  year          = 1
}
`;
		t.same(tidy(bibtex, { sort: ['type', 'id'] }).bibtex, bibtexClean);
	});

	test(`${usecase} result should be stable (re-tidying result should not yield any changes)`, t => {
		t.plan(2);

		const options = {
			tab: true,
			metadata: true,
			merge: false,
			numeric: false,
			sortProperties: true,
			omit: false,
			align: 20
		};

		let bib = fs.readFileSync(path.join(__dirname, '../example/input.bib'), 'utf8'),
			expected = fs.readFileSync(path.join(__dirname, 'expected-output2.bib'), 'utf8'),
			tidied = tidy(bib, options),
			tidied2 = tidy(tidied.bibtex, options);

		t.same(tidied.bibtex, expected);
		t.same(tidied2.bibtex, expected);
	});

	test(`${usecase} strip comments`, t => {
		t.plan(1);

		let bibtex = `
		boo!
			@misc{a,year=1}
			@article{c,year=1}
			$ye
			@book{d,year=1}
			@comment{huh?}
			fds
			@article{b,year=1}`;

		let bibtexClean = `@misc{a,
  year          = 1
}
@article{c,
  year          = 1
}
@book{d,
  year          = 1
}
@article{b,
  year          = 1
}
`;
		t.same(tidy(bibtex, { stripComments: true }).bibtex, bibtexClean);
	});


	test(`${usecase} sort by title`, t => {
		t.plan(1);

		let bibtex = `
			@misc		{a,title="something"}
			@article	{c,title={FOO!}}
			@book 		{d,title={bar}}
			@article	{b,title={123}}
			@article	{e,author={aaa}}`;

		let bibtexClean = `@article{b,
  title         = {123}
}
@book{d,
  title         = {bar}
}
@article{c,
  title         = {FOO!}
}
@misc{a,
  title         = {something}
}
@article{e,
  author        = {aaa}
}
`;
		t.same(tidy(bibtex, { sort: ['title'], curly: true }).bibtex, bibtexClean);
	});

}