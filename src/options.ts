export type UniqueKey = 'doi' | 'key' | 'abstract' | 'citation';

export type MergeStrategy = 'first' | 'last' | 'combine' | 'overwrite';

export type Options = {
	/**
	 * Remove fields - Remove specified fields from bibliography entries.
	 * @example --omit=id,name
	 */
	omit?: string[];
	/**
	 * Enclose values in braces - Enclose all property values in braces.
	 * Quoted values will be converted to braces. For example, "Journal of Tea"
	 * will become {Journal of Tea}.
	 */
	curly?: boolean;
	/**
	 * Use numeric values where possible - Strip quotes and braces from
	 * numeric/month values. For example, {1998} will become 1998.
	 */
	numeric?: boolean;
	/**
	 * Indent with spaces - Prefix all fields with the specified number of spaces
	 * (ignored if tab is set).
	 * @example --space=2 (default)
	 * @example --space=4
	 */
	space?: true | number;
	/**
	 * Indent with tabs - Prefix all fields with a tab.
	 */
	tab?: boolean;
	/**
	 * Align values - Insert whitespace between fields and values so that values
	 * are visually aligned.
	 * @example --align=14 (default)
	 * @example --no-align
	 */
	align?: false | number;
	/**
	 * Sort bibliography entries - Sort entries by specified fields. For
	 * descending order, prefix the field with a dash (-).
	 * @example --sort (sort by id)
	 * @example --sort=-year,name (sort year descending then name ascending)
	 * @example --sort=name,year
	 */
	sort?: boolean | string[];
	/**
	 * Check for duplicates - If there are duplicates, output warnings. When using
	 * with the `merge` option, this determines which entries to merge. Two
	 * entries are considered duplicates in the following cases:
	 * - their DOIs are identical,
	 * - their abstracts are identical, or
	 * - their authors and titles are both identical. The first-most entry is kept
	 *   and any extra properties from duplicate entries are incorporated.
	 * @example --duplicates (warn if sharing doi, key, abstract, or citation)
	 * @example --duplicates doi (warn if DOIs are identical)
	 * @example --duplicates key (warn if IDs are identical)
	 * @example --duplicates abstract (warn if abstracts are similar)
	 * @example --duplicates citation (warn if author and titles are similar)
	 * @example --duplicates doi, key (warn if DOI or keys are identical)
	 */
	duplicates?: boolean | UniqueKey[];
	/**
	 * Merge duplicate entries - Merge duplicates entries. How duplicates are
	 * identified can be set using the `duplicates` option. There are different
	 * ways to merge:
	 * - first: only keep the original entry
	 * - last: only keep the last found duplicate
	 * - combine: keep original entry and merge in fields of duplicates if they do
	 *   not already exist
	 * - overwrite: keep original entry and merge in fields of duplicates,
	 *   overwriting existing fields if they exist
	 */
	merge?: boolean | MergeStrategy;
	/**
	 * Strip double-braced values - Where an entire value is enclosed in double
	 * braces, remove the extra braces. For example, {{Journal of Tea}} will
	 * become {Journal of Tea}.
	 */
	stripEnclosingBraces?: boolean;
	/**
	 * Drop all caps - Where values are all caps, make them title case. For
	 * example, {JOURNAL OF TEA} will become {Journal of Tea}.
	 */
	dropAllCaps?: boolean;
	/**
	 * Escape special characters - Escape special characters, such as umlaut.
	 * This ensures correct typesetting with latex.
	 * @example --escape (default)
	 * @example --no-escape
	 */
	escape?: boolean;
	/**
	 * Sort fields - Sort the fields within entries.
	 *
	 * If sort-fields is specified without fields, fields will be sorted as
	 * follows: title, shorttitle, author, year, month, day, journal, booktitle,
	 * location, on, publisher, address, series, volume, number, pages, doi, isbn,
	 * issn, url, urldate, copyright, category, note, metadata.
	 *
	 * Alternatively, you can specify field names delimited by spaces or commas.
	 * @example --sort-fields=name,author
	 */
	sortFields?: boolean | string[];
	/**
	 * Alias of sort fields (legacy)
	 * @deprecated
	 */
	sortProperties?: boolean | string[];
	/**
	 * Remove comments - Remove all comments from the bibtex source
	 */
	stripComments?: boolean;
	/**
	 * Trailing commas - End the last key value pair in each entry with a comma
	 */
	trailingCommas?: boolean;
	/**
	 * Encode URLs - Replace invalid URL characters with percent encoded values.
	 */
	encodeUrls?: boolean;
	/**
	 * Tidy comments - Remove whitespace surrounding
	 */
	tidyComments?: boolean;
	/**
	 * Remove empty fields - Remove any fields that have empty values
	 */
	removeEmptyFields?: boolean;
	/**
	 * Maximum authors - Truncate authors if above a given number into "and others".
	 */
	maxAuthors?: number;
	/**
	 * Make field names and entry type lowercase.
	 * @example --lowercase (default)
	 * @example --no-lowercase (keep original case)
	 */
	lowercase?: boolean;
	/**
	 * Enclose values in double braces - Enclose the given fields in double braces, such
	 * that case is preserved during BibTeX compilation.
	 * @example --enclosing-braces=title,journal (output title and journal fields will be of the form {{This is a title}})
	 * @example --enclosing-braces (equivalent to ---enclosing-braces=title)
	 */
	enclosingBraces?: boolean | string[];
	/**
	 * Wrap values - Wrap long values at the given column
	 * @example --wrap (80 by default)
	 * @example --wrap=82
	 */
	wrap?: boolean | number;
};

