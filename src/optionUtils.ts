import { optionDefinitions } from './optionDefinitions';
import { BibTeXTidyOptions } from './__generated__/optionsType';

export type CLIOptions = BibTeXTidyOptions;

export type Options = Omit<
	BibTeXTidyOptions,
	'help' | 'version' | 'quiet' | 'backup'
>;

export type MergeStrategy = Exclude<
	BibTeXTidyOptions['merge'],
	boolean | undefined
>;
export type DuplicateRule = Exclude<
	BibTeXTidyOptions['duplicates'],
	boolean | undefined
>[number];

export type OptionsNormalized = Omit<
	Options,
	| 'sortProperties'
	| 'duplicates'
	| 'align'
	| 'merge'
	| 'sort'
	| 'sortFields'
	| 'wrap'
	| 'enclosingBraces'
	| 'generateKeys'
> & {
	align: number;
	sort?: string[];
	space: number;
	sortFields?: string[];
	merge?: MergeStrategy;
	duplicates?: DuplicateRule[];
	wrap?: number;
	enclosingBraces?: string[];
	generateKeys?: string;
};

export function normalizeOptions(options: Options): OptionsNormalized {
	return Object.fromEntries(
		optionDefinitions.map((def): [keyof OptionsNormalized, any] => {
			const key = def.key as keyof OptionsNormalized;
			const value = options[key];
			if (value === true && def.valueIfTrue !== undefined) {
				return [key, def.valueIfTrue];
			}
			if (value === false && def.valueIfFalse !== undefined) {
				return [key, def.valueIfFalse];
			}
			if (typeof value === 'undefined' && def.defaultValue !== undefined) {
				if (typeof def.defaultValue === 'function') {
					return [key, def.defaultValue(options)];
				}
				return [key, def.defaultValue];
			}
			return [key, value];
		})
	) as OptionsNormalized;
}
