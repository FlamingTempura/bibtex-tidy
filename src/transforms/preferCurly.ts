import { BracedNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";
import { monthAliases } from "./abbreviateMonths.ts";

export function createPreferCurlyTransform(): Transform {
	return {
		name: "prefer-curly",
		apply: (ast) => {
			for (const field of ast.fields()) {
				if (
					field.name.toLowerCase() === "month" &&
					monthAliases[ast.lookupRenderedEntryValue(field)]
				) {
					continue;
				}
				field.value.concat = field.value.concat.map((child) => {
					if (child.type === "braced") return child;
					const braced = new BracedNode(child.parent);
					replaceValueNodeText(braced, renderValueNode(child));
					return braced;
				});
				ast.invalidateField(field);
			}
			return undefined;
		},
	};
}
