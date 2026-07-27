import { type FieldNode, isNodeType } from "./parsers/bibtexParser.ts";

export function renderFieldValue(field: FieldNode): string {
	return field.value.values
		.map((node) =>
			isNodeType(node, "literal") ? node.value : node.latexAst.renderAsText(),
		)
		.join(" # ");
}
