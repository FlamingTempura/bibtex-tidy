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
import { parseLaTeX } from "./parsers/latexParser.ts";

export type ReplaceableNode = TextNode | BlockNode | FieldNode | ValueNode;

export interface WalkRule<N extends ReplaceableNode> {
	where?: (node: Node, ctx: WalkContext) => node is N;
	enter: (node: N, ctx: WalkContext) => N[];
}

export interface WalkContext {
	closestAncestor<T extends Node["type"]>(
		type: T,
	): Extract<Node, { type: T }> | undefined;
	hasAncestor<N extends Node>(predicate: (node: Node) => node is N): boolean;
	hasAncestor(predicate: (node: Node) => boolean): boolean;
}

export class ASTProxy {
	#ast: RootNode;
	constructor(ast: RootNode) {
		this.#ast = ast;
	}

	public root(): RootNode {
		return this.#ast;
	}

	public fields(): FieldNode[] {
		return this.entries().flatMap((entry) => entry.fields);
	}

	public entries(): EntryNode[] {
		return this.#ast.children
			.filter((node): node is BlockNode => node.type === "block")
			.map((block) => block.block)
			.filter((entry): entry is EntryNode => entry?.type === "entry");
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
			const ctx = new WalkContextImpl(ancestors);
			if (rule.where ? rule.where(node, ctx) : true) {
				return rule.enter(node as unknown as N, ctx) as unknown as T[];
			}
			return undefined;
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
					visitChildren(node.value, [...ancestors, node.value]);
					break;
				case "concat":
					for (let i = 0; i < node.concat.length; ) {
						i = visitReplaceable(node.concat, i, ancestors, node);
					}
					break;
				case "text":
				case "comment":
				case "preamble":
				case "string":
				case "literal":
				case "braced":
				case "quoted":
					break;
			}
		};

		visitChildren(this.#ast, [this.#ast]);
		if (mutated) {
			this.fieldLookup.clear();
			this.renderValueLookup.clear();
		}
	}

	public invalidateField(field: FieldNode): void {
		this.renderValueLookup.delete(field);
	}

	private fieldLookup = new Map<EntryNode, Map<string, FieldNode>>();
	private lookupField(
		entry: EntryNode,
		fieldLc: string,
	): FieldNode | undefined {
		let fieldNode = this.fieldLookup.get(entry)?.get(fieldLc);
		if (fieldNode === undefined) {
			fieldNode = entry.fields.find(
				(field) => field.name.toLocaleLowerCase() === fieldLc,
			);
		}
		return fieldNode;
	}

	private renderValueLookup = new Map<FieldNode, string>();

	public lookupRenderedEntryValue(entry: EntryNode, fieldname: string): string;
	public lookupRenderedEntryValue(field: FieldNode): string;
	public lookupRenderedEntryValue(
		node: EntryNode | FieldNode,
		fieldName?: string,
	): string {
		const field =
			node.type === "entry"
				? this.lookupField(node, (fieldName ?? "").toLocaleLowerCase())
				: node;

		if (!field) {
			return "";
		}
		let value = this.renderValueLookup.get(field);
		if (value === undefined) {
			const entryValue = formatValue(field) ?? "";
			value = parseLaTeX(entryValue).renderAsText();
			this.renderValueLookup.set(field, value);
		}
		return value;
	}

	public lookupRenderedEntryValues(entry: EntryNode): Map<string, string> {
		const values = new Map<string, string>();
		for (const field of entry.fields) {
			values.set(field.name, this.lookupRenderedEntryValue(field));
		}
		return values;
	}
}

class WalkContextImpl implements WalkContext {
	private ancestors: Node[];

	constructor(ancestors: Node[]) {
		this.ancestors = ancestors;
	}

	public closestAncestor<T extends Node["type"]>(
		type: T,
	): Extract<Node, { type: T }> | undefined {
		for (let i = this.ancestors.length - 1; i >= 0; i--) {
			const ancestor = this.ancestors[i];
			if (ancestor?.type === type) {
				return ancestor as Extract<Node, { type: T }>;
			}
		}
		return undefined;
	}

	public hasAncestor<N extends Node>(
		predicate: (node: Node) => node is N,
	): boolean;
	public hasAncestor(predicate: (node: Node) => boolean): boolean;
	public hasAncestor(predicate: (node: Node) => boolean): boolean {
		for (let i = this.ancestors.length - 1; i >= 0; i--) {
			const ancestor = this.ancestors[i];
			if (ancestor && predicate(ancestor)) return true;
		}
		return false;
	}
}

function setParent(
	node: ReplaceableNode,
	parent: RootNode | EntryNode | ConcatNode,
): void {
	switch (node.type) {
		case "text":
		case "block":
			if (parent.type === "root") node.parent = parent;
			break;
		case "field":
			if (parent.type === "entry") node.parent = parent;
			node.value.parent = node;
			break;
		case "literal":
		case "braced":
		case "quoted":
			if (parent.type === "concat") node.parent = parent;
			break;
	}
}
