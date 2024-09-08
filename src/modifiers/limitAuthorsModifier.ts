import type { Cache } from "../cache";
import type { OptionsNormalized } from "../optionUtils";
import type { ConcatNode, EntryNode, FieldNode } from "../parsers/bibtexParser";

/**
 * Modifies the AST prior to formatting
 */
export type Modifier<Params> = {
	condition: (
		fieldName: string,
		options: OptionsNormalized,
		entry: EntryNode,
		cache: Cache,
	) => Params | false;
	modifyRenderedValue?: (value: string, params: Params) => string;
	modifyNode?: (node: FieldNode, params: Params) => void;
};

export const limitAuthorsModifier: Modifier<number> = {
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
