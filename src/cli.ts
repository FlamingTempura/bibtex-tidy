import OPTIONS from 'DOCS';
import tidy from './index';
import fs from 'fs';
import process from 'process';

type Arguments = {
	input: string | undefined;
	options: Options;
	help: boolean;
};

const BREAK_LINE = 84;
const LEFT_MARGIN = 27;

const splitLines = (line: string, limit: number): string[] => {
	const words = line.split(' ');
	const lines = [''];
	for (const word of words) {
		if (lines[lines.length - 1].length + word.length + 1 > limit)
			lines.push('');
		lines[lines.length - 1] += word + ' ';
	}
	return lines;
};

const printHelp = (): void => {
	console.log(`Usage: bibtex-tidy [OPTION]... FILE.BIB`);
	console.log('BibTeX Tidy - cleaner and formatter for BibTeX files.');
	console.log('Options:');
	console.log('  --help'.padEnd(LEFT_MARGIN, ' ') + 'Show help');
	for (const opt of OPTIONS) {
		const lines = splitLines(`${opt.description}`, BREAK_LINE - LEFT_MARGIN);
		if (opt.examples && opt.examples.length > 0) {
			const margin = BREAK_LINE - LEFT_MARGIN;
			const examples = opt.examples.join(' ');
			lines.push(...splitLines(`Examples: ${examples}`, margin));
		}
		for (let i = 0; i < lines.length; i++) {
			let prefix = '';
			if (i === 0) {
				let keyval = opt.key;
				if (opt.type === 'array') keyval += '=x,y,z';
				if (opt.type === 'number') keyval += '=NUMBER';
				prefix = `  --${keyval}`.padEnd(LEFT_MARGIN, ' ');
			} else if (i === 1 && opt.default === true) {
				prefix = `  --no-${opt.key}`.padEnd(LEFT_MARGIN, ' ');
			} else {
				prefix = ' '.repeat(LEFT_MARGIN);
			}
			console.log(prefix + (lines[i] || ''));
		}
		console.log('');
	}
	console.log(
		'Full documentation <https://github.com/FlamingTempura/bibtex-tidy>'
	);
};

const parseArguments = (): Arguments => {
	const options: Options = {};
	const help = process.argv.includes('--help') || process.argv.includes('-h');
	const args: string[] = process.argv.slice(2);
	let input: string | undefined;

	const nextNumber = (): number | undefined => {
		if (args.length === 1 && !input) return; // do not consume the input argument
		if (!args[0] || args[0].startsWith('--')) return;
		return Number(args.shift());
	};

	const nextList = (): string[] | undefined => {
		if (args.length === 1 && !input) return; // do not consume the input argument
		if (!args[0] || args[0].startsWith('--')) return;
		return [args.shift()!, ...(nextList() || [])];
	};

	while (args.length > 0) {
		const arg = args.shift()!;
		const argName: string = arg.split('=')[0];
		const valStr: string | undefined = arg.split('=')[1] || undefined;

		switch (argName) {
			case '--omit':
				const omit = valStr?.split(',') || nextList();
				if (!omit) {
					console.error(`Expected a omit list`);
					process.exit(1);
				}
				options.omit = omit;
				break;
			case '--curly':
				options.curly = true;
				break;
			case '--no-curly':
				options.curly = false;
				break;
			case '--numeric':
				options.numeric = true;
				break;
			case '--no-numeric':
				options.numeric = true;
				break;
			case '--space':
				options.space = valStr ? Number(valStr) : nextNumber();
				break;
			case '--tab':
				options.tab = true;
				break;
			case '--no-tab':
				options.tab = false;
				break;
			case '--align':
				options.align = valStr ? Number(valStr) : nextNumber();
				break;
			case '--no-align':
				options.align = false;
				break;
			case '--sort':
				options.sort = valStr ? valStr.split(',') : nextList() || true;
				break;
			case '--no-sort':
				options.sort = false;
				break;
			case '--merge':
				const uniqs = valStr?.split(',') || nextList();
				if (!uniqs) {
					options.merge = true;
				} else {
					for (const i of uniqs) {
						if (
							i !== 'doi' &&
							i !== 'key' &&
							i !== 'abstract' &&
							i !== 'citation'
						) {
							console.error(`Invalid key for merge option: "${i}"`);
							process.exit(1);
						}
					}
					options.merge = (valStr || uniqs) as UniqueKey[];
				}
				break;
			case '--no-merge':
				options.merge = false;
				break;
			case '--merge-strategy':
				const list = valStr?.split(',') || nextList();
				if (!list) {
					console.error(`Expected a merge strategy`);
					process.exit(1);
				}
				for (const i of list) {
					if (
						i !== 'first' &&
						i !== 'last' &&
						i !== 'combine' &&
						i !== 'overwrite'
					) {
						console.error(`Invalid merge strategy: "${i}"`);
						process.exit(1);
					}
				}
				options.mergeStrategy = (valStr || list) as MergeStrategy;
				break;
			case '--strip-enclosing-braces':
				options.stripEnclosingBraces = true;
				break;
			case '--no-strip-enclosing-braces':
				options.stripEnclosingBraces = true;
				break;
			case '--drop-all-caps':
				options.dropAllCaps = true;
				break;
			case '--no-drop-all-caps':
				options.dropAllCaps = false;
				break;
			case '--escape':
				options.escape = true;
				break;
			case '--no-escape':
				options.escape = false;
				break;
			case '--sort-fields':
				options.sortFields = valStr ? valStr.split(',') : nextList() || true;
				break;
			case '--no-sort-fields':
				options.sortFields = false;
				break;
			case '--strip-comments':
				options.stripComments = true;
				break;
			case '--no-strip-comments':
				options.stripComments = false;
				break;
			case '--encode-urls':
				options.encodeUrls = true;
				break;
			case '--no-encode-urls':
				options.encodeUrls = false;
				break;
			case '--tidy-comments':
				options.tidyComments = true;
				break;
			case '--no-tidy-comments':
				options.tidyComments = false;
				break;
			default:
				if (argName.startsWith('--')) {
					console.error(`No option "${argName}"`);
					process.exit(1);
				}
				if (input) {
					console.error(`Too many arguments`);
					process.exit(1);
				}
				input = arg;
		}
	}
	return { input, options, help };
};

const run = (): void => {
	const { input, options, help } = parseArguments();
	if (!input || help) {
		printHelp();
		process.exit(1);
	}
	console.log('Tidying...');
	const bibtex = fs.readFileSync(input, 'utf8');
	const result = tidy.tidy(bibtex, options);
	for (let warning of result.warnings) {
		console.error(warning.code + ': ' + warning.message);
	}
	console.log(`Done. Successfully tidied ${result.entries.length} entries.`);
	if (options.merge) {
		const dupes = result.warnings.filter((w) => w.code === 'DUPLICATE_ENTRY');
		console.log(`${dupes.length} entries merged`);
	}
	fs.writeFileSync(`${input}.original`, bibtex, 'utf8');
	fs.writeFileSync(input, result.bibtex, 'utf8');
};

run();
