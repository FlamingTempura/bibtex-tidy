import tidy from './index';
import { argv, versions, exit } from 'process';
import { parseArguments } from './cliUtils';
import { version } from './__generated__/version';
import { manPage } from './__generated__/manPage';
import { readFileSync, writeFileSync } from 'fs';

const nodeVer = Number(versions.node.split('.')[0]);

// Node v12 needed for Object.entries.
if (nodeVer < 12) {
	console.error(`bibtex-tidy requires Node.js v12.0.0 or later`);
	exit(1);
}

async function start(): Promise<void> {
	const {
		inputFiles,
		options,
		unknownArgs: unknownOptions,
	} = parseArguments(argv.slice(2));
	if (unknownOptions.length > 0) {
		console.error(
			`Unknown option${
				unknownOptions.length > 1 ? 's' : ''
			}: ${unknownOptions.join(', ')}`
		);
		console.error(`Try 'bibtex-tidy --help for more information.`);
		exit(1);
	}
	if (options.version) {
		console.log(`v${version}`);
		exit(0);
	}
	if (inputFiles.length === 0 || options.help) {
		console.log(manPage.join('\n'));
		exit(0);
	}
	if (options.quiet) {
		console.log = () => {};
		console.error = () => {};
	}
	console.log('Tidying...');
	for (const inputFile of inputFiles) {
		const isStdIO = inputFile === '-';
		const bibtex = isStdIO
			? await readStdin()
			: readFileSync(inputFile, 'utf8');
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
		if (options.backup && !isStdIO) {
			writeFileSync(`${inputFile}.original`, bibtex, 'utf8');
		}
		if (isStdIO) {
			process.stdout.write(result.bibtex);
		} else {
			writeFileSync(inputFile, result.bibtex, 'utf8');
		}
	}
}

async function readStdin(): Promise<string> {
	return new Promise<string>((resolve) => {
		let bibtex = '';
		process.stdin
			.on('data', (chunk) => (bibtex += chunk))
			.on('end', () => resolve(bibtex))
			.setEncoding('utf8');
	});
}

start();
