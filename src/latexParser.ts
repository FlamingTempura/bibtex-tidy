export class BlockNode {
	type = "block" as const;
	constructor(
		public kind: "root" | "square" | "curly",
		public parent?: BlockNode | CommandNode,
		public children: (TextNode | CommandNode | BlockNode)[] = [],
	) {
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
	constructor(
		public parent: BlockNode,
		public text = "",
	) {
		parent.children.push(this);
	}
	renderAsText(): string {
		return this.text.replace(/"/g, ""); // HACK: latex parser should parse this properly as a block
	}
}
export class CommandNode {
	type = "command" as const;
	constructor(
		public parent: BlockNode,
		public command = "",
		public args: BlockNode[] = [],
	) {
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
				if (char === "\\" || char === "{") {
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
				case "text":
					return node.text;
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
