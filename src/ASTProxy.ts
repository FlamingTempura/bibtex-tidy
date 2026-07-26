import { formatValue } from "./format.ts";
import type {
	BlockNode,
	ConcatNode,
	EntryNode,
	FieldNode,
	Node,
	RootNode,
	TextNode,
	ValueNode,
} from "./parsers/bibtexParser.ts";
import { isNodeType } from "./parsers/bibtexParser.ts";
import { parseLaTeX } from "./parsers/latexParser.ts";

export function getField(
	entry: EntryNode,
	fieldName: string,
): FieldNode | undefined {
	const fieldNameLc = fieldName.toLocaleLowerCase();
	return entry.fields.find(
		(field) => field.name.toLocaleLowerCase() === fieldNameLc,
	);
}

export type ReplaceableNode =
	| TextNode
	| BlockNode
	| FieldNode
	| ConcatNode
	| ValueNode;

export type WalkRule<N extends ReplaceableNode> = {
	where?: (node: Node, ctx: WalkContext) => node is N;
	enter: (node: N, ctx: WalkContext) => N[];
};

export class ASTProxy {
	#ast: RootNode;
	constructor(ast: RootNode) {
		this.#ast = ast;
	}

	public root(): RootNode {
		return this.#ast;
	}

	public entries(): EntryNode[] {
		return this.#ast.children
			.filter((node) => isNodeType(node, "block"))
			.map((block) => block.block)
			.filter((entry) => isNodeType(entry, "entry"));
	}

	public walk<N extends ReplaceableNode>(rule: WalkRule<N>): void {
		let mutated = false;

		const replaceNodes = <T extends ReplaceableNode>(
			nodes: T[],
			index: number,
			replacements: T[],
			parent: RootNode | EntryNode | ConcatNode,
		): number => {
			for (const replacement of replacements) {
				let existingIndex = nodes.indexOf(replacement);
				while (existingIndex !== -1 && existingIndex !== index) {
					nodes.splice(existingIndex, 1);
					if (existingIndex < index) index--;
					existingIndex = nodes.indexOf(replacement);
				}
			}
			nodes.splice(index, 1, ...replacements);
			for (const replacement of replacements) {
				setParent(replacement, parent);
			}
			mutated = true;
			return index;
		};

		const enter = <T extends ReplaceableNode>(
			node: T,
			ancestors: Node[],
		): T[] | undefined => {
			const ctx = new WalkContext(ancestors);
			return !rule.where || rule.where(node, ctx)
				? (rule.enter(node as unknown as N, ctx) as unknown as T[])
				: undefined;
		};

		const visitReplaceable = <T extends ReplaceableNode>(
			nodes: T[],
			index: number,
			ancestors: Node[],
			parent: RootNode | EntryNode | ConcatNode,
		): number => {
			const node = nodes[index];
			if (!node) return index + 1;

			const replacements = enter(node, ancestors);
			if (replacements) {
				const replacementIndex = replaceNodes(
					nodes,
					index,
					replacements,
					parent,
				);
				for (const replacement of replacements) {
					visitChildren(replacement, [...ancestors, replacement]);
				}
				return replacementIndex + replacements.length;
			}

			visitChildren(node, [...ancestors, node]);
			return index + 1;
		};

		const visitConcat = (
			node: ConcatNode,
			ancestors: Node[],
			parent: FieldNode,
		): void => {
			const replacements = enter(node, ancestors);
			if (!replacements) {
				visitChildren(node, [...ancestors, node]);
				return;
			}
			if (replacements.length !== 1) {
				throw new Error("A concat node must be replaced by exactly one node");
			}

			const replacement = replacements[0];
			if (!replacement) return;
			parent.value = replacement;
			setParent(replacement, parent);
			mutated = true;
			visitChildren(replacement, [...ancestors, replacement]);
		};

		const visitChildren = (node: Node, ancestors: Node[]): void => {
			switch (node.type) {
				case "root":
					for (let i = 0; i < node.children.length; ) {
						i = visitReplaceable(node.children, i, ancestors, node);
					}
					break;
				case "block":
					if (node.block) {
						visitChildren(node.block, [...ancestors, node.block]);
					}
					break;
				case "entry":
					for (let i = 0; i < node.fields.length; ) {
						i = visitReplaceable(node.fields, i, ancestors, node);
					}
					break;
				case "field":
					visitConcat(node.value, ancestors, node);
					break;
				case "concat":
					for (let i = 0; i < node.concat.length; ) {
						i = visitReplaceable(node.concat, i, ancestors, node);
					}
					break;
				default:
					break;
			}
		};

		visitChildren(this.#ast, [this.#ast]);
		if (mutated) {
			this.renderValueLookup.clear();
		}
	}

	private renderValueLookup = new Map<FieldNode, string>();

	/** Render a field's value as text. Results are memoized by FieldNode until the AST is mutated. */
	public renderFieldValue(field: FieldNode): string {
		let value = this.renderValueLookup.get(field);
		if (value === undefined) {
			const entryValue = formatValue(field) ?? "";
			value = parseLaTeX(entryValue).renderAsText();
			this.renderValueLookup.set(field, value);
		}
		return value;
	}
}

class WalkContext {
	private ancestors: Node[];

	constructor(ancestors: Node[]) {
		this.ancestors = ancestors;
	}

	public closestAncestor<T extends Node["type"]>(
		type: T,
	): Extract<Node, { type: T }> | undefined {
		for (let i = this.ancestors.length - 1; i >= 0; i--) {
			const ancestor = this.ancestors[i];
			if (isNodeType(ancestor, type)) return ancestor;
		}
		return undefined;
	}
}

function setParent(
	node: ReplaceableNode,
	parent: RootNode | EntryNode | FieldNode | ConcatNode,
): void {
	switch (node.type) {
		case "text":
		case "block":
			if (isNodeType(parent, "root")) node.parent = parent;
			if (isNodeType(node, "block") && node.block) {
				node.block.parent = node;
				if (isNodeType(node.block, "entry")) {
					for (const field of node.block.fields) {
						setParent(field, node.block);
					}
				}
			}
			break;
		case "field":
			if (isNodeType(parent, "entry")) node.parent = parent;
			setParent(node.value, node);
			break;
		case "concat":
			if (isNodeType(parent, "field")) node.parent = parent;
			for (const child of node.concat) {
				child.parent = node;
			}
			break;
		case "literal":
		case "braced":
		case "quoted":
			if (isNodeType(parent, "concat")) node.parent = parent;
			break;
	}
}
