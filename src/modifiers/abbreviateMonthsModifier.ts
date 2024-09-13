import type { ASTProxy } from "../cache";
import { type FieldNode, LiteralNode } from "../parsers/bibtexParser";
import type { Transformation } from "../types";

export function createAbbreviateMonthsTransformation(): Transformation {
	return {
		name: "abbreviate-months",
		apply: (astProxy) => {
			for (const field of astProxy.allFields()) {
				abbreviateMonthInField(astProxy, field);
			}
			return undefined;
		},
	};
}

function abbreviateMonthInField(astProxy: ASTProxy, field: FieldNode) {
	if (field.name.toLowerCase() === "month") {
		astProxy.setFieldValue(
			field,
			field.value.concat.map((node) => {
				const abbr = abbreviateMonth(node.value);
				return abbr ? new LiteralNode(node.parent, abbr) : node;
			}),
		);
	}
}

function abbreviateMonth(month: string): string | undefined {
	return MONTH_CONVERSIONS[month.toLowerCase()];
}

const MONTH_CONVERSIONS: Record<string, string> = {
	"1": "jan",
	"2": "feb",
	"3": "mar",
	"4": "apr",
	"5": "may",
	"6": "jun",
	"7": "jul",
	"8": "aug",
	"9": "sep",
	"10": "oct",
	"11": "nov",
	"12": "dec",
	jan: "jan",
	feb: "feb",
	mar: "mar",
	apr: "apr",
	may: "may",
	jun: "jun",
	jul: "jul",
	aug: "aug",
	sep: "sep",
	oct: "oct",
	nov: "nov",
	dec: "dec",
	january: "jan",
	february: "feb",
	march: "mar",
	april: "apr",
	june: "jun",
	july: "jul",
	august: "aug",
	september: "sep",
	october: "oct",
	november: "nov",
	december: "dec",
};
