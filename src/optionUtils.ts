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
export type UniqueKey = Exclude<
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
	| 'dropAllCaps'
	| 'sortFields'
	| 'wrap'
	| 'enclosingBraces'
> & {
	align: number;
	sort?: string[];
	space: number;
	sortFields?: string[];
	dropAllCaps: string[];
	merge?: MergeStrategy;
	duplicates?: UniqueKey[];
	wrap?: number;
	enclosingBraces?: string[];
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
