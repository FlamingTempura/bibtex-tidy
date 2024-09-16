import type { Transform } from "../types";

export function createIndentFieldsTransform(indent: string): Transform {
	return {
		name: "indent",
		apply: (astProxy) => {
			const fields = astProxy.fields();
			for (const field of fields) {
				field.whitespacePrefix = `\n${indent}`;
			}
			return undefined;
		},
	};
}
