import type { ASTProxy } from "../ASTProxy";
import type { BlockNode, RootNode, TextNode } from "../parsers/bibtexParser";
import type { Transform } from "../types";

const MONTH_MACROS = [
	"jan",
	"feb",
	"mar",
	"apr",
	"may",
	"jun",
	"jul",
	"aug",
	"sep",
	"oct",
	"nov",
	"dec",
] as const;

export function createSortEntriesTransform(sort: string[]): Transform {
	return {
		name: "sort-entries",
		dependencies: ["generate-keys", "merge-entries", "prefer-numeric"],
		apply: (astProxy) => {
			sortEntries(astProxy.root(), astProxy, sort);
			return undefined;
		},
	};
}

type SortIndex = Map<string, string | number>;

function sortEntries(ast: RootNode, cache: ASTProxy, sort: string[]): void {
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
					const v = cache.lookupRenderedEntryValue(item.block, key);
					const i = v ? (MONTH_MACROS as readonly string[]).indexOf(v) : -1;
					val = i > -1 ? i : "";
					break;
				}

				case "special":
					val = isBibLaTeXSpecialEntry(item) ? 0 : 1;
					break;

				default:
					if (item.block?.type !== "entry") continue;
					val = cache.lookupRenderedEntryValue(item.block, key);
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
