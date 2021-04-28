export type OptionDefinition = {
	key: string;
	cli: string;
	title: string;
	description?: string[];
	examples?: string[];
	type: string;
	deprecated?: boolean;
};

export const optionDefinitions: OptionDefinition[] = [
	{
		key: 'help',
		cli: 'help',
		title: 'Show help',
		type: 'boolean',
	},
	{
		key: 'omit',
		cli: 'omit',
		title: 'Remove fields',
		description: ['Remove specified fields from bibliography entries.'],
		examples: ['--omit=id,name'],
		type: 'string[]',
	},
	{
		key: 'curly',
		cli: 'curly',
		title: 'Enclose values in braces',
		description: [
			'Enclose all property values in braces. Quoted values will be converted to braces. For example, "Journal of Tea" will become {Journal of Tea}.',
		],

		type: 'boolean',
	},
	{
		key: 'numeric',
		cli: 'numeric',
		title: 'Use numeric values where possible',
		description: [
			'Strip quotes and braces from numeric/month values. For example, {1998} will become 1998.',
		],

		type: 'boolean',
	},
	{
		key: 'space',
		cli: 'space',
		title: 'Indent with spaces',
		description: [
			'Prefix all fields with the specified number of spaces (ignored if tab is set).',
		],
		examples: ['--space=2 (default)', '--space=4'],
		type: 'boolean | number',
	},
	{
		key: 'tab',
		cli: 'tab',
		title: 'Indent with tabs',
		description: ['Prefix all fields with a tab.'],

		type: 'boolean',
	},
	{
		key: 'align',
		cli: 'align',
		title: 'Align values',
		description: [
			'Insert whitespace between fields and values so that values are visually aligned.',
		],
		examples: ['--align=14 (default)', '--no-align'],
		type: 'boolean | number',
	},
	{
		key: 'sort',
		cli: 'sort',
		title: 'Sort bibliography entries',
		description: [
			'Sort entries by specified fields. For descending order, prefix the field with a dash (-).',
		],
		examples: [
			'--sort (sort by id)',
			'--sort=-year,name (sort year descending then name ascending)',
			'--sort=name,year',
		],
		type: 'boolean | string[]',
	},
	{
		key: 'duplicates',
		cli: 'duplicates',
		title: 'Check for duplicates',
		description: [
			'If there are duplicates, output warnings. When using with the `merge` option, this determines which entries to merge. Two entries are considered duplicates in the following cases:',
			'- their DOIs are identical,',
			'- their abstracts are identical, or',
			'- their authors and titles are both identical. The first-most entry is kept and any extra properties from duplicate entries are incorporated.',
		],
		examples: [
			'--duplicates (warn if sharing doi, key, abstract, or citation)',
			'--duplicates doi (warn if DOIs are identical)',
			'--duplicates key (warn if IDs are identical)',
			'--duplicates abstract (warn if abstracts are similar)',
			'--duplicates citation (warn if author and titles are similar)',
			'--duplicates doi, key (warn if DOI or keys are identical)',
		],
		type: "boolean | ('doi' | 'key' | 'abstract' | 'citation')[]",
	},
	{
		key: 'merge',
		cli: 'merge',
		title: 'Merge duplicate entries',
		description: [
			'Merge duplicates entries. How duplicates are identified can be set using the `duplicates` option. There are different ways to merge:',
			'- first: only keep the original entry',
			'- last: only keep the last found duplicate',
			'- combine: keep original entry and merge in fields of duplicates if they do not already exist',
			'- overwrite: keep original entry and merge in fields of duplicates, overwriting existing fields if they exist',
		],

		type: "boolean | 'first' | 'last' | 'combine' | 'overwrite'",
	},
	{
		key: 'stripEnclosingBraces',
		cli: 'strip-enclosing-braces',
		title: 'Strip double-braced values',
		description: [
			'Where an entire value is enclosed in double braces, remove the extra braces. For example, {{Journal of Tea}} will become {Journal of Tea}.',
		],

		type: 'boolean',
	},
	{
		key: 'dropAllCaps',
		cli: 'drop-all-caps',
		title: 'Drop all caps',
		description: [
			'Where values are all caps, make them title case. For example, {JOURNAL OF TEA} will become {Journal of Tea}.',
		],

		type: 'boolean',
	},
	{
		key: 'escape',
		cli: 'escape',
		title: 'Escape special characters',
		description: [
			'Escape special characters, such as umlaut. This ensures correct typesetting with latex.',
		],
		examples: ['--escape (default)', '--no-escape'],
		type: 'boolean',
	},
	{
		key: 'sortFields',
		cli: 'sort-fields',
		title: 'Sort fields',
		description: [
			'Sort the fields within entries. If sort-fields is specified without fields, fields will be sorted as follows: title, shorttitle, author, year, month, day, journal, booktitle, location, on, publisher, address, series, volume, number, pages, doi, isbn, issn, url, urldate, copyright, category, note, metadata. Alternatively, you can specify field names delimited by spaces or commas.',
		],
		examples: ['--sort-fields=name,author'],
		type: 'boolean | string[]',
	},
	{
		key: 'sortProperties',
		cli: 'sort-properties',
		title: 'Sort properties',
		description: ['Alias of sort fields (legacy)'],

		type: 'boolean | string[]',
		deprecated: true,
	},
	{
		key: 'stripComments',
		cli: 'strip-comments',
		title: 'Remove comments',
		description: ['Remove all comments from the bibtex source'],

		type: 'boolean',
	},
	{
		key: 'trailingCommas',
		cli: 'trailing-commas',
		title: 'Trailing commas',
		description: ['End the last key value pair in each entry with a comma'],

		type: 'boolean',
	},
	{
		key: 'encodeUrls',
		cli: 'encode-urls',
		title: 'Encode URLs',
		description: [
			'Replace invalid URL characters with percent encoded values.',
		],

		type: 'boolean',
	},
	{
		key: 'tidyComments',
		cli: 'tidy-comments',
		title: 'Tidy comments',
		description: ['Remove whitespace surrounding'],

		type: 'boolean',
	},
	{
		key: 'removeEmptyFields',
		cli: 'remove-empty-fields',
		title: 'Remove empty fields',
		description: ['Remove any fields that have empty values'],

		type: 'boolean',
	},
	{
		key: 'removeDuplicateFields',
		cli: 'remove-duplicate-fields',
		title: 'Remove duplicate fields',
		description: ['Only allow one of each field in each entry.'],
		examples: ['--remove-empty-fields (default)', '--no-remove-empty-fields'],
		type: 'boolean',
	},
	{
		key: 'maxAuthors',
		cli: 'max-authors',
		title: 'Maximum authors',
		description: [
			'Truncate authors if above a given number into "and others".',
		],

		type: 'number',
	},
	{
		key: 'lowercase',
		cli: 'lowercase',
		title: 'Lowercase field names and entry type',
		examples: ['--lowercase (default)', '--no-lowercase (keep original case)'],
		type: 'boolean',
	},
	{
		key: 'enclosingBraces',
		cli: 'enclosing-braces',
		title: 'Enclose values in double braces',
		description: [
			'Enclose the given fields in double braces, such that case is preserved during BibTeX compilation.',
		],
		examples: [
			'--enclosing-braces=title,journal (output title and journal fields will be of the form {{This is a title}})',
			'--enclosing-braces (equivalent to ---enclosing-braces=title)',
		],
		type: 'boolean | string[]',
	},
	{
		key: 'wrap',
		cli: 'wrap',
		title: 'Wrap values',
		description: ['Wrap long values at the given column'],
		examples: ['--wrap (80 by default)', '--wrap=82'],
		type: 'boolean | number',
	},
	{
		key: 'quiet',
		cli: 'quiet',
		title: 'Quiet',
		description: ['Suppress logs and warnings.'],

		type: 'boolean',
	},
	{
		key: 'backup',
		cli: 'backup',
		title: 'Backup',
		description: ['Make a backup <filename>.original'],
		examples: ['--backup (default)', '--no-backup (do not create a backup)'],
		type: 'boolean',
	},
];
