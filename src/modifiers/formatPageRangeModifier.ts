import type { Modifier } from "./limitAuthorsModifier";

/** Replace single dash with double dash in page range **/
export const formatPageRangeModifier: Modifier<boolean> = {
	condition: (fieldName) => fieldName === "pages",
	modifyRenderedValue: (str) => {
		let result = str;
		// TODO: replace with replaceAll when more widespread node support
		for (let i = 0; i < 4; i++) {
			result = result.replace(/(\d)\s*-\s*(\d)/g, "$1--$2");
		}
		return result;
	},
};
