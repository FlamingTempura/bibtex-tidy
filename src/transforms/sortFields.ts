import type { BlockNode, EntryNode } from "../parsers/bibtexParser.ts";

import type { Transform } from "../types.ts";

export function createSortFieldsTransform(sortFields: string[]): Transform {
	return {
		name: "sort-fields",
		apply: (astProxy) => {
			astProxy.walk({
				where: (node): node is BlockNode =>
					node.type === "block" && node.block?.type === "entry",
				enter: (node) => {
					if (node.block?.type === "entry") {
						sortEntryFields(node.block, sortFields);
					}
					return [node];
				},
			});
			return undefined;
		},
	};
}

function sortEntryFields(entry: EntryNode, fieldOrder: string[]): void {
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
