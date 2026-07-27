import { BaseNode } from "./baseNode.ts";

export class BlockNode extends BaseNode {
	type = "latexBlock" as const;
	kind: "root" | "square" | "curly";
	children: (TextNode | MathNode | CommandNode | BlockNode)[];
	constructor(kind: BlockNode["kind"], children: BlockNode["children"] = []) {
		super();
		this.kind = kind;
		this.children = children;
	}
	renderAsText(): string {
		return this.children.map((child) => child.renderAsText()).join("");
	}
}
export class TextNode extends BaseNode {
	type = "latexText" as const;
	text: string;
	constructor(text = "") {
		super();
		this.text = text;
	}
	renderAsText(): string {
		return this.text.replace(/"/g, ""); // HACK: latex parser should parse this properly as a block
	}
}
export class MathNode extends BaseNode {
	type = "latexMath" as const;
	text: string;
	constructor(text = "") {
		super();
		this.text = text;
	}
	renderAsText(): string {
		return this.text;
	}
}
export class CommandNode extends BaseNode {
	type = "latexCommand" as const;
	command: string;
	args: BlockNode[];
	constructor(command = "", args: BlockNode[] = []) {
		super();
		this.command = command;
		this.args = args;
	}
	renderAsText(): string {
		return this.args.map((arg) => arg.renderAsText()).join("");
	}
}

export type LatexNode = BlockNode | TextNode | MathNode | CommandNode;
type ParserNode = Exclude<LatexNode, MathNode>;

export function parseLaTeX(input: string): BlockNode {
	const rootNode = new BlockNode("root");
	const parents = new WeakMap<ParserNode, BlockNode | CommandNode>();
	const parentOf = (child: ParserNode): BlockNode | CommandNode => {
		const parent = parents.get(child);
		if (!parent) {
			throw new Error(`Missing parser parent for ${child.type}`);
		}
		return parent;
	};
	const appendChild = <T extends Exclude<LatexNode, BlockNode>>(
		parent: BlockNode,
		child: T,
	): T => {
		parent.children.push(child);
		if (child.type !== "latexMath") {
			parents.set(child, parent);
		}
		return child;
	};
	const appendBlock = (
		parent: BlockNode | CommandNode,
		child: BlockNode,
	): BlockNode => {
		if (parent.type === "latexBlock") {
			parent.children.push(child);
		} else {
			parent.args.push(child);
		}
		parents.set(child, parent);
		return child;
	};
	let node: ParserNode = rootNode;
	for (let i = 0; i < input.length; i++) {
		const char = input[i];
		if (!char) break;

		switch (node.type) {
			case "latexBlock": {
				if (char === "\\") {
					node = appendChild(node, new CommandNode());
				} else if (char === "$") {
					const math = parseMath(input, i);
					if (math) {
						appendChild(node, new MathNode(math.text));
						i = math.end;
					} else {
						node = appendChild(node, new TextNode(char));
					}
				} else if (char === "{") {
					node = appendBlock(node, new BlockNode("curly"));
				} else if (
					((char === "}" && node.kind === "curly") ||
						(char === "]" && node.kind === "square")) &&
					parents.has(node)
				) {
					node = parentOf(node);
				} else {
					node = appendChild(node, new TextNode(char));
				}
				break;
			}

			case "latexText": {
				const parent = parentOf(node) as BlockNode;
				if (char === "$") {
					const math = parseMath(input, i);
					if (math) {
						node = parent;
						appendChild(node, new MathNode(math.text));
						i = math.end;
					} else {
						node.text += char;
					}
				} else if (char === "\\" || char === "{") {
					node = parent;
					i--; // repeat
				} else if (
					(char === "}" && parent.kind === "curly") ||
					(char === "]" && parent.kind === "square")
				) {
					node = parent;
					i--;
				} else {
					node.text += char;
				}
				break;
			}

			case "latexCommand": {
				const parent = parentOf(node) as BlockNode;
				if (char === "{") {
					node = appendBlock(node, new BlockNode("curly"));
				} else if (char === "[") {
					node = appendBlock(node, new BlockNode("square"));
				} else if (
					(char === "}" && parent.kind === "curly") ||
					(char === "]" && parent.kind === "square") ||
					/\s/.test(char) ||
					node.args.length > 0
				) {
					node = parent;
					i--;
				} else {
					node.command += char;
				}
			}
		}
	}
	return rootNode;
}

function parseMath(
	input: string,
	start: number,
): { text: string; end: number } | undefined {
	let escaped = false;
	for (let i = start + 1; i < input.length; i++) {
		const char = input[i];
		if (escaped) {
			escaped = false;
		} else if (char === "\\") {
			escaped = true;
		} else if (char === "$") {
			return { text: input.slice(start + 1, i), end: i };
		}
	}
	return undefined;
}

export function stringifyLaTeX(ast: BlockNode): string {
	return stringifyBlock(ast);
}

function stringifyBlock(block: BlockNode): string {
	const content = block.children
		.map((node) => {
			switch (node.type) {
				case "latexBlock":
					return stringifyBlock(node);
				case "latexCommand":
					return stringifyCommand(node);
				case "latexMath":
					return `$${node.text}$`;
				case "latexText":
					return node.text;
				default:
					throw new Error(`Unknown node type: ${JSON.stringify(node)}`);
			}
		})
		.join("");
	switch (block.kind) {
		case "root":
			return content;
		case "curly":
			return `{${content}}`;
		case "square":
			return `[${content}]`;
	}
}

function stringifyCommand(node: CommandNode): string {
	return `\\${node.command}${node.args.map(stringifyBlock).join("")}`;
}

/**
 * Removes any curly braces, unless:
 * 1. it's part of a command, or
 * 2. it includes a command. This is important for scoped commands that should only affect
 *    text in the block (like \bf)
 */
export function flattenLaTeX(block: BlockNode): BlockNode {
	const newBlock = new BlockNode(block.kind);
	for (const child of block.children) {
		if (
			child.type === "latexBlock" &&
			child.kind === "curly" &&
			child.children.every((child) => child.type !== "latexCommand")
		) {
			const newChild = flattenLaTeX(child);
			newBlock.children.push(...newChild.children);
		} else {
			newBlock.children.push(child);
		}
	}
	return newBlock;
}
