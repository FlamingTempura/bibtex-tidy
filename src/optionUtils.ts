import type { BibTeXTidyOptions } from "./__generated__/optionsType";
import { optionDefinitions } from "./optionDefinitions";

export type CLIOptions = BibTeXTidyOptions;

export type Options = Omit<
	BibTeXTidyOptions,
	"help" | "version" | "quiet" | "backup"
>;

export type MergeStrategy = Exclude<
	BibTeXTidyOptions["merge"],
	boolean | undefined
>;
export type DuplicateRule = Exclude<
	BibTeXTidyOptions["duplicates"],
	boolean | undefined
>[number];

export type OptionsNormalized = Omit<
	Options,
	| "sortProperties"
	| "duplicates"
	| "align"
	| "merge"
	| "sort"
	| "sortFields"
	| "wrap"
	| "enclosingBraces"
	| "removeBraces"
	| "generateKeys"
	| "blankLines"
> & {
	align: number;
	sort?: string[];
	space: number;
	sortFields?: string[];
	merge?: MergeStrategy;
	duplicates?: DuplicateRule[];
	wrap?: number;
	enclosingBraces?: string[];
	removeBraces?: string[];
	generateKeys?: string;
	blankLines: boolean;
};

export function normalizeOptions(options: Options): OptionsNormalized {
	return Object.fromEntries(
		optionDefinitions.map((def): [keyof OptionsNormalized, unknown] => {
			const key = def.key as keyof OptionsNormalized;
			const value = options[key];
			if (def.convertBoolean && typeof value === "boolean") {
				return [
					key,
					value ? def.convertBoolean.true : def.convertBoolean.false,
				];
			}
			if (typeof value === "undefined" && def.defaultValue !== undefined) {
				if (typeof def.defaultValue === "function") {
					return [key, def.defaultValue(options)];
				}
				return [key, def.defaultValue];
			}
			return [key, value];
		}),
	) as OptionsNormalized;
}
