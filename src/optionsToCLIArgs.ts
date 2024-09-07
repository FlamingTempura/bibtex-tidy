import { optionDefinitions } from "./optionDefinitions";
import type { Options } from "./optionUtils";

export function optionsToCLIArgs(options: Options): string[] {
	return optionDefinitions
		.map((def) => def.toCLI?.(options[def.key as keyof Options], options))
		.filter((arg): arg is string => typeof arg === "string");
}
