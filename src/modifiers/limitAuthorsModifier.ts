import type { Modifier } from "../types";

export const limitAuthorsModifier: Modifier<number> = {
	type: "FieldModifier",
	condition: (fieldName, options) =>
		fieldName === "author" && options.maxAuthors ? options.maxAuthors : false,
	modifyRenderedValue: (str, maxAuthors) => {
		// TODO: use author parser?
		const authors = str.split(" and ");
		if (authors.length > maxAuthors) {
			return [...authors.slice(0, maxAuthors), "others"].join(" and ");
		}
		return str;
	},
};
