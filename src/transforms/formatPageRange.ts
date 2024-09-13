import type { Transform } from "../types";

/** Replace single dash with double dash in page range **/
export function createFormatPageRangeTransform(): Transform {
	return {
		name: "format-page-range",
		apply(ast) {
			for (const field of ast.fields()) {
				if (field.name.toLocaleLowerCase() === "pages") {
					for (const entry of field.value.concat) {
						entry.value = formatPageRange(entry.value);
					}
					ast.invalidateField(field);
				}
			}
			return undefined;
		},
	};
}

function formatPageRange(str: string): string {
	let result = str;
	// TODO: replace with replaceAll when more widespread node support
	for (let i = 0; i < 4; i++) {
		result = result.replace(/(\d)\s*-\s*(\d)/g, "$1--$2");
	}
	return result;
}
