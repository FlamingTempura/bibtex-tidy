import type { Transformation } from "../types";

export const encodeUrlsModifier: Transformation = {
	name: "encode-urls",
	type: "FieldModifier",
	condition: (fieldName, options) =>
		Boolean(fieldName === "url" && options.encodeUrls),
	modifyRenderedValue: (str) => str.replace(/\\?_/g, "\\%5F"),
};
