import { walkAst } from "../ast.ts";
import type { EntryNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createSortFieldsTransform(sortFields: string[]): Transform {
	return {
		name: "sort-fields",
		apply: (ast) => ({
			ast: walkAst(ast, {
				entry: (entry) => [sortEntryFields(entry, sortFields)],
			}),
		}),
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
