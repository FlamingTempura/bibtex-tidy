import { optionDocs } from './documentation';
import tidy from './index';
import { readFileSync, writeFileSync } from 'fs';
import process from 'process';
import { CLIOptions, MergeStrategy, UniqueKey } from './options';

type Arguments = {
	inputFiles: string[];
	options: CLIOptions;
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

const fromCamelCase = (str: string): string => {
	return str.replace(/[A-Z]/g, (c: string) => {
		return '-' + c.toLowerCase();
	});
};

const printHelp = (): void => {
	console.log(`Usage: bibtex-tidy [OPTION]... FILE.BIB`);
	console.log('BibTeX Tidy - cleaner and formatter for BibTeX files.\n');
	console.log('Options:');
	for (const opt of optionDocs) {
		if (opt.deprecated) continue;
		const lines = opt.description
			.split('\n')
			.flatMap((line) => splitLines(line, BREAK_LINE - LEFT_MARGIN));
		if (opt.examples && opt.examples.length > 0) {
			const margin = BREAK_LINE - LEFT_MARGIN;
			lines.push(
				'Examples:',
				...opt.examples
					.filter((example) => example)
					.flatMap((example) => splitLines(example, margin))
			);
		}
		for (let i = 0; i < lines.length; i++) {
			let prefix = '';
			if (i === 0) {
				let keyval = fromCamelCase(opt.key);
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

function parseArguments(): Arguments {
	const options: CLIOptions = {
		// By default make a backup
		backup: true,
	};
	let help: boolean = false;
	const args: string[] = process.argv.slice(2);
	const inputFiles: string[] = [];

	const nextNumber = (): number | undefined => {
		if (args.length === 1 && inputFiles.length === 0) return; // do not consume the input argument
		if (!args[0] || args[0].startsWith('--')) return;
		return Number(args.shift());
	};
	const nextString = (): string | undefined => {
		if (args.length === 1 && inputFiles.length === 0) return; // do not consume the input argument
		if (!args[0] || args[0].startsWith('--')) return;
		return args.shift()!;
	};

	const nextList = (): string[] | undefined => {
		if (args.length === 1 && inputFiles.length === 0) return; // do not consume the input argument
		if (!args[0] || args[0].startsWith('--')) return;
		return [args.shift()!, ...(nextList() || [])];
	};

	while (args.length > 0) {
		const arg = args.shift()!;
		const argName: string = arg.split('=')[0];
		const valStr: string | undefined = arg.split('=')[1] || undefined;

		switch (argName) {
			case '--help':
			case '-h':
				help = true;
				break;
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
			case '--duplicates':
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
					options.duplicates = (valStr || uniqs) as UniqueKey[];
				}
				break;
			case '--no-merge':
				options.merge = false;
				break;
			case '--merge':
				const uniq = valStr || nextString();
				if (!uniq) {
					options.merge = true;
				} else {
					if (
						uniq !== 'first' &&
						uniq !== 'last' &&
						uniq !== 'combine' &&
						uniq !== 'overwrite'
					) {
						console.error(`Invalid merge strategy: "${uniq}"`);
						process.exit(1);
					}
					options.merge = (valStr || uniq) as MergeStrategy;
				}
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
			case '--trailing-commas':
				options.trailingCommas = true;
				break;
			case '--remove-empty-fields':
				options.removeEmptyFields = true;
				break;
			case '--no-lowercase':
				options.lowercase = false;
				break;
			case '--backup':
				options.backup = true;
				break;
			case '--no-backup':
				options.backup = false;
				break;
			case '--quiet':
				options.quiet = true;
				break;
			default:
				if (argName.startsWith('--')) {
					console.error(`No option "${argName}"`);
					process.exit(1);
				}
				inputFiles.push(arg);
		}
	}
	return { inputFiles, options, help };
}

function start(): void {
	const { inputFiles, options, help } = parseArguments();
	if (inputFiles.length === 0 || help) {
		printHelp();
		process.exit(1);
	}
	if (options.quiet) {
		console.log = () => {};
		console.error = () => {};
	}
	console.log('Tidying...');
	for (const inputFile of inputFiles) {
		const bibtex = readFileSync(inputFile, 'utf8');
		const result = tidy.tidy(bibtex, options);
		for (const warning of result.warnings) {
			console.error(`${warning.code}: ${warning.message}`);
		}
		console.log(`Done. Successfully tidied ${result.entries.length} entries.`);
		if (options.merge) {
			const dupes = result.warnings.filter((w) => w.code === 'DUPLICATE_ENTRY');
			console.log(`${dupes.length} entries merged`);
		}
		if (options.backup) {
			writeFileSync(`${inputFile}.original`, bibtex, 'utf8');
		}
		writeFileSync(inputFile, result.bibtex, 'utf8');
	}
}

start();
