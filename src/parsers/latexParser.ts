export class BlockNode {
	type = "block" as const;
	kind: "root" | "square" | "curly";
	parent?: BlockNode | CommandNode;
	children: (TextNode | MathNode | CommandNode | BlockNode)[];
	constructor(
		kind: BlockNode["kind"],
		parent?: BlockNode["parent"],
		children: BlockNode["children"] = [],
	) {
		this.kind = kind;
		this.parent = parent;
		this.children = children;
		if (parent instanceof BlockNode) {
			parent.children.push(this);
		} else if (parent instanceof CommandNode) {
			parent.args.push(this);
		}
	}
	renderAsText(): string {
		return this.children.map((child) => child.renderAsText()).join("");
	}
}
export class TextNode {
	type = "text" as const;
	parent: BlockNode;
	text: string;
	constructor(parent: BlockNode, text = "") {
		this.parent = parent;
		this.text = text;
		parent.children.push(this);
	}
	renderAsText(): string {
		return this.text.replace(/"/g, ""); // HACK: latex parser should parse this properly as a block
	}
}
export class MathNode {
	type = "math" as const;
	parent: BlockNode;
	text: string;
	constructor(parent: BlockNode, text = "") {
		this.parent = parent;
		this.text = text;
		parent.children.push(this);
	}
	renderAsText(): string {
		return this.text;
	}
}
export class CommandNode {
	type = "command" as const;
	parent: BlockNode;
	command: string;
	args: BlockNode[];
	constructor(parent: BlockNode, command = "", args: BlockNode[] = []) {
		this.parent = parent;
		this.command = command;
		this.args = args;
		parent.children.push(this);
	}
	renderAsText(): string {
		return this.args.map((arg) => arg.renderAsText()).join("");
	}
}

type Node = BlockNode | TextNode | CommandNode;

export function parseLaTeX(input: string): BlockNode {
	const rootNode = new BlockNode("root");
	let node: Node = rootNode;
	for (let i = 0; i < input.length; i++) {
		const char = input[i];
		if (!char) break;

		switch (node.type) {
			case "block": {
				if (char === "\\") {
					node = new CommandNode(node);
				} else if (char === "$") {
					const math = parseMath(input, i);
					if (math) {
						new MathNode(node, math.text);
						i = math.end;
					} else {
						node = new TextNode(node, char);
					}
				} else if (char === "{") {
					node = new BlockNode("curly", node);
				} else if (
					((char === "}" && node.kind === "curly") ||
						(char === "]" && node.kind === "square")) &&
					node.parent
				) {
					node = node.parent;
				} else {
					node = new TextNode(node, char);
				}
				break;
			}

			case "text": {
				if (char === "$") {
					const math = parseMath(input, i);
					if (math) {
						node = node.parent;
						new MathNode(node, math.text);
						i = math.end;
					} else {
						node.text += char;
					}
				} else if (char === "\\" || char === "{") {
					node = node.parent;
					i--; // repeat
				} else if (
					(char === "}" && node.parent.kind === "curly") ||
					(char === "]" && node.parent.kind === "square")
				) {
					node = node.parent;
					i--;
				} else {
					node.text += char;
				}
				break;
			}

			case "command": {
				if (char === "{") {
					node = new BlockNode("curly", node);
				} else if (char === "[") {
					node = new BlockNode("square", node);
				} else if (
					(char === "}" && node.parent.kind === "curly") ||
					(char === "]" && node.parent.kind === "square") ||
					/\s/.test(char) ||
					node.args.length > 0
				) {
					node = node.parent;
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
				case "block":
					return stringifyBlock(node);
				case "command":
					return stringifyCommand(node);
				case "math":
					return `$${node.text}$`;
				case "text":
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
			child.type === "block" &&
			child.kind === "curly" &&
			child.children.every((child) => child.type !== "command")
		) {
			const newChild = flattenLaTeX(child);
			newBlock.children.push(...newChild.children);
		} else {
			newBlock.children.push(child);
		}
	}
	return newBlock;
}
