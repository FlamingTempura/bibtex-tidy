import type { Warning } from ".";
import type { Cache } from "./cache";
import type { OptionsNormalized } from "./optionUtils";
import type { EntryNode, FieldNode, RootNode } from "./parsers/bibtexParser";

/**
 * Modifies the AST prior to formatting
 */
export type Modifier<Params = boolean> =
	| {
			type: "FieldModifier";
			condition: (
				fieldName: string,
				options: OptionsNormalized,
				entry: EntryNode,
				cache: Cache,
			) => Params | false;
			modifyRenderedValue?: (value: string, params: Params) => string;
			modifyNode?: (node: FieldNode, params: Params) => void;
	  }
	| {
			type: "RootModifier";
			condition: (options: OptionsNormalized) => Params | false;
			modifyRoot: (
				root: RootNode,
				cache: Cache,
				params: Params,
			) => Warning[] | undefined;
	  };
