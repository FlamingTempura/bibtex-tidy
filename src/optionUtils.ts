import { Options as AllOptions } from './optionsType';

export type CLIOptions = AllOptions;

export type Options = Omit<AllOptions, 'help' | 'quiet' | 'backup'>;

export type MergeStrategy = Exclude<AllOptions['merge'], boolean | undefined>;
export type UniqueKey = Exclude<
	AllOptions['duplicates'],
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
> & {
	align: number;
	sort?: string[];
	space: number;
	sortFields?: string[];
	merge?: MergeStrategy;
	duplicates?: UniqueKey[];
	wrap?: number;
	enclosingBraces?: string[];
};

const DEFAULT_ENTRY_ORDER: string[] = ['key']; // if sort = true
const DEFAULT_MERGE_CHECK: UniqueKey[] = ['doi', 'citation', 'abstract'];

//prettier-ignore
const DEFAULT_FIELD_ORDER: string[] = [
	'title', 'shorttitle', 'author', 'year', 'month', 'day', 'journal',
	'booktitle', 'location', 'on', 'publisher', 'address', 'series',
	'volume', 'number', 'pages', 'doi', 'isbn', 'issn', 'url',
	'urldate', 'copyright', 'category', 'note', 'metadata'
];

const DEFAULT_ENCLOSING_BRACES_FIELDS: string[] = ['title'];

export function normalizeOptions(options: Options): OptionsNormalized {
	return {
		align: normalizeOption(options.align, {
			valueIfFalse: 1,
			defaultValue: 14,
		}),
		curly: normalizeOption(options.curly, { defaultValue: false }),
		dropAllCaps: normalizeOption(options.dropAllCaps, { defaultValue: false }),
		duplicates: normalizeOption(options.duplicates, {
			valueIfTrue: DEFAULT_MERGE_CHECK,
			defaultValue: options.merge ? DEFAULT_MERGE_CHECK : undefined,
		}),
		enclosingBraces: normalizeOption(options.enclosingBraces, {
			valueIfTrue: DEFAULT_ENCLOSING_BRACES_FIELDS,
		}),
		encodeUrls: normalizeOption(options.encodeUrls, { defaultValue: false }),
		escape: normalizeOption(options.escape, { defaultValue: true }),
		lowercase: normalizeOption(options.lowercase, { defaultValue: true }),
		maxAuthors: options.maxAuthors,
		merge: normalizeOption(options.merge, { valueIfTrue: 'combine' }),
		numeric: normalizeOption(options.numeric, { defaultValue: false }),
		omit: normalizeOption(options.omit, { defaultValue: [] }),
		removeEmptyFields: normalizeOption(options.removeEmptyFields, {
			defaultValue: false,
		}),
		removeDuplicateFields: normalizeOption(options.removeDuplicateFields, {
			defaultValue: true,
		}),
		sort: normalizeOption(options.sort, { valueIfTrue: DEFAULT_ENTRY_ORDER }),
		sortFields: normalizeOption(options.sortFields ?? options.sortProperties, {
			valueIfTrue: DEFAULT_FIELD_ORDER,
		}),
		space:
			normalizeOption(options.space, { valueIfTrue: 2, defaultValue: 2 }) ?? 2,
		stripComments: normalizeOption(options.stripComments, {
			defaultValue: false,
		}),
		stripEnclosingBraces: normalizeOption(options.stripEnclosingBraces, {
			defaultValue: false,
		}),
		tab: normalizeOption(options.tab, { defaultValue: false }),
		tidyComments: normalizeOption(options.tidyComments, { defaultValue: true }),
		trailingCommas: normalizeOption(options.trailingCommas, {
			defaultValue: false,
		}),
		wrap: normalizeOption(options.wrap, { valueIfTrue: 80 }),
	};
}

function normalizeOption<TOut>(
	value: unknown,
	opt: { valueIfTrue?: TOut; valueIfFalse?: TOut; defaultValue?: TOut }
): TOut {
	if (value === true && opt.valueIfTrue !== undefined) return opt.valueIfTrue;
	if (value === false && opt.valueIfFalse !== undefined)
		return opt.valueIfFalse;
	if (typeof value === 'undefined' && opt.defaultValue !== undefined)
		return opt.defaultValue;
	return value as TOut;
}
