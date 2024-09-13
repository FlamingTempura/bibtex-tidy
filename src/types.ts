import type { ASTProxy } from "./ASTProxy";
import type { DuplicateRule } from "./optionUtils";

export type Transform = {
	name: string;
	dependencies?: string[];
	apply: (ast: ASTProxy) => Warning[] | undefined;
};

export type Warning = (
	| { code: "MISSING_KEY" }
	| { code: "DUPLICATE_ENTRY"; rule: DuplicateRule }
) & {
	message: string;
};

export type BibTeXTidyResult = {
	bibtex: string;
	warnings: Warning[];
	count: number;
};
