import { BlockNode, TextNode, EntryNode, RootNode } from './bibtex-parser';

type SortIndex = Map<string, string>;

export function sortEntries(
	ast: RootNode,
	fieldMaps: Map<EntryNode, Map<string, string | undefined>>,
	sort: string[]
): void {
	if (!sort) return;

	// Map of items to sort values e.g. { year: 2009, author: 'West', ... }
	const sortIndexes: Map<TextNode | BlockNode, SortIndex> = new Map();

	// comments, preambles, and strings which should be kept with an entry
	const precedingMeta: (TextNode | BlockNode)[] = [];

	// first, create sort indexes
	for (const item of ast.children) {
		if (item.type === 'text' || item.block?.type !== 'entry') {
			// if string, preamble, or comment, then use sort index of previous entry
			precedingMeta.push(item);
			continue;
		}
		const sortIndex: SortIndex = new Map();
		for (let key of sort) {
			// dash prefix indicates descending order, deal with this later
			if (key.startsWith('-')) key = key.slice(1);
			let val: string;
			if (key === 'key') {
				val = item.block.key ?? '';
			} else if (key === 'type') {
				val = item.command;
			} else {
				val = fieldMaps.get(item.block)?.get(key) ?? '';
			}
			sortIndex.set(key, val.toLowerCase());
		}
		sortIndexes.set(item, sortIndex);
		// update comments above to this index
		while (precedingMeta.length > 0) {
			sortIndexes.set(precedingMeta.pop()!, sortIndex);
		}
	}

	// Now iterate through sort keys and sort entries
	for (let i = sort.length - 1; i >= 0; i--) {
		const desc = sort[i].startsWith('-');
		const key = desc ? sort[i].slice(1) : sort[i];
		ast.children.sort((a, b) => {
			// if no value, then use \ufff0 so entry will be last
			const ia = sortIndexes.get(a)?.get(key) ?? '\ufff0';
			const ib = sortIndexes.get(b)?.get(key) ?? '\ufff0';
			return (desc ? ib : ia).localeCompare(desc ? ia : ib);
		});
	}
}

export function sortEntryFields(
	entries: EntryNode[],
	fieldOrder: string[]
): void {
	for (const entry of entries) {
		entry.fields.sort((a, b) => {
			const orderA = fieldOrder.indexOf(a.name.toLocaleLowerCase());
			const orderB = fieldOrder.indexOf(b.name.toLocaleLowerCase());
			if (orderA === -1 && orderB === -1) return 0;
			if (orderA === -1) return 1;
			if (orderB === -1) return -1;
			if (orderB < orderA) return 1;
			if (orderB > orderA) return -1;
			return 0;
		});
	}
}
