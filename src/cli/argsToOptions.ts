import { optionDefinitions } from '../optionDefinitions';
import type { CLIOptions } from '../optionUtils';
import { parseArguments } from './argsParser';

const cliOptions: Record<string, { option: keyof CLIOptions; value: unknown }> =
	{};

for (const opt of optionDefinitions) {
	for (const [cliArg, val] of Object.entries(opt.cli)) {
		cliOptions[cliArg] = { option: opt.key as keyof CLIOptions, value: val };
	}
}

/**
 * <input files> <options> <options> <input files>
 * @param skipInputArgs If the input is stdin, then we should assume that any filename at
 * the end of the command is part of an option, not an input. E.g. `bibtex-tidy --output
 * foo.bib` with stdin should be assumed to be outputting to foo.bib (otherwise foo.bib
 * would be assumed to be the input file)
 */
export function argsToOptions(
	argv: string,
	skipInputArgs?: boolean,
): {
	inputFiles: string[];
	options: CLIOptions;
	unknownArgs: string[];
} {
	const kvs = parseArguments(argv);

	const options: CLIOptions = {};
	const inputFiles: string[] = [];
	const unknownArgs: string[] = [];

	const last = kvs.at(-1);
	if (
		!kvs.some((kv) => kv.key === '') &&
		!skipInputArgs &&
		last &&
		last.values.length > 0
	) {
		kvs.push({ key: '', values: last.values });
		last.values = [];
	}

	for (const { key, values } of kvs) {
		if (key === '') {
			inputFiles.push(...values);
			continue;
		}

		const cliOption = cliOptions[key];
		if (!cliOption) {
			unknownArgs.push(key);
			continue;
		}

		if (typeof cliOption.value === 'function') {
			options[cliOption.option] = cliOption.value(values) as any;
		} else {
			options[cliOption.option] =
				cliOption.value as CLIOptions[typeof cliOption.option] as any;
		}
	}

	return { inputFiles, options, unknownArgs };
}
