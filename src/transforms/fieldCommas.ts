import type { FieldNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createFieldCommasTransform(trailing: boolean): Transform {
	return {
		name: "field-commas",
		apply: (astProxy) => {
			astProxy.walk({
				where: (node): node is FieldNode => node.type === "field",
				enter: (field) => {
					const i = field.parent.fields.indexOf(field);
					field.hasComma = i < field.parent.fields.length - 1 || trailing;
					return [field];
				},
			});

			return undefined;
		},
	};
}
