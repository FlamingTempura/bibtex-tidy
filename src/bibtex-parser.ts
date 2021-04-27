//@ts-ignore
import bibtexParser from './bibtex.pegjs.js';

type BibTexField = { name: string; raw: string } & (
	| { datatype: 'quoted' | 'braced'; value: string }
	| { datatype: 'number'; value: BigInt }
	| { datatype: 'null'; value: null }
	| { datatype: 'identifier'; value: string }
	| { datatype: 'concatenate'; value: BibTexField[] }
);

type BibTeXString = {
	itemtype: 'string';
	name: string;
	raw: string;
};

type BibTeXComment = {
	itemtype: 'comment';
	comment: string;
};

type BibTeXPreamble = {
	itemtype: 'preamble';
	raw: string;
};

export type BibTeXEntry = {
	itemtype: 'entry';
	key?: string;
	type: string;
	fields: BibTexField[];
	fieldMap: Map<string, ValueString>;
	duplicate?: boolean;
};

export type ValueString = {
	value: string | null;
	datatype: BibTexField['datatype'];
};

export type BibTeXItem =
	| BibTeXString
	| BibTeXEntry
	| BibTeXPreamble
	| BibTeXComment;

export const parse = bibtexParser.parse as (input: string) => BibTeXItem[];
