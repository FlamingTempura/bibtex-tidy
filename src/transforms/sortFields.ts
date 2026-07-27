import {
	type BlockNode,
	type EntryNode,
	isNodeType,
} from "../parsers/bibtexParser.ts";

import type { Transform } from "../types.ts";

export function createSortFieldsTransform(sortFields: string[]): Transform {
	return {
		name: "sort-fields",
		apply: (ast) => {
			ast.replace(
				(node): node is BlockNode & { block: { type: "entry" } } =>
					isNodeType(node, "block") && isNodeType(node.block, "entry"),
				(node) => [
					node.with({ block: sortEntryFields(node.block, sortFields) }),
				],
			);
		},
	};
}

function sortEntryFields(entry: EntryNode, fieldOrder: string[]): EntryNode {
	const fields = [...entry.fields].sort((a, b) => {
		const orderA = fieldOrder.indexOf(a.name.toLocaleLowerCase());
		const orderB = fieldOrder.indexOf(b.name.toLocaleLowerCase());
		if (orderA === -1 && orderB === -1) return 0;
		if (orderA === -1) return 1;
		if (orderB === -1) return -1;
		if (orderB < orderA) return 1;
		if (orderB > orderA) return -1;
		return 0;
	});
	return entry.with({ fields });
}
