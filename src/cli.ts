import tidy from './index';
import { readFileSync, writeFileSync } from 'fs';
import process from 'process';
import { splitLines, fromCamelCase } from './utils';
import { optionDefinitions } from './optionDefinitions';
import { parseArguments } from './cliUtils';

const BREAK_LINE = 84;
const LEFT_MARGIN = 27;

function printHelp(): void {
	console.log(`Usage: bibtex-tidy [OPTION]... FILE.BIB`);
	console.log('BibTeX Tidy - cleaner and formatter for BibTeX files.\n');
	console.log('Options:');
	for (const opt of optionDefinitions) {
		if (opt.deprecated) continue;

		const description = [opt.title];
		if (opt.description) {
			description[0] += ' - ' + opt.description[0];
			description.push(...opt.description.slice(1));
		}
		const lines = description.flatMap((line) =>
			splitLines(line, BREAK_LINE - LEFT_MARGIN)
		);
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
				// } else if (i === 1 && opt.default === true) {
				// 	prefix = `  --no-${opt.key}`.padEnd(LEFT_MARGIN, ' ');
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
}

function start(): void {
	const { inputFiles, options } = parseArguments(process.argv.slice(2));
	if (inputFiles.length === 0 || options.help) {
		printHelp();
		process.exit(0);
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