export type CLIOptions = Options & {
	/**
	 * Show help
	 */
	help?: true;
	/**
	 * Suppress logs and warnings.
	 */
	quiet?: true;
	/**
	 * Make a backup <filename>.original
	 * @example --backup (default)
	 * @example --no-backup (do not create a backup)
	 */
	backup?: boolean;
};

export type OptionsSanitized = Omit<
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
	align?: number;
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

export function applyOptionDefaults(options: Options): OptionsSanitized {
	return {
		align: optionDefault(options.align, { valueIfFalse: 1, defaultValue: 14 }),
		curly: optionDefault(options.curly, { defaultValue: false }),
		dropAllCaps: optionDefault(options.dropAllCaps, { defaultValue: false }),
		duplicates: optionDefault(options.duplicates, {
			valueIfTrue: DEFAULT_MERGE_CHECK,
			defaultValue: options.merge ? DEFAULT_MERGE_CHECK : undefined,
		}),
		enclosingBraces: optionDefault(options.enclosingBraces, {
			valueIfTrue: DEFAULT_ENCLOSING_BRACES_FIELDS,
		}),
		encodeUrls: optionDefault(options.encodeUrls, { defaultValue: false }),
		escape: optionDefault(options.escape, { defaultValue: true }),
		lowercase: optionDefault(options.lowercase, { defaultValue: true }),
		maxAuthors: options.maxAuthors,
		merge: optionDefault(options.merge, { valueIfTrue: 'combine' }),
		numeric: optionDefault(options.numeric, { defaultValue: false }),
		omit: optionDefault(options.omit, { defaultValue: [] }),
		removeEmptyFields: optionDefault(options.removeEmptyFields, {
			defaultValue: false,
		}),
		sort: optionDefault(options.sort, { valueIfTrue: DEFAULT_ENTRY_ORDER }),
		sortFields: optionDefault(options.sortFields ?? options.sortProperties, {
			valueIfTrue: DEFAULT_FIELD_ORDER,
		}),
		space:
			optionDefault(options.space, { valueIfTrue: 2, defaultValue: 2 }) ?? 2,
		stripComments: optionDefault(options.stripComments, {
			defaultValue: false,
		}),
		stripEnclosingBraces: optionDefault(options.stripEnclosingBraces, {
			defaultValue: false,
		}),
		tab: optionDefault(options.tab, { defaultValue: false }),
		tidyComments: optionDefault(options.tidyComments, { defaultValue: true }),
		trailingCommas: optionDefault(options.trailingCommas, {
			defaultValue: false,
		}),
		wrap: optionDefault(options.wrap, { valueIfTrue: 80 }),
	};
}

function optionDefault<TOut>(
	value: unknown,
	opt: { valueIfTrue?: TOut; valueIfFalse?: TOut; defaultValue?: TOut }
): TOut | undefined {
	if (value === true && 'valueIfTrue' in opt) return opt.valueIfTrue;
	if (value === false && 'valueIfFalse' in opt) return opt.valueIfFalse;
	if (typeof value === 'undefined') return opt.defaultValue;
	return value as TOut;
}
