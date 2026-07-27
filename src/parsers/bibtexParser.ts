import { BaseNode } from "./baseNode.ts";
import { type BlockNode as LatexBlockNode, parseLaTeX } from "./latexParser.ts";

export class RootNode extends BaseNode {
	type = "root" as const;
	children: (TextNode | BlockNode)[];
	constructor(children: (TextNode | BlockNode)[] = []) {
		super();
		this.children = children;
	}
}

export class TextNode extends BaseNode {
	type = "text" as const;
	text: string;
	whitespacePrefix: string;
	constructor(text: string, whitespacePrefix: string) {
		super();
		this.text = text;
		this.whitespacePrefix = whitespacePrefix;
	}
}
export class BlockNode extends BaseNode {
	type = "block" as const;
	command = "";
	block?: CommentNode | PreambleNode | StringNode | EntryNode;
	whitespacePrefix: string;
	constructor(whitespacePrefix: string) {
		super();
		this.whitespacePrefix = whitespacePrefix;
	}
}
export class CommentNode extends BaseNode {
	type = "comment" as const;
	raw: string;
	braces: number;
	parens: number;
	constructor(raw: string, braces: number, parens: number) {
		super();
		this.raw = raw;
		this.braces = braces;
		this.parens = parens;
	}
}
class PreambleNode extends BaseNode {
	type = "preamble" as const;
	raw: string;
	braces: number;
	parens: number;
	constructor(raw: string, braces: number, parens: number) {
		super();
		this.raw = raw;
		this.braces = braces;
		this.parens = parens;
	}
}
class StringNode extends BaseNode {
	type = "string" as const;
	raw: string;
	braces: number;
	parens: number;
	constructor(raw: string, braces: number, parens: number) {
		super();
		this.raw = raw;
		this.braces = braces;
		this.parens = parens;
	}
}
export class EntryNode extends BaseNode {
	type = "entry" as const;
	key?: string;
	keyEnded?: boolean;
	fields: FieldNode[];
	wrapType: "{" | "(";
	constructor(wrapType: "{" | "(") {
		super();
		this.wrapType = wrapType;
		this.fields = [];
	}
}
export class FieldNode extends BaseNode {
	type = "field" as const;
	/** Each value is concatenated */
	value: ConcatNode;
	hasComma = false; // not filled in during parsing
	name: string;
	whitespacePrefix: string;
	constructor(name = "", whitespacePrefix = "") {
		super();
		this.name = name;
		this.whitespacePrefix = whitespacePrefix;
		this.value = new ConcatNode();
	}
}
export class ConcatNode extends BaseNode {
	type = "concat" as const;
	values: ValueNode[];
	canConsumeValue = true;
	whitespacePrefix = ""; // not filled in during parsing
	constructor() {
		super();
		this.values = [];
	}
}
export class LiteralNode extends BaseNode {
	type = "literal" as const;
	value: string;
	constructor(value: string) {
		super();
		this.value = value;
	}
}

export class BracedNode extends BaseNode {
	type = "braced" as const;
	latexAst: LatexBlockNode;
	/** Used to count opening and closing braces */
	depth = 0;
	constructor() {
		super();
		this.latexAst = parseLaTeX("");
	}
}

export class QuotedNode extends BaseNode {
	type = "quoted" as const;
	latexAst: LatexBlockNode;
	/** Used to count opening and closing braces */
	depth = 0;
	constructor() {
		super();
		this.latexAst = parseLaTeX("");
	}
}

export type ValueNode = LiteralNode | BracedNode | QuotedNode;

export type Node =
	| RootNode
	| TextNode
	| BlockNode
	| EntryNode
	| CommentNode
	| PreambleNode
	| StringNode
	| FieldNode
	| ConcatNode
	| LiteralNode
	| BracedNode
	| QuotedNode;

export type NodeType = Node["type"];

export function isNodeType<T extends NodeType>(
	node: { type: string } | null | undefined,
	...types: T[]
): node is Extract<Node, { type: T }> {
	return node !== null && node !== undefined && types.includes(node.type as T);
}

