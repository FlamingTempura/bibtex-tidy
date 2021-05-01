import { optionDefinitions } from './optionDefinitions';
import { CLIOptions, Options } from './optionUtils';

const OPTIONS = new Set(
	optionDefinitions.flatMap((def) => Object.keys(def.cli))
);

/**
 * <input files> <options>
 * <options> <input files>
 */
export function parseArguments(
	args: string[]
): {
	inputFiles: string[];
	options: CLIOptions;
	unknownArgs: string[];
} {
	const { inputFiles, optionArgVals: optionArgs, unknownArgs } = splitCLIArgs(
		args
	);

	const options: CLIOptions = {};

	for (const def of optionDefinitions) {
		for (const [opt, val] of Object.entries(def.cli)) {
			if (!optionArgs[opt]) continue;
			const key = def.key as keyof CLIOptions;
			if (typeof val === 'function') {
				options[key] = val(optionArgs[opt]) as any;
			} else {
				options[key] = val as any;
			}
		}
	}

	return { inputFiles, options, unknownArgs };
}
export function splitCLIArgs(
	args: string[]
): {
	inputFiles: string[];
	optionArgVals: Record<string, string[]>;
	unknownArgs: string[];
} {
	const optionArgVals: Record<string, string[]> = {};
	const unknownArgs = new Set<string>();

	let currOption: string | undefined;
	let valueOrInputArgs: string[] = [];
	let inputArgs: string[] | undefined;

	const argsToProcess: {
		arg: string;
		isValue?: boolean;
	}[] = args.map((arg) => ({ arg }));

	while (true) {
		// Keep getting first argument until there are none left
		const next = argsToProcess.shift();
		if (!next) break;
		const { arg, isValue } = next;
		// An option is any arg beginning dash or double dash. However, some values
		// can being with "-", e.g when setting a field to sort in descending order.
		// When those are encountered, isValue will be true.
		if (!isValue && arg.startsWith('-')) {
			// Options with values can be specified as --thing=a,b,c or --thing a b c.
			// Convert the former style into the latter by splitting them up into
			// separate args and putting them at the beginning of the arg list.
			const equalPos = arg.indexOf('=');
			if (equalPos > -1) {
				const option = arg.slice(0, equalPos);
				const values = arg.slice(equalPos + 1).split(',');
				argsToProcess.unshift(
					{ arg: option },
					// Explicitly mark these as values so that values beginning with
					// dash won't be mistaken for options.
					...values.map((val) => ({ arg: val, isValue: true }))
				);
				continue;
			}
			if (!OPTIONS.has(arg)) {
				unknownArgs.add(arg);
				continue;
			}
			if (currOption) {
				optionArgVals[currOption].push(...valueOrInputArgs);
			} else if (valueOrInputArgs.length > 0) {
				// If no option has been seen yet but args have been seen, then they are
				// in the input args.
				inputArgs = valueOrInputArgs;
			}
			currOption = arg;
			optionArgVals[currOption] = [];
			valueOrInputArgs = [];
		} else if (isValue && currOption) {
			optionArgVals[currOption].push(arg);
		} else {
			valueOrInputArgs.push(arg);
		}
	}

	if (!inputArgs) {
		inputArgs = valueOrInputArgs;
	} else if (currOption) {
		optionArgVals[currOption].push(...valueOrInputArgs);
	} else {
		// should never happen
		throw new Error(`Invalid args: ${args.join(' ')}`);
	}

	return {
		inputFiles: inputArgs,
		optionArgVals,
		unknownArgs: [...unknownArgs],
	};
}

export function optionsToCLIArgs(options: Options): string[] {
	return optionDefinitions
		.map((def) => def.toCLI?.(options[def.key as keyof Options]))
		.filter((arg): arg is string => typeof arg === 'string');
}
