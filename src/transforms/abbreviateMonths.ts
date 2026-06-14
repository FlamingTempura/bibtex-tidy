import { LiteralNode, type ValueNode } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { renderValueNode } from "../valueNodes.ts";

/**
 * It’s generally recommended to store months in BibTeX files using the macros jan, feb,
 * and so on. Whether they’re recognised depends on the particular BibTeX style, but most
 * of them do support those macros. Biber also supports these macros.
 * - https://www.bibtex.com/f/month-field/
 * - https://texdoc.org/serve/biber.pdf/0
 */

export const monthAliases: Record<string, string[]> = {
	jan: ["1", "jan", "january"],
	feb: ["2", "feb", "february"],
	mar: ["3", "mar", "march"],
	apr: ["4", "apr", "april"],
	may: ["5", "may", "may"],
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
			astProxy.walk({
				where: (node, ctx): node is ValueNode => {
					if (
						node.type !== "literal" &&
						node.type !== "braced" &&
						node.type !== "quoted"
					) {
						return false;
					}

					const field = ctx.closestAncestor("field");
					return field?.name.toLowerCase() === "month";
				},
				enter: (node) => {
					const abbr = abbreviateMonth(renderValueNode(node), months);
					return abbr ? [new LiteralNode(node.parent, abbr)] : [node];
				},
			});
			return undefined;
		},
	};
}

function abbreviateMonth(
	month: string,
	months: Map<string, string>,
): string | undefined {
	return months.get(month.toLowerCase());
}
