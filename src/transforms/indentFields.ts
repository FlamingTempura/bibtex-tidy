import type { Transform } from "../types";

export function createIndentFieldsTransform(
	type: "space" | "tab",
	spaceQty: number,
): Transform {
	const indent: string = type === "tab" ? "\t" : " ".repeat(spaceQty);
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
