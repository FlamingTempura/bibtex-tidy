import type { FieldNode } from "../parsers/bibtexParser";
import type { Transform } from "../types";

export function createFieldCommasTransform(trailing: boolean): Transform {
	return {
		name: "field-commas",
		apply: (astProxy) => {
			const entries = astProxy.entries();
			for (const entry of entries) {
				for (let i = 0; i < entry.fields.length; i++) {
					const field = entry.fields[i] as FieldNode;
					field.hasComma = i < entry.fields.length - 1 || trailing;
				}
			}

			return undefined;
		},
	};
}
