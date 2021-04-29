import tidy from './index';
import { readFileSync, writeFileSync } from 'fs';
import process from 'process';
import { wrapText } from './utils';
import { optionDefinitions } from './optionDefinitions';
import { parseArguments } from './cliUtils';

const LINE_WIDTH = 84;
const LEFT_COLUMN_WIDTH = 27;

function printHelp(): void {
	console.log(`Usage: bibtex-tidy [OPTION]... FILE.BIB`);
	console.log('BibTeX Tidy - cleaner and formatter for BibTeX files.\n');
	console.log('Options:');

	for (const opt of optionDefinitions) {
		if (opt.deprecated) continue;

		const leftColumn: string[] = Object.keys(opt.cli).map((arg) => `  ${arg} `);

		const desc = [opt.title];
		if (opt.description) {
			desc[0] += '. ' + opt.description[0];
			desc.push(...opt.description.slice(1));
		}
		if (opt.examples && opt.examples.length > 0) {
			desc.push('Examples:', ...opt.examples.filter((example) => example));
		}

		const rightColumn = desc.flatMap((line) =>
			wrapText(line, LINE_WIDTH - LEFT_COLUMN_WIDTH)
		);

		for (let i = 0; i < Math.max(rightColumn.length, leftColumn.length); i++) {
			console.log(
				(leftColumn[i] ?? '').padEnd(LEFT_COLUMN_WIDTH) + (rightColumn[i] ?? '')
			);
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
