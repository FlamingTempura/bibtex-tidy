import type { EntryNode, FieldNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createRemoveDuplicateFieldsTransform(): Transform {
	return {
		name: "remove-duplicate-fields",
		apply: (astProxy) => {
			const seenFieldsByEntry = new WeakMap<EntryNode, Set<string>>();
			astProxy.walk({
				where: (node): node is FieldNode => node.type === "field",
				enter: (field) => {
					const seenFields = seenFieldsByEntry.getOrInsert(
						field.parent,
						new Set(),
					);
					const fieldName = field.name.toLocaleLowerCase();
					if (seenFields.has(fieldName)) return [];

					seenFields.add(fieldName);
					return [field];
				},
			});
			return undefined;
		},
	};
}
