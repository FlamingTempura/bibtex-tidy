import type { EntryNode } from "../parsers/bibtexParser";

import type { Transform } from "../types";

export function createSortFieldsTransform(sortFields: string[]): Transform {
	return {
		name: "sort-fields",
		apply: (astProxy) => {
			const entries = astProxy.entries();
			sortEntryFields(entries, sortFields);
			return undefined;
		},
	};
}

function sortEntryFields(entries: EntryNode[], fieldOrder: string[]): void {
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
