import type { Modifier } from "./limitAuthorsModifier";

// url encode must happen before escape special characters
export const encodeUrlsModifier: Modifier<boolean> = {
	condition: (fieldName, options) =>
		Boolean(fieldName === "url" && options.encodeUrls),
	modifyRenderedValue: (str) => str.replace(/\\?_/g, "\\%5F"),
};
