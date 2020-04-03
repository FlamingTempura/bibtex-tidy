type BibTeXFieldDatatype = 'concatinate' | 'braced' | 'quoted';
type BibTexValue = number | string | BigInt | SingleField[];

type SingleField = {
	name: string;
	value: number | string | BigInt;
	datatype: 'braced' | 'quoted';
};

type ConcatField = {
	name: string;
	datatype: 'concatinate';
	value: SingleField[];
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
type BibTeXEntry = {
	itemtype: 'entry';
	key: string;
	type: string;
	fields: BibTexField[];
};

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
