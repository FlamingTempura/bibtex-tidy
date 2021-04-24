//@ts-ignore
import bibtexParser from './bibtex.pegjs.js';

type BibTeXFieldDatatype =
	| 'concatenate'
	| 'braced'
	| 'quoted'
	| 'number'
	| 'identifier';

type BibTexValue = string | bigint | SingleField[];

type SingleField = {
	name: string;
	datatype: Exclude<BibTeXFieldDatatype, 'concatenate'>;
	value: Exclude<BibTexValue, SingleField[]>;
	raw: string;
};

type ConcatField = {
	name: string;
	datatype: 'concatenate';
	value: SingleField[];
	raw: string;
};

type BibTexField = SingleField | ConcatField;

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
	value: string;
	datatype: BibTeXFieldDatatype;
};

export type BibTeXItem =
	| BibTeXString
	| BibTeXEntry
	| BibTeXPreamble
	| BibTeXComment;

export const parse = bibtexParser.parse as (input: string) => BibTeXItem[];