export function parseBibTeX(input: string): RootNode {
	const rootNode = new RootNode();
	const parents = new WeakMap<Node, Node>();
	const parentOf = <T extends Node>(child: T): Node => {
		const parent = parents.get(child);
		if (!parent) {
			throw new Error(`Missing parser parent for ${child.type}`);
		}
		return parent;
	};
	const appendRootChild = <T extends TextNode | BlockNode>(
		parent: RootNode,
		child: T,
	): T => {
		parent.children.push(child);
		parents.set(child, parent);
		return child;
	};
	const setBlockChild = <
		T extends CommentNode | PreambleNode | StringNode | EntryNode,
	>(
		parent: BlockNode,
		child: T,
	): T => {
		parent.block = child;
		parents.set(child, parent);
		return child;
	};
	const createField = (
		parent: EntryNode,
		name = "",
		whitespacePrefix = "",
	): FieldNode => {
		const field = new FieldNode(name, whitespacePrefix);
		parents.set(field, parent);
		parents.set(field.value, field);
		return field;
	};
	const appendValue = <T extends ValueNode>(
		parent: ConcatNode,
		child: T,
	): T => {
		parent.values.push(child);
		parents.set(child, parent);
		return child;
	};
	let node: Node = rootNode;
	let line = 1;
	let column = 0;
	let whitespace = "";
	let latexInput = "";

	const flushWhitespace = () => {
		const ws = whitespace;
		whitespace = "";
		return ws;
	};

	for (let i = 0; i < input.length; i++) {
		const char = input[i] ?? "";
		const prev = input[i - 1] ?? "";

		if (char === "\n") {
			line++;
			column = 0;
		}
		column++;

		switch (node.type) {
			case "root": {
				if (char === "@") {
					node = appendRootChild(node, new BlockNode(flushWhitespace()));
				} else if (isWhitespace(char)) {
					whitespace += char;
				} else {
					node = appendRootChild(node, new TextNode(char, flushWhitespace()));
				}
				break;
			}

			case "text": {
				// Whitespace or closing curly brace should precede an entry. This might
				// not be correct but allows parsing of "valid" bibtex files in the
				// wild.
				if (char === "@" && /[\s\r\n}]/.test(prev)) {
					const root = parentOf(node) as RootNode;
					node = appendRootChild(root, new BlockNode(""));
				} else {
					node.text += char;
				}
				break;
			}

			case "block": {
				if (char === "@") {
					// everything prior to this was a comment
					const root = parentOf(node) as RootNode;
					const prevNode = root.children[root.children.length - 2];
					if (isNodeType(prevNode, "text")) {
						prevNode.text += `@${node.command}`;
					} else {
						// insert text node 1 from the end
						root.children.pop();
						appendRootChild(
							root,
							new TextNode(`@${node.command}`, node.whitespacePrefix),
						);
						root.children.push(node);
					}
					node.command = "";
				} else if (char === "{" || char === "(") {
					const commandTrimmed = node.command.trim();
					if (commandTrimmed === "" || /\s/.test(commandTrimmed)) {
						// A block without a command is invalid. It's sometimes used in comments though, e.g. @(#)
						// replace the block node
						const root = parentOf(node) as RootNode;
						root.children.pop();
						node = appendRootChild(
							root,
							new TextNode(`@${node.command}${char}`, node.whitespacePrefix),
						);
					} else {
						node.command = commandTrimmed;
						const command: string = node.command.toLowerCase();
						const [braces, parens] = char === "{" ? [1, 0] : [0, 1];
						const raw = `@${command}${char}`;
						switch (command) {
							case "string":
								node = setBlockChild(node, new StringNode(raw, braces, parens));
								break;
							case "preamble":
								node = setBlockChild(
									node,
									new PreambleNode(raw, braces, parens),
								);
								break;
							case "comment":
								node = setBlockChild(
									node,
									new CommentNode(raw, braces, parens),
								);
								break;
							default:
								node = setBlockChild(node, new EntryNode(char));
								break;
						}
					}
				} else if (char.match(/[=#,})[\]]/)) {
					// replace the block node
					const root = parentOf(node) as RootNode;
					root.children.pop();
					node = appendRootChild(
						root,
						new TextNode(`@${node.command}${char}`, flushWhitespace()),
					);
				} else {
					node.command += char;
				}
				break;
			}

			case "comment":
			case "string":
			case "preamble":
				if (char === "{") {
					node.braces++;
				} else if (char === "}") {
					node.braces--;
				} else if (char === "(") {
					node.parens++;
				} else if (char === ")") {
					node.parens--;
				}
				node.raw += char;
				if (node.braces === 0 && node.parens === 0) {
					node = parentOf(parentOf(node)); // root
				}
				break;

			case "entry": {
				if (isWhitespace(char)) {
					if (!node.key) {
						// Before key, ignore
					} else {
						// Ensure subsequent characters are not appended to the key
						node.keyEnded = true;
					}
				} else if (char === ",") {
					node = createField(node);
				} else if (
					(node.wrapType === "{" && char === "}") ||
					(node.wrapType === "(" && char === ")")
				) {
					node = parentOf(parentOf(node)); // root
				} else if (char === "=" && node.key && isValidFieldName(node.key)) {
					// Entry has no key, this is a field name
					const field = createField(node, node.key);
					node.fields.push(field);
					node.key = undefined;
					node = field.value;
				} else if (node.keyEnded) {
					throw new BibTeXSyntaxError(
						input,
						node,
						i,
						line,
						column,
						"The entry key cannot contain whitespace",
					);
				} else if (!isValidKeyCharacter(char)) {
					throw new BibTeXSyntaxError(
						input,
						node,
						i,
						line,
						column,
						`The entry key cannot contain the character (${char})`,
					);
				} else {
					node.key = (node.key ?? "") + char;
				}
				break;
			}

			case "field": {
				if (char === "}" || char === ")") {
					node.name = node.name.trim();
					node = parentOf(parentOf(parentOf(node))); // root
				} else if (char === "=") {
					node.name = node.name.trim();
					node = node.value;
				} else if (char === ",") {
					node.name = node.name.trim();
					node = createField(parentOf(node) as EntryNode);
				} else if (!isValidFieldName(char)) {
					throw new BibTeXSyntaxError(input, node, i, line, column);
				} else if (!node.name) {
					if (!isWhitespace(char)) {
						(parentOf(node) as EntryNode).fields.push(node);
						node.name = char;
					} else {
						node.whitespacePrefix += char;
					}
				} else {
					node.name += char;
				}
				break;
			}

			case "concat": {
				if (isWhitespace(char)) {
					break; // noop
				}
				if (node.canConsumeValue) {
					if (/[#=,}()[\]]/.test(char)) {
						throw new BibTeXSyntaxError(input, node, i, line, column);
					}
					node.canConsumeValue = false;
					if (char === "{") {
						latexInput = "";
						node = appendValue(node, new BracedNode());
					} else if (char === '"') {
						latexInput = "";
						node = appendValue(node, new QuotedNode());
					} else {
						node = appendValue(node, new LiteralNode(char));
					}
				} else {
					if (char === ",") {
						node = createField(parentOf(parentOf(node)) as EntryNode);
					} else if (char === "}" || char === ")") {
						node = parentOf(parentOf(parentOf(parentOf(node)))); // root
					} else if (char === "#") {
						node.canConsumeValue = true;
					} else {
						throw new BibTeXSyntaxError(input, node, i, line, column);
					}
				}
				break;
			}

			case "literal":
				if (isWhitespace(char)) {
					// end of literal
					node = parentOf(node);
				} else if (char === ",") {
					node = createField(parentOf(parentOf(parentOf(node))) as EntryNode);
				} else if (char === "}") {
					node = parentOf(parentOf(parentOf(parentOf(parentOf(node))))); // root
				} else if (char === "#") {
					node = parentOf(node);
					if (!isNodeType(node, "concat")) {
						throw new Error("Expected concat parser parent");
					}
					node.canConsumeValue = true;
				} else {
					node.value += char;
				}
				break;

			// Values may be enclosed in curly braces. Curly braces may be used within
			// the value but they must be balanced.
			case "braced":
				if (char === "}" && node.depth === 0) {
					node.latexAst = parseLaTeX(latexInput);
					node = parentOf(node); // values
					break;
				}
				if (char === "{") {
					node.depth++;
				} else if (char === "}") {
					node.depth--;
				}
				latexInput += char;
				break;

			// Values may be enclosed in double quotes. Curly braces may be used
			// within quoted values but they must be balanced.
			//
			// To escape a double quote, surround it with braces `{"}`.
			// https://web.archive.org/web/20210422110817/https://maverick.inria.fr/~Xavier.Decoret/resources/xdkbibtex/bibtex_summary.html
			case "quoted":
				if (char === '"' && node.depth === 0) {
					node.latexAst = parseLaTeX(latexInput);
					node = parentOf(node); // values
					break;
				}
				if (char === "{") {
					node.depth++;
				} else if (char === "}") {
					node.depth--;
					if (node.depth < 0) {
						throw new BibTeXSyntaxError(input, node, i, line, column);
					}
				}
				latexInput += char;
				break;
		}
	}
	return rootNode;
}

function isWhitespace(string: string): boolean {
	return /^\s*$/.test(string);
}

/**
 * Certain characters are special in latex: {}%#$~. These cannot be used in
 * \cite without error. See https://tex.stackexchange.com/a/408548
 */
function isValidKeyCharacter(char: string): boolean {
	return !/[#%{}~$,]/.test(char);
}

function isValidFieldName(char: string): boolean {
	return !/[=,{}()[\]]/.test(char);
}

export class BibTeXSyntaxError extends Error {
	char: string;
	pos: number;
	line: number;
	column: number;
	hint?: string;
	constructor(
		input: string,
		node: Node,
		pos: number,
		line: number,
		column: number,
		hint?: string,
	) {
		super(
			`Line ${line}:${column}: Syntax Error in ${node.type} (${hint})\n${input.slice(Math.max(0, pos - 20), pos)}>>${input[pos]}<<${input.slice(pos + 1, pos + 20)}`,
		);
		this.name = "Syntax Error";
		this.char = input[pos] ?? "";
		this.pos = pos;
		this.line = line;
		this.column = column;
		this.hint = hint;
	}
}
