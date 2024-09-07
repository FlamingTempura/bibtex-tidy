import assert from "node:assert";
import { promises as fsp } from "node:fs"; // fs/promises not supported in node v12
import { argv, exit, versions } from "node:process";
import { manPage } from "../__generated__/manPage";
import type { BibTeXTidyOptions } from "../__generated__/optionsType";
import { version } from "../__generated__/version";
import { type BibTeXTidyResult, tidy } from "../index";
import { argsToOptions } from "./argsToOptions";

const { readFile, writeFile, copyFile } = fsp;

const nodeVer = Number(versions.node.split(".")[0]);

// Node v12 needed for Object.entries.
if (nodeVer < 12) {
	console.error("bibtex-tidy requires Node.js v12.0.0 or later");
	exit(1);
}

async function start(): Promise<void> {
	// process.stdin.isTTY seems to be true only if no input is piped to stdin. HACK - false
	// positive with pre-commit script.
	const hasStdin = !process.stdin.isTTY && process.env.PRE_COMMIT !== "1";

	const { inputFiles, options, unknownArgs } = argsToOptions(
		argv.slice(2),
		hasStdin,
	);

	if (unknownArgs.length > 0) {
		const plural = unknownArgs.length > 1 ? "s" : "";
		console.error(`Unknown option${plural}: ${unknownArgs.join(", ")}`);
		console.error(`Try 'bibtex-tidy --help for more information.`);
		exit(1);
	}

	if (options.version) {
		console.log(`v${version}`);
		exit(0);
	}

	if (options.help || (inputFiles.length === 0 && !hasStdin)) {
		console.log(manPage.join("\n"));
		exit(0);
	}

	const deprecatedStdInFlag = inputFiles.includes("-");

	const outputToStdout = !options.outputPath && !options.modify;

	if (options.quiet || outputToStdout) {
		setSilent(true);
	}

	if (inputFiles.length === 0) {
		await tidyStdIn(options);
	} else if (deprecatedStdInFlag) {
		console.error(
			'Interpreting "-" as stdin. NOTICE: as of v1.10.0 "-" can be omitted and will be invalid in v2. Stdin is read when no input file is specified.',
		);

		if (inputFiles.length > 1) {
			console.error('Input files cannot be specified with "-"');
			process.exit(1);
		}

		await tidyStdIn(options);
	} else {
		await tidyInputFiles(inputFiles, options);
	}
}

async function tidyStdIn(options: BibTeXTidyOptions) {
	if (options.modify) {
		console.error("--modify/-m is only valid when specifying input files");
		process.exit(1);
	}

	if (options.backup) {
		console.error("--backup is only valid when specifying input files");
		process.exit(1);
	}

	console.log("Tidying...");
	const result = tidy(await readStdin(), options);

	if (options.outputPath) {
		await tidyToOutputFile(result, options.outputPath, options);
	} else {
		tidyToStdout(result);
	}
}

async function tidyInputFiles(
	inputFiles: string[],
	options: BibTeXTidyOptions,
) {
	const usingDeprecatedStdio =
		!options.v2 && !options.outputPath && !options.modify;

	if (usingDeprecatedStdio) {
		console.warn(
			"NOTICE: In v2 you will need to specify --modify/-m to modify the input file.",
		);
		options.modify = true;
		options.backup = options.backup ?? true;
		setSilent(false);
	}

	if (options.modify) {
		if (options.outputPath) {
			console.error("--modify/-m is not valid when specifying an output file");
			process.exit(1);
		}

		console.log("Tidying...");
		for (const inputFile of inputFiles) {
			const result = tidy(await readFile(inputFile, "utf8"), options);
			await tidyToOutputFile(result, inputFile, options);
		}
	} else if (inputFiles.length > 1) {
		console.error("Only one input file permitted unless using --modify/-m");
		process.exit(1);
	} else {
		if (options.backup) {
			console.error("--backup is only permitted when --modify/-m is provided");
			process.exit(1);
		}

		console.log("Tidying...");
		assert(inputFiles[0]);
		const result = tidy(await readFile(inputFiles[0], "utf8"), options);

		if (options.outputPath) {
			await tidyToOutputFile(result, options.outputPath, options);
		} else {
			tidyToStdout(result);
		}
	}
}

function tidyToStdout(result: BibTeXTidyResult) {
	process.stdout.write(result.bibtex);
}

async function tidyToOutputFile(
	result: BibTeXTidyResult,
	path: string,
	options: BibTeXTidyOptions,
) {
	if (options.backup) {
		await copyFile(path, `${path}.original`);
	}

	await writeFile(path, result.bibtex, "utf8");

	const log: string[] = [];

	for (const warning of result.warnings) {
		log.push(`${warning.code}: ${warning.message}`);
	}

	log.push(`Done. Successfully tidied ${result.count} entries.`);

	if (options.merge) {
		const dupes = result.warnings.filter((w) => w.code === "DUPLICATE_ENTRY");
		log.push(`${dupes.length} entries merged`);
	}
	if (!options.quiet) {
		process.stdout.write(`${log.join("\n")}\n`);
	}
}

async function readStdin(): Promise<string> {
	return new Promise<string>((resolve) => {
		let bibtex = "";
		process.stdin
			.on("data", (chunk) => {
				bibtex += chunk;
			})
			.on("end", () => resolve(bibtex))
			.setEncoding("utf8");
	});
}

const origLog = console.log;
function setSilent(silent: boolean) {
	console.log = silent ? () => undefined : origLog;
}

start();
