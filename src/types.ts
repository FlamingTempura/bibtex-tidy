import type { Warning } from ".";
import type { ASTProxy } from "./cache";
import type { OptionsNormalized } from "./optionUtils";
import type { EntryNode, FieldNode, RootNode } from "./parsers/bibtexParser";

/**
 * Modifies the AST prior to formatting
 */
export type Transformation = {
	name: string;
	dependencies?: string[];
} & (
	| {
			apply: (ast: ASTProxy) => Warning[] | undefined;
	  }
	| (
			| {
					type: "FieldModifier";
					condition: (
						fieldName: string,
						options: OptionsNormalized,
						entry: EntryNode,
						cache: ASTProxy,
					) => boolean;
					modifyRenderedValue?: (value: string) => string;
					modifyNode?: (node: FieldNode) => void;
			  }
			| {
					type: "RootModifier";
					condition: (options: OptionsNormalized) => boolean;
					modifyRoot: (
						root: RootNode,
						cache: ASTProxy,
					) => Warning[] | undefined;
			  }
	  )
);
