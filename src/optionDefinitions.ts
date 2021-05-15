export type OptionDefinition = {
	key: string;
	cli: Record<string, boolean | ((args: string[]) => void)>;
	toCLI?: (val: any) => string | undefined;
	title: string;
	description?: string[];
	examples?: string[];
	type: string;
	deprecated?: boolean;
	defaultValue?: unknown;
	valueIfTrue?: unknown;
	valueIfFalse?: unknown;
};

const DEFAULT_MERGE_CHECK: string[] = ['doi', 'citation', 'abstract'];

export const optionDefinitions: OptionDefinition[] = [
	{
		key: 'help',
		cli: { '--help': true, '-h': true },
		title: 'Help',
		description: ['Show help'],
		type: 'boolean',
	},
	{
		key: 'omit',
		cli: {
			'--omit': (args) => {
				if (args.length === 0) {
					console.error(`Expected a omit list`);
					process.exit(1);
				}
				return args;
			},
		},
		toCLI: (val) =>
			Array.isArray(val) && val.length > 0
				? `--omit=${val.join(',')}`
				: undefined,
		title: 'Remove fields',
		description: ['Remove specified fields from bibliography entries.'],
		examples: ['--omit=id,name'],
		type: 'string[]',
		defaultValue: [],
	},
	{
		key: 'curly',
		cli: { '--curly': true, '--no-curly': false },
		toCLI: (val) => (val ? `--curly` : undefined),
		title: 'Enclose values in braces',
		description: [
			'Enclose all property values in braces. Quoted values will be converted to braces. For example, "Journal of Tea" will become {Journal of Tea}.',
		],
		type: 'boolean',
		defaultValue: false,
	},
	{
		key: 'numeric',
		cli: { '--numeric': true, '--no-numeric': false },
		toCLI: (val) => (val ? `--numeric` : undefined),
		title: 'Use numeric values where possible',
		description: [
			'Strip quotes and braces from numeric/month values. For example, {1998} will become 1998.',
		],
		type: 'boolean',
		defaultValue: false,
	},
	{
		key: 'space',
		cli: {
			'--space': (args) => (args.length > 0 ? Number(args[0]) : true),
		},

		toCLI: (val) => {
			if (typeof val === 'number') return `--space=${val}`;
			if (val) return '--space';
			return undefined;
		},
		title: 'Indent with spaces',
		description: [
			'Indent all fields with the specified number of spaces. Ignored if tab is set.',
		],
		examples: ['--space=2 (default)', '--space=4'],
		type: 'boolean | number',
		valueIfTrue: 2,
		defaultValue: 2,
	},
	{
		key: 'tab',
		cli: { '--tab': true, '--no-tab': false },
		toCLI: (val) => (val ? `--tab` : undefined),
		title: 'Indent with tabs',
		description: ['Intent all fields with a tab.'],
		type: 'boolean',
		defaultValue: false,
	},
	{
		key: 'align',
		cli: {
			'--align': (args) => Number(args[0]),
			'--no-align': false,
		},
		toCLI: (val) => {
			if (typeof val === 'number') return `--align=${val}`;
			if (val === false) return '--no-align';
			return undefined;
		},
		title: 'Align values',
		description: [
			'Insert whitespace between fields and values so that values are visually aligned.',
		],
		examples: ['--align=14 (default)'],
		type: 'boolean | number',
		valueIfFalse: 1,
		defaultValue: 14,
	},
	{
		key: 'sort',
		cli: {
			'--sort': (args) => (args.length > 0 ? args : true),
			'--no-sort': false,
		},
		toCLI: (val) => {
			if (Array.isArray(val) && val.length > 0)
				return `--sort=${val.join(',')}`;
			if (val === true) return '--sort';
			return undefined;
		},
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
		valueIfTrue: ['key'],
	},
	{
		key: 'duplicates',
		cli: {
			'--duplicates': (args) => {
				if (args.length === 0) return true;
				for (const i of args) {
					if (
						i !== 'doi' &&
						i !== 'key' &&
						i !== 'abstract' &&
						i !== 'citation'
					) {
						console.error(`Invalid key for merge option: "${i}"`);
						process.exit(1);
					}
				}
				return args;
			},
		},
		toCLI: (val) => {
			if (Array.isArray(val) && val.length > 0)
				return `--duplicates=${val.join(',')}`;
			if (val === true) return '--duplicates';
			return undefined;
		},
		title: 'Check for duplicates',
		description: [
			'Warn if duplicates are found, which are entries where DOI, abstract, or author and title are the same.',
		],
		examples: [
			'--duplicates doi (same DOIs)',
			'--duplicates key (same IDs)',
			'--duplicates abstract (similar abstracts)',
			'--duplicates citation (similar author and titles)',
			'--duplicates doi, key (identical DOI or keys)',
			'--duplicates (same DOI, key, abstract, or citation)',
		],
		type: "boolean | ('doi' | 'key' | 'abstract' | 'citation')[]",
		valueIfTrue: DEFAULT_MERGE_CHECK,
		defaultValue: (options: any) =>
			options.merge ? DEFAULT_MERGE_CHECK : undefined,
	},
	{
		key: 'merge',
		cli: {
			'--merge': (args) => {
				if (args.length === 0) return true;

				if (
					args[0] !== 'first' &&
					args[0] !== 'last' &&
					args[0] !== 'combine' &&
					args[0] !== 'overwrite'
				) {
					console.error(`Invalid merge strategy: "${args[0]}"`);
					process.exit(1);
				}
				return args[0];
			},
			'--no-merge': false,
		},
		toCLI: (val) => {
			if (typeof val === 'string') return `--merge=${val}`;
			if (val) return '--merge';
			return undefined;
		},
		title: 'Merge duplicate entries',
		description: [
			'Merge duplicates entries. Use the duplicates option to determine how duplicates are identified. There are different ways to merge:',
			'- first: only keep the original entry',
			'- last: only keep the last found duplicate',
			'- combine: keep original entry and merge in fields of duplicates if they do not already exist',
			'- overwrite: keep original entry and merge in fields of duplicates, overwriting existing fields if they exist',
		],
		type: "boolean | 'first' | 'last' | 'combine' | 'overwrite'",
		valueIfTrue: 'combine',
	},
	{
		key: 'stripEnclosingBraces',
		cli: { '--strip-enclosing-braces': true },
		toCLI: (val) => (val ? '--strip-enclosing-braces' : undefined),
		title: 'Strip double-braced values',
		description: [
			'Where an entire value is enclosed in double braces, remove the extra braces. For example, {{Journal of Tea}} will become {Journal of Tea}.',
		],
		type: 'boolean',
		defaultValue: false,
	},
	{
		key: 'dropAllCaps',
		cli: { '--drop-all-caps': true },
		toCLI: (val) => (val ? '--drop-all-caps' : undefined),
		title: 'Drop all caps',
		description: [
			'Where values are all caps, make them title case. For example, {JOURNAL OF TEA} will become {Journal of Tea}.',
		],
		type: 'boolean',
		defaultValue: false,
	},
	{
		key: 'escape',
		cli: { '--escape': true, '--no-escape': false },
		toCLI: (val) => (val === false ? '--no-escape' : undefined),
		title: 'Escape special characters',
		description: [
			'Escape special characters, such as umlaut. This ensures correct typesetting with latex. Enabled by default.',
		],
		type: 'boolean',
		defaultValue: true,
	},
	{
		key: 'sortFields',
		cli: { '--sort-fields': (args) => (args.length > 0 ? args : true) },
		toCLI: (val) => {
			if (Array.isArray(val) && val.length > 0)
				return `--sort-fields=${val.join(',')}`;
			if (val === true) return '--sort-fields';
			return undefined;
		},
		title: 'Sort fields',
		description: [
			'Sort the fields within entries.',
			'If no fields are specified fields will be sorted by: title, shorttitle, author, year, month, day, journal, booktitle, location, on, publisher, address, series, volume, number, pages, doi, isbn, issn, url, urldate, copyright, category, note, metadata',
		],
		examples: ['--sort-fields=name,author'],
		type: 'boolean | string[]',
		//prettier-ignore
		valueIfTrue: [
			'title', 'shorttitle', 'author', 'year', 'month', 'day', 'journal',
			'booktitle', 'location', 'on', 'publisher', 'address', 'series',
			'volume', 'number', 'pages', 'doi', 'isbn', 'issn', 'url',
			'urldate', 'copyright', 'category', 'note', 'metadata'
		],
		defaultValue: false,
	},
	{
		key: 'sortProperties',
		cli: { '--sort-properties': (args) => (args.length > 0 ? args : true) },
		title: 'Sort properties',
		description: ['Alias of sort fields (legacy)'],
		type: 'boolean | string[]',
		deprecated: true,
	},
	{
		key: 'stripComments',
		cli: { '--strip-comments': true, '--no-strip-comments': false },
		toCLI: (val) => (val ? '--strip-comments' : undefined),
		title: 'Remove comments',
		description: ['Remove all comments from the bibtex source.'],
		type: 'boolean',
		defaultValue: false,
	},
	{
		key: 'trailingCommas',
		cli: { '--trailing-commas': true, '--no-trailing-commas': true },
		toCLI: (val) => (val ? '--trailing-commas' : undefined),
		title: 'Trailing commas',
		description: ['End the last key value pair in each entry with a comma.'],
		type: 'boolean',
		defaultValue: false,
	},
	{
		key: 'encodeUrls',
		cli: { '--encode-urls': true, '--no-encode-urls': true },
		toCLI: (val) => (val ? '--encode-urls' : undefined),
		title: 'Encode URLs',
		description: [
			'Replace invalid URL characters with percent encoded values.',
		],
		type: 'boolean',
		defaultValue: false,
	},
	{
		key: 'tidyComments',
		cli: { '--tidy-comments': true, '--no-tidy-comments': false },
		toCLI: (val) => (val === false ? '--no-tidy-comments' : undefined),
		title: 'Tidy comments',
		description: ['Remove whitespace surrounding comments.'],
		type: 'boolean',
		defaultValue: true,
	},
	{
		key: 'removeEmptyFields',
		cli: { '--remove-empty-fields': true, '--no-remove-empty-fields': false },
		toCLI: (val) => (val ? '--remove-empty-fields' : undefined),
		title: 'Remove empty fields',
		description: ['Remove any fields that have empty values.'],
		type: 'boolean',
		defaultValue: false,
	},
	{
		key: 'removeDuplicateFields',
		cli: {
			'--remove-dupe-fields': true,
			'--no-remove-dupe-fields': false,
		},
		toCLI: (val) => (val === false ? '--no-remove-dupe-fields' : undefined),
		title: 'Remove duplicate fields',
		description: [
			'Only allow one of each field in each entry. Enabled by default.',
		],
		type: 'boolean',
		defaultValue: true,
	},
	{
		key: 'maxAuthors',
		cli: { '--max-authors': (args) => Number(args[0]) },
		toCLI: (val) => (val ? `--max-authors=${val}` : undefined),
		title: 'Maximum authors',
		description: [
			'Truncate authors if above a given number into "and others".',
		],
		type: 'number',
	},
	{
		key: 'lowercase',
		cli: { '--no-lowercase': false },
		toCLI: (val) => (val === false ? '--no-lowercase' : undefined),
		title: 'Lowercase fields',
		description: ['Lowercase field names and entry type. Enabled by default.'],
		type: 'boolean',
		defaultValue: true,
	},
	{
		key: 'enclosingBraces',
		cli: {
			'--enclosing-braces': (args) => (args.length > 0 ? args : true),
		},
		toCLI: (val) => {
			if (Array.isArray(val) && val.length > 0)
				return `--enclosing-braces=${val.join(',')}`;
			if (val === true) return '--enclosing-braces';
			return undefined;
		},
		title: 'Enclose values in double braces',
		description: [
			'Enclose the given fields in double braces, such that case is preserved during BibTeX compilation.',
		],
		examples: [
			'--enclosing-braces=title,journal (output title and journal fields will be of the form {{This is a title}})',
			'--enclosing-braces (equivalent to ---enclosing-braces=title)',
		],
		type: 'boolean | string[]',
		valueIfTrue: ['title'],
	},
	{
		key: 'wrap',
		cli: {
			'--wrap': (args) => (args.length > 0 ? Number(args[0]) : true),
			'--no-wrap': false,
		},
		toCLI: (val) => (val ? `--wrap=${val}` : undefined),
		title: 'Wrap values',
		description: ['Wrap long values at the given column'],
		examples: ['--wrap (80 by default)', '--wrap=82'],
		type: 'boolean | number',
		valueIfTrue: 80,
	},
	{
		key: 'version',
		cli: { '--version': true, '-v': true },
		title: 'Version',
		description: ['Show bibtex-tidy version.'],
		type: 'boolean',
	},
	{
		key: 'quiet',
		cli: { '--quiet': true },
		title: 'Quiet',
		description: ['Suppress logs and warnings.'],
		type: 'boolean',
	},
	{
		key: 'backup',
		cli: { '--backup': true, '--no-backup': false },
		title: 'Backup',
		description: ['Make a backup <filename>.original. Enabled by default.'],
		type: 'boolean',
		defaultValue: true,
	},
];
