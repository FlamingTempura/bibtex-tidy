type Options = {
	/**
	 * Remove fields - Remove specified fields from bibliography entries.
	 * @example --omit=id,name
	 */
	omit?: string[];
	/**
	 * Enclose values in curly braces - Enclose all property values in braces.
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
	 * Indent with spaces - Prefix all fields with the specified number of
	 * spaces (ignored if tab is set).
	 * @example --space=2 (default)
	 * @example --space=4
	 * */
	space?: true | number;
	/**
	 * Indent with tabs - Prefix all fields with a tab.
	 * */
	tab?: boolean;
	/**
	 * Align values - Insert whitespace between fields and values so that values are visually aligned.
	 * @example --align=14 (default)
	 * @example --no-align'
	 * */
	align?: false | number;
	/**
	 * Sort bibliography entries - Sort entries by specified fields. For descending order, prefix the field with a dash (-).
	 * @example--sort (sort by id)',
	 * @example --sort=-year,name (sort year descending then name ascending)',
	 * @example --sort=name,year'
	 * */
	sort?: boolean | string[];
	/**
	 * Merge duplicate entries - Two entries are considered duplicates in the
	 * following cases: (a) their DOIs are identical, (b) their abstracts are
	 * identical, or (c) their authors and titles are both identical. The
	 * firstmost entry is kept and any extra properties from duplicate entries
	 * are incorporated.
	 * @example --merge (merge using any strategy)
	 * @example --merge doi (merge only if DOIs are identicals)
	 * @example --merge key (merge only if IDs are identicals)
	 * @example --merge abstract (merge only if abstracts are similar)
	 * @example --merge citation (merge only if author and titles are similar)
	 * @example --merge doi, key (use doi and key strategies)
	 * */
	merge?: boolean | UniqueKey[];
	/**
	 * Merge strategy - How duplicate entries should be merged.
	 * - first: only keep the original entry
	 * - last: only keep the last found duplicate
	 * - combine: keep original entry and merge in fields of duplicates if they
	 *   do not already exist
	 * - overwrite: keep original entry and merge in fields of duplicates,
	 *   overwriting existing fields if they exist
	 */
	mergeStrategy?: MergeStrategy;
	/**
	 * Strip double-braced values - Where an entire value is enclosed in double
	 * braces, remove the extra braces. For example, {{Journal of Tea}} will
	 * become {Journal of Tea}.
	 * */
	stripEnclosingBraces?: boolean;
	/**
	 * Drop all caps - Where values are all caps, make them title case. For
	 * example, {JOURNAL OF TEA} will become {Journal of Tea}.
	 * */
	dropAllCaps?: boolean;
	/**
	 * Escape special characters - Escape special characters, such as umlaut.
	 * This ensures correct typesetting with latex.
	 * @example --escape (default)
	 * @example --no-escape
	 * */
	escape?: boolean;
	/**
	 * Sort fields - Sort the fields within entries. The default sort order is
	 * XXX. Alternatively, you can specify field names delimed by spaces or
	 * commas.
	 * @example --sort-fields=name,author
	 * */
	sortFields?: boolean | string[];
	/**
	 * Alias of sort fields (legacy)
	 * @deprecated
	 */
	sortProperties?: boolean | string[];
	/**
	 * Remove comments - Remove all comments from the bibtex source
	 * */
	stripComments?: boolean;
	/**
	 * Encode URLs - Replace invalid URL characters with percent encoded values.
	 * */
	encodeUrls?: boolean;
	/**
	 * Tidy comments - Remove whitespace surrounding
	 * */
	tidyComments?: boolean;
};
