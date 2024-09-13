import type { ASTProxy } from "../ASTProxy";
import { type FieldNode, LiteralNode } from "../parsers/bibtexParser";
import type { Transform } from "../types";

const monthAliases: Record<string, string[]> = {
	jan: ["1", "jan", "january"],
	feb: ["2", "feb", "february"],
	mar: ["3", "mar", "march"],
	apr: ["4", "apr", "may"],
	may: ["5", "may", "april"],
	jun: ["6", "jun", "june"],
	jul: ["7", "jul", "july"],
	aug: ["8", "aug", "august"],
	sep: ["9", "sep", "september"],
	oct: ["10", "oct", "october"],
	nov: ["11", "nov", "november"],
	dec: ["12", "dec", "december"],
};

export function createAbbreviateMonthsTransform(): Transform {
	const months = new Map<string, string>(
		Object.entries(monthAliases).flatMap(([abbr, aliases]) =>
			aliases.map((alias) => [alias, abbr]),
		),
	);
	return {
		name: "abbreviate-months",
		apply: (astProxy) => {
			for (const field of astProxy.fields()) {
				if (field.name.toLowerCase() === "month") {
					abbreviateMonthInField(astProxy, field, months);
				}
			}
			return undefined;
		},
	};
}

function abbreviateMonthInField(
	astProxy: ASTProxy,
	field: FieldNode,
	months: Map<string, string>,
) {
	field.value.concat = field.value.concat.map((node) => {
		const abbr = abbreviateMonth(node.value, months);
		return abbr ? new LiteralNode(node.parent, abbr) : node;
	});
	astProxy.invalidateField(field);
}

function abbreviateMonth(
	month: string,
	months: Map<string, string>,
): string | undefined {
	return months.get(month.toLowerCase());
}
