import type { ValueNode } from "./parsers/bibtexParser.ts";
import {
	BlockNode,
	parseLaTeX,
	stringifyLaTeX,
} from "./parsers/latexParser.ts";

export function renderValueNode(node: ValueNode): string {
	return node.type === "literal" ? node.value : stringifyLaTeX(node.latexAst);
}

export function replaceValueNodeText(node: ValueNode, value: string): void {
	if (node.type === "literal") {
		node.value = value;
	} else {
		node.latexAst = parseLaTeX(value);
	}
}

export function doubleEncloseLatex(latex: BlockNode): string {
	const alreadyDoubleEnclosed =
		latex.children.length === 1 &&
		latex.children[0]?.type === "block" &&
		latex.children[0]?.kind === "curly" &&
		latex.children[0].children.length === 1 &&
		latex.children[0].children[0]?.type === "block" &&
		latex.children[0].children[0]?.kind === "curly";

	const result = stringifyLaTeX(latex);
	return alreadyDoubleEnclosed ? result : `{${result}}`;
}

export function encloseLatexInCurly(latex: BlockNode): BlockNode {
	if (
		latex.children.length === 1 &&
		latex.children[0]?.type === "block" &&
		latex.children[0]?.kind === "curly" &&
		latex.children[0].children.length === 1 &&
		latex.children[0].children[0]?.type === "block" &&
		latex.children[0].children[0]?.kind === "curly"
	) {
		return latex;
	}

	const result = new BlockNode("root");
	const wrapper = new BlockNode("curly", result);
	wrapper.children = latex.children;
	for (const child of wrapper.children) {
		child.parent = wrapper;
	}
	return result;
}
