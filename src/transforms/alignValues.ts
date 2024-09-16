import type { Transform } from "../types";

export function createAlignValuesTransform(column: number): Transform {
	return {
		name: "align-values",
		apply: (astProxy) => {
			const fields = astProxy.fields();
			for (const field of fields) {
				const gap = Math.max(column - field.name.length, 1);
				field.value.whitespacePrefix = " ".repeat(gap);
			}
			return undefined;
		},
	};
}
