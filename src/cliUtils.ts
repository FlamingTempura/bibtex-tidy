import { optionDefinitions } from './optionDefinitions';
import { CLIOptions, Options } from './optionUtils';

const OPTIONS = new Set(
	optionDefinitions.flatMap((def) => Object.keys(def.cli))
);

function isOption(arg: string): boolean {
	const argName = arg.split('=')[0];
	if (OPTIONS.has(argName)) return true;
	if (argName.startsWith('--')) throw new Error(`Invalid option ${argName}`);
	return false;
}

/**
 * <input files> <options>
 * <options> <input files>
 */
export function parseArguments(
	args: string[]
): {
	inputFiles: string[];
	options: CLIOptions;
} {
	const { inputFiles, optionArgs } = splitCLIArgs(args);

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

	return { inputFiles, options };
}
export function splitCLIArgs(
	args: string[]
): { inputFiles: string[]; optionArgs: Record<string, string[]> } {
	if (args[0] && isOption(args[0])) {
		const i = args.length - [...args].reverse().findIndex(isOption);
		return {
			inputFiles: args.slice(i),
			optionArgs: groupCLIOptions(args.slice(0, i)),
		};
	} else {
		const i = args.findIndex(isOption);
		return {
			inputFiles: i === -1 ? args : args.slice(0, i),
			optionArgs: groupCLIOptions(i === -1 ? [] : args.slice(i)),
		};
	}
}

/**
 * ['--no-wrap', '--space 3', '--tab=1'] => { '--no-wrap': [], '--space': ['3'], '--tab': ['1'] }
 */
export function groupCLIOptions(args: string[]): Record<string, string[]> {
	const groups: Record<string, string[]> = {};
	let currOption: string | undefined;
	args = args.flatMap((arg) => arg.split(/[=,]/));
	for (const arg of args) {
		if (isOption(arg)) {
			currOption = arg;
			groups[currOption] = [];
		} else if (currOption) {
			groups[currOption].push(arg);
		} else {
			// should never happen
			throw new Error(`Invalid args: ${args.join(' ')}`);
		}
	}
	return groups;
}

export function optionsToCLIArgs(options: Options): string[] {
	return optionDefinitions
		.map((def) => def.toCLI?.(options[def.key as keyof Options]))
		.filter((arg): arg is string => typeof arg === 'string');
}
