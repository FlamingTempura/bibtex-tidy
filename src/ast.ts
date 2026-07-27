import type {
	Node as BibTeXNode,
	EntryNode,
	FieldNode,
	RootNode,
} from "./parsers/bibtexParser.ts";
import { isNodeType } from "./parsers/bibtexParser.ts";
import type { LatexNode } from "./parsers/latexParser.ts";

export type Node = BibTeXNode | LatexNode;

export type AstContext = {
	next: () => Node[];
	path: Node[];
};

type AstVisitor<N extends Node> = (node: N, ctx: AstContext) => Node[];

export type AstVisitors = {
	[K in Node["type"]]?: AstVisitor<Extract<Node, { type: K }>>;
} & {
	_?: AstVisitor<Node>;
};

export function getEntries(root: RootNode): EntryNode[] {
	return root.children
		.filter((node) => isNodeType(node, "block"))
		.map((block) => block.block)
		.filter((entry) => isNodeType(entry, "entry"));
}

export function getField(
	entry: EntryNode,
	fieldName: string,
): FieldNode | undefined {
	const fieldNameLc = fieldName.toLocaleLowerCase();
	return entry.fields.find(
		(field) => field.name.toLocaleLowerCase() === fieldNameLc,
	);
}

export function closestAncestor<Type extends Node["type"]>(
	ctx: AstContext,
	type: Type,
): Extract<Node, { type: Type }> | undefined {
	for (let i = ctx.path.length - 1; i >= 0; i--) {
		const node = ctx.path[i];
		if (node?.type === type) {
			return node as Extract<Node, { type: Type }>;
		}
	}
	return undefined;
}

/**
 * Walks structural AST children, excluding cyclic `parent` properties.
 * Changed branches are shallowly copied.
 */
export function walkAst(root: RootNode, visitors: AstVisitors): RootNode {
	const visitNode = (node: Node, path: Node[]): Node[] => {
		let descendants: Node[] | undefined;
		const astContext: AstContext = {
			next: () => {
				descendants = [visitChildren(node, path, visitNode)];
				return descendants;
			},
			path,
		};
		const visitor = visitors[node.type] as AstVisitor<Node> | undefined;
		const selectedVisitor = visitor ?? visitors._;
		if (selectedVisitor) {
			return selectedVisitor(node, astContext);
		}

		return [visitChildren(node, path, visitNode)];
	};

	return visit(root, [], visitNode) as RootNode;
}

function visit<N extends Node>(
	node: N,
	path: Node[],
	visitNode: (node: Node, path: Node[]) => Node[],
): N {
	const result = visitNode(node, path);
	if (result.length !== 1) {
		throw new Error(
			`Expected exactly one replacement for ${node.type}, received ${result.length}`,
		);
	}
	return result[0] as N;
}

function visitArray<N extends Node>(
	nodes: N[],
	path: Node[],
	visitNode: (node: Node, path: Node[]) => Node[],
): N[] {
	const result = nodes.flatMap((node) => visitNode(node, path)) as N[];
	return result.length === nodes.length &&
		result.every((node, index) => node === nodes[index])
		? nodes
		: result;
}

function visitChildren(
	node: Node,
	path: Node[],
	visitNode: (node: Node, path: Node[]) => Node[],
): Node {
	const childPath = [...path, node];

	switch (node.type) {
		case "root": {
			const children = visitArray(node.children, childPath, visitNode);
			return children === node.children ? node : node.with({ children });
		}
		case "block": {
			if (!node.block) return node;
			const block = visit(node.block, childPath, visitNode);
			return block === node.block ? node : node.with({ block });
		}
		case "entry": {
			const fields = visitArray(node.fields, childPath, visitNode);
			return fields === node.fields ? node : node.with({ fields });
		}
		case "field": {
			const value = visit(node.value, childPath, visitNode);
			return value === node.value ? node : node.with({ value });
		}
		case "concat": {
			const values = visitArray(node.values, childPath, visitNode);
			return values === node.values ? node : node.with({ values });
		}
		case "braced":
		case "quoted": {
			const latexAst = visit(node.latexAst, childPath, visitNode);
			return latexAst === node.latexAst ? node : node.with({ latexAst });
		}
		case "latexBlock": {
			const children = visitArray(node.children, childPath, visitNode);
			return children === node.children ? node : node.with({ children });
		}
		case "latexCommand": {
			const args = visitArray(node.args, childPath, visitNode);
			return args === node.args ? node : node.with({ args });
		}
		default:
			return node;
	}
}
