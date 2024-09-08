import type { Cache } from "./cache";
import { MONTH_MACROS } from "./months";
import type {
	BlockNode,
	EntryNode,
	RootNode,
	TextNode,
} from "./parsers/bibtexParser";

type SortIndex = Map<string, string | number>;

export function sortEntries(ast: RootNode, cache: Cache, sort: string[]): void {
	// Map of items to sort values e.g. { year: 2009, author: 'West', ... }
	const sortIndexes = new Map<TextNode | BlockNode, SortIndex>();

	// comments, preambles, and strings which should be kept with an entry
	const precedingMeta: (TextNode | BlockNode)[] = [];

	// first, create sort indexes
	for (const item of ast.children) {
		if (
			item.type === "text" ||
			(item.block?.type !== "entry" && !sort.includes("special"))
		) {
			// if string, preamble, or comment, then use sort index of previous entry
			precedingMeta.push(item);
			continue;
		}
		const sortIndex: SortIndex = new Map();
		for (let key of sort) {
			// dash prefix indicates descending order, deal with this later
			if (key.startsWith("-")) key = key.slice(1);
			let val: string | number;
			switch (key) {
				case "key":
					if (item.block?.type !== "entry") continue;
					val = item.block.key ?? "";
					break;

				case "type":
					val = item.command;
					break;

				case "month": {
					if (item.block?.type !== "entry") continue;
					const v = cache.lookupEntryValue(item.block, key);
					const i = v ? (MONTH_MACROS as readonly string[]).indexOf(v) : -1;
					val = i > -1 ? i : "";
					break;
				}

				case "special":
					val = isBibLaTeXSpecialEntry(item) ? 0 : 1;
					break;

				default:
					if (item.block?.type !== "entry") continue;
					val = cache.lookupEntryValue(item.block, key);
			}
			sortIndex.set(key, typeof val === "string" ? val.toLowerCase() : val);
		}
		sortIndexes.set(item, sortIndex);
		// update comments above to this index
		while (precedingMeta.length > 0) {
			const index = precedingMeta.pop();
			if (!index) break;
			sortIndexes.set(index, sortIndex);
		}
	}

	// Now iterate through sort keys and sort entries
	for (const prefixedKey of [...sort].reverse()) {
		const desc = prefixedKey.startsWith("-");
		const key = desc ? prefixedKey.slice(1) : prefixedKey;
		ast.children.sort((a, b) => {
			// if no value, then use \ufff0 so entry will be last
			let ia = sortIndexes.get(a)?.get(key) ?? "\ufff0";
			let ib = sortIndexes.get(b)?.get(key) ?? "\ufff0";
			if (typeof ia === "number") ia = String(ia).padStart(50, "0");
			if (typeof ib === "number") ib = String(ib).padStart(50, "0");
			return (desc ? ib : ia).localeCompare(desc ? ia : ib);
		});
	}
}

const SPECIAL_ENTRIES = new Set([
	"string",
	"preamble",
	// http://tug.ctan.org/info/biblatex-cheatsheet/biblatex-cheatsheet.pdf
	"set",
	"xdata",
]);

/**
 * BibLaTeX has two special entries: set and xdata. If they are at the top of the file, we
 * should keep them there.
 */
function isBibLaTeXSpecialEntry(node: BlockNode) {
	return SPECIAL_ENTRIES.has(node.command.toLowerCase());
}

export function sortEntryFields(
	entries: EntryNode[],
	fieldOrder: string[],
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
