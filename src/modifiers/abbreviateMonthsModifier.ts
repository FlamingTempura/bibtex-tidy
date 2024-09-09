import { MONTH_CONVERSIONS } from "../months";
import { LiteralNode } from "../parsers/bibtexParser";
import type { Modifier } from "../types";

export const abbreviateMonthsModifier: Modifier = {
	type: "FieldModifier",
	condition: (fieldName, options) =>
		Boolean(options.months && fieldName === "month"),
	modifyNode: (node) => {
		const concatNode = node.value;
		for (let i = 0; i < concatNode.concat.length; i++) {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			const child = concatNode.concat[i]!;
			const abbreviation = MONTH_CONVERSIONS[child.value.toLowerCase()];
			if (abbreviation) {
				concatNode.concat[i] = new LiteralNode(concatNode, abbreviation);
			}
		}
	},
};
