import tidy from './index';
import { readFileSync, writeFileSync } from 'fs';
import process from 'process';
import { parseArguments } from './cliUtils';
import { version } from './__generated__/version';
import { manPage } from './__generated__/manPage';

function start(): void {
	const { inputFiles, options, unknownArgs: unknownOptions } = parseArguments(
		process.argv.slice(2)
	);
	if (unknownOptions.length > 0) {
		console.error(
			`Unknown option${
				unknownOptions.length > 1 ? 's' : ''
			}: ${unknownOptions.join(', ')}`
		);
		console.error(`Try 'bibtex-tidy --help for more information.`);
		process.exit(1);
	}
	if (options.version) {
		console.log(`v${version}`);
		process.exit(0);
	}
	if (inputFiles.length === 0 || options.help) {
		console.log(manPage.join('\n'));
		process.exit(0);
	}
	if (options.quiet) {
		console.log = () => {};
		console.error = () => {};
	}
	console.log('Tidying...');
	for (const inputFile of inputFiles) {
		const bibtex = readFileSync(inputFile, 'utf8');
		console.log(bibtex);
		const result = tidy.tidy(bibtex, options);
		for (const warning of result.warnings) {
			console.error(`${warning.code}: ${warning.message}`);
		}
		console.log(`Done. Successfully tidied ${result.count} entries.`);
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
