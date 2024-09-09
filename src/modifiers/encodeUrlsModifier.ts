import type { Modifier } from "../types";

export const encodeUrlsModifier: Modifier = {
	type: "FieldModifier",
	condition: (fieldName, options) =>
		Boolean(fieldName === "url" && options.encodeUrls),
	modifyRenderedValue: (str) => str.replace(/\\?_/g, "\\%5F"),
};
