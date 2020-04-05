type BibTeXFieldDatatype =
	| 'concatinate'
	| 'braced'
	| 'quoted'
	| 'number'
	| 'identifier';
type BibTexValue = number | string | bigint | SingleField[];

type SingleField = {
	name: string;
	datatype: Exclude<BibTeXFieldDatatype, 'concatinate'>;
	value: Exclude<BibTexValue, SingleField[]>;
	raw: string;
};

type ConcatField = {
	name: string;
	datatype: 'concatinate';
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
interface BibTeXEntry {
	itemtype: 'entry';
	key?: string;
	type: string;
	fields: BibTexField[];
}

interface BibTeXEntry {
	fieldMap: Map<string, ValueString>;
	duplicate?: boolean;
}

interface ValueString {
	value: string;
	datatype: BibTeXFieldDatatype;
}

type BibTeXItem = BibTeXString | BibTeXEntry | BibTeXPreamble | BibTeXComment;

type CharacterMapping = [string, string];

declare module '*.tsv' {
	const value: CharacterMapping[]; // Add better type definitions here if desired.
	export default value;
}

declare module 'bibtex-parse' {
	const value: any;
	export function parse(input: string): BibTeXItem[];
}
