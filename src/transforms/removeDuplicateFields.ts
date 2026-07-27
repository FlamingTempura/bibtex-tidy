import { type EntryNode, isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createRemoveDuplicateFieldsTransform(): Transform {
	return {
		name: "remove-duplicate-fields",
		apply: (ast) => {
			const seenFieldsByEntry = new WeakMap<EntryNode, Set<string>>();
			ast.replace(
				(node) => isNodeType(node, "field"),
				(field) => {
					const seenFields = seenFieldsByEntry.getOrInsert(
						field.parent,
						new Set(),
					);
					const fieldName = field.name.toLocaleLowerCase();
					if (seenFields.has(fieldName)) return [];

					seenFields.add(fieldName);
					return [field];
				},
			);
		},
	};
}
