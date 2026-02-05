import { optionDefinitions } from "../optionDefinitions.ts";
import type { CLIOptions } from "../optionUtils.ts";
import { parseCLIArguments } from "../parsers/argsParser.ts";
import { parseConfig } from "./configToOptions.ts";

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
	argv: string[],
	skipInputArgs?: boolean,
): {
	inputFiles: string[];
	options: CLIOptions;
	unknownArgs: string[];
} {
	const { "": inputPaths, ...kvs } = parseCLIArguments(argv, skipInputArgs);

	const options: CLIOptions = {};
	const inputFiles = inputPaths ?? [];
	const unknownArgs: string[] = [];

	for (const [key, values] of Object.entries(kvs)) {
		const cliOption = cliOptions[key];
		if (!cliOption) {
			unknownArgs.push(key);
			continue;
		}

		if (typeof cliOption.value === "function") {
			options[cliOption.option] = cliOption.value(values);
		} else {
			//@ts-expect-error tricky typing
			options[cliOption.option] =
				cliOption.value as CLIOptions[typeof cliOption.option];
		}
	}

	return { inputFiles, options, unknownArgs };
}

/**
 * Async function which reads the arguments as the above function, but looks for a config argument.
 * If it is the case, builds a list of CLI arguments out of the yaml file, and gives it as input to argsToOptions.
 * If there are distinct options, the ones from the CLI will be taken over the ones inside the config.
 * There is actually no recursive looking of a config option inside a config file, as it could yield cyclic dependencies.
 */
export async function configArgsToOptions(
	argv: string[],
	skipInputArgs?: boolean,
): Promise<{
	inputFiles: string[];
	options: CLIOptions;
	unknownArgs: string[];
}> {
	const { inputFiles, options, unknownArgs } = argsToOptions(
		argv,
		skipInputArgs,
	);
	if (options.config) {
		//If there is a config folder, read and parse the file and add it to existing entries
		const configOptions = await parseConfig(options.config).then((cargv) =>
			argsToOptions(cargv, true),
		);
		//Returns the retrieved list of options, overriden by the actual CLI list
		return {
			inputFiles: configOptions.inputFiles.concat(inputFiles),
			options: { ...configOptions.options, ...options },
			unknownArgs: configOptions.unknownArgs.concat(unknownArgs),
		};
	}

	return { inputFiles, options, unknownArgs };
}
