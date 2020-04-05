const tap = require('tap');
const bibtexTidy = require('..');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync, spawn } = require('child_process');

const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'bibtex-tidy-'));
const TMP_FILE = path.join(TMP_DIR, 'tmp.bib');
const DIFFTOOL = process.env.DIFFTOOL || 'meld';

const unCamelCase = (str) =>
	str.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

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
		timeout: 100000,
		encoding: 'utf8',
	});
	if (proc.code > 0) {
		console.error(proc.stderr);
		throw new Error('CLI failed');
	}
	const tidied = fs.readFileSync(TMP_FILE, 'utf8');
	const warnings = (proc.stderr || '')
		.split('\n')
		.filter((line) => line.includes(': '))
		.map((line) => {
			let [code, message] = line.split(': ');
			return { code, message };
		});
	fs.unlinkSync(TMP_FILE);
	return { bibtex: tidied, warnings };
};

// Allows \ to be used and removes the empty line at the start
export const bibtex = (str) => String.raw(str).slice(1);

export const checkSame = (t, a, b, message = 'Incorrect output') => {
	if (a !== b) {
		launchDifftool(a, b, message);
	}
	t.same(a, b, message);
};

export const launchDifftool = (a, b, message) => {
	const ps = spawnSync('ps ax', { stdio: 'pipe', shell: true });
	if (ps.stdout.toString().includes(DIFFTOOL)) {
		console.log(`${DIFFTOOL} already running, not launching diff`);
		return;
	}
	console.log(`${message} :: Launching ${DIFFTOOL}...`);
	const now = Date.now();
	const tmpA = path.join(TMP_DIR, `output ${now}.bib`);
	const tmpB = path.join(TMP_DIR, `expected ${now}.bib`);
	fs.writeFileSync(tmpA, a);
	fs.writeFileSync(tmpB, b);
	try {
		spawn(DIFFTOOL, [tmpA, tmpB]);
	} catch (e) {
		console.error(`Failed to launch ${DIFFTOOL} diff tool`);
	}
};

export const test = (title, cb, { apiOnly } = {}) => {
	const stablecb = (t, tidy) => {
		cb(t, (input, args) => {
			const a = tidy(input, args);
			try {
				// Re-tidy output from tidy to check that output is stable
				const b = tidy(a.bibtex, args);
				checkSame(
					t,
					a.bibtex,
					b.bibtex,
					`Unstable output for ${JSON.stringify(args)}`
				);
				return a;
			} catch (e) {
				console.error(e);
				fs.writeFileSync('tmp.bib', a.bibtex);
				process.exit(1);
			}
		});
	};
	tap.test(`JS API: ${title}`, (t) => stablecb(t, bibtexTidy.tidy), {
		autoend: true,
	});
	if (!apiOnly) {
		tap.test(`CLI: ${title}`, (t) => stablecb(t, cli), {
			autoend: true,
		});
	}
};
