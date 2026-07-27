import type { DuplicateRule } from "./optionUtils.ts";
import type { RootNode } from "./parsers/bibtexParser.ts";

export type Transform = {
	name: string;
	dependencies?: string[];
	apply: (ast: RootNode) => {
		ast: RootNode;
		warnings?: Warning[];
	};
};

export type Warning = (
	| { code: "MISSING_KEY" }
	| { code: "DUPLICATE_ENTRY"; rule: DuplicateRule }
	| { code: "UNSUPPORTED_ESCAPE"; character: string; codepoint: string }
) & {
	message: string;
};

export type BibTeXTidyResult = {
	bibtex: string;
	warnings: Warning[];
	count: number;
};
