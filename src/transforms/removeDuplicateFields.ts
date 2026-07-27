import { closestAncestor, walkAst } from "../ast.ts";
import type { EntryNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createRemoveDuplicateFieldsTransform(): Transform {
	const seenByEntry = new WeakMap<EntryNode, Set<string>>();
	return {
		name: "remove-duplicate-fields",
		apply: (ast) => ({
			ast: walkAst(ast, {
				field: (field, ctx) => {
					const entry = closestAncestor(ctx, "entry");
					if (!entry) return [field];

					const seen = seenByEntry.getOrInsert(entry, new Set());
					const name = field.name.toLocaleLowerCase();
					if (seen.has(name)) return [];

					seen.add(name);
					return [field];
				},
			}),
		}),
	};
}
