import { type BlockNode as LatexBlockNode, parseLaTeX } from "./latexParser.ts";

export class RootNode {
	type = "root" as const;
	children: (TextNode | BlockNode)[];
	constructor(children: (TextNode | BlockNode)[] = []) {
		this.children = children;
	}
}

export class TextNode {
	type = "text" as const;
	parent: RootNode;
	text: string;
	whitespacePrefix: string;
	constructor(parent: RootNode, text: string, whitespacePrefix: string) {
		this.parent = parent;
		this.text = text;
		this.whitespacePrefix = whitespacePrefix;
		parent.children.push(this);
	}
}
export class BlockNode {
	type = "block" as const;
	command = "";
	block?: CommentNode | PreambleNode | StringNode | EntryNode;
	parent: RootNode;
	whitespacePrefix: string;
	constructor(parent: RootNode, whitespacePrefix: string) {
		this.parent = parent;
		this.whitespacePrefix = whitespacePrefix;
		parent.children.push(this);
	}
}
export class CommentNode {
	type = "comment" as const;
	parent: BlockNode;
	raw: string;
	braces: number;
	parens: number;
	constructor(parent: BlockNode, raw: string, braces: number, parens: number) {
		this.parent = parent;
		this.raw = raw;
		this.braces = braces;
		this.parens = parens;
		parent.block = this;
	}
}
class PreambleNode {
	type = "preamble" as const;
	parent: BlockNode;
	raw: string;
	braces: number;
	parens: number;
	constructor(parent: BlockNode, raw: string, braces: number, parens: number) {
		this.parent = parent;
		this.raw = raw;
		this.braces = braces;
		this.parens = parens;
		parent.block = this;
	}
}
class StringNode {
	type = "string" as const;
	parent: BlockNode;
	raw: string;
	braces: number;
	parens: number;
	constructor(parent: BlockNode, raw: string, braces: number, parens: number) {
		this.parent = parent;
		this.raw = raw;
		this.braces = braces;
		this.parens = parens;
		parent.block = this;
	}
}
export class EntryNode {
	type = "entry" as const;
	key?: string;
	keyEnded?: boolean;
	fields: FieldNode[];
	parent: BlockNode;
	wrapType: "{" | "(";
	constructor(parent: BlockNode, wrapType: "{" | "(") {
		this.parent = parent;
		this.wrapType = wrapType;
		parent.block = this;
		this.fields = [];
	}
}
export class FieldNode {
	type = "field" as const;
	/** Each value is concatenated */
	value: ConcatNode;
	hasComma = false; // not filled in during parsing
	parent: EntryNode;
	name: string;
	whitespacePrefix: string;
	constructor(parent: EntryNode, name = "", whitespacePrefix = "") {
		this.parent = parent;
		this.name = name;
		this.whitespacePrefix = whitespacePrefix;
		this.value = new ConcatNode(this);
	}
}
export class ConcatNode {
	type = "concat" as const;
	concat: ValueNode[];
	canConsumeValue = true;
	whitespacePrefix = ""; // not filled in during parsing
	parent: FieldNode;
	constructor(parent: FieldNode) {
		this.parent = parent;
		this.concat = [];
	}
}
export class LiteralNode {
	type = "literal" as const;
	parent: ConcatNode;
	value: string;
	constructor(parent: ConcatNode, value: string) {
		this.parent = parent;
		this.value = value;
	}
}

function createLiteralNode(parent: ConcatNode, value: string): LiteralNode {
	const node = new LiteralNode(parent, value);
	parent.concat.push(node);
	return node;
}

export class BracedNode {
	type = "braced" as const;
	latexAst: LatexBlockNode;
	/** Used to count opening and closing braces */
	depth = 0;
	parent: ConcatNode;
	constructor(parent: ConcatNode) {
		this.parent = parent;
		this.latexAst = parseLaTeX("");
	}
}

function createBracedNode(parent: ConcatNode): BracedNode {
	const node = new BracedNode(parent);
	parent.concat.push(node);
	return node;
}

export class QuotedNode {
	type = "quoted" as const;
	latexAst: LatexBlockNode;
	/** Used to count opening and closing braces */
	depth = 0;
	parent: ConcatNode;
	constructor(parent: ConcatNode) {
		this.parent = parent;
		this.latexAst = parseLaTeX("");
	}
}

function createQuotedNode(parent: ConcatNode): QuotedNode {
	const node = new QuotedNode(parent);
	parent.concat.push(node);
	return node;
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

export function parseBibTeX(input: string): RootNode {
	const rootNode = new RootNode();
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
					node = new BlockNode(node, flushWhitespace());
				} else if (isWhitespace(char)) {
					whitespace += char;
				} else {
					node = new TextNode(node, char, flushWhitespace());
				}
				break;
			}

			case "text": {
				// Whitespace or closing curly brace should precede an entry. This might
				// not be correct but allows parsing of "valid" bibtex files in the
				// wild.
				if (char === "@" && /[\s\r\n}]/.test(prev)) {
					node = new BlockNode(node.parent, "");
				} else {
					node.text += char;
				}
				break;
			}

			case "block": {
				if (char === "@") {
					// everything prior to this was a comment
					const prevNode =
						node.parent.children[node.parent.children.length - 2];
					if (prevNode?.type === "text") {
						prevNode.text += `@${node.command}`;
					} else {
						// insert text node 1 from the end
						node.parent.children.pop();
						new TextNode(
							node.parent,
							`@${node.command}`,
							node.whitespacePrefix,
						);
						node.parent.children.push(node);
					}
					node.command = "";
				} else if (char === "{" || char === "(") {
					const commandTrimmed = node.command.trim();
					if (commandTrimmed === "" || /\s/.test(commandTrimmed)) {
						// A block without a command is invalid. It's sometimes used in comments though, e.g. @(#)
						// replace the block node
						node.parent.children.pop();
						node = new TextNode(
							node.parent,
							`@${node.command}${char}`,
							node.whitespacePrefix,
						);
					} else {
						node.command = commandTrimmed;
						const command: string = node.command.toLowerCase();
						const [braces, parens] = char === "{" ? [1, 0] : [0, 1];
						const raw = `@${command}${char}`;
						switch (command) {
							case "string":
								node = new StringNode(node, raw, braces, parens);
								break;
							case "preamble":
								node = new PreambleNode(node, raw, braces, parens);
								break;
							case "comment":
								node = new CommentNode(node, raw, braces, parens);
								break;
							default:
								node = new EntryNode(node, char);
								break;
						}
					}
				} else if (char.match(/[=#,})[\]]/)) {
					// replace the block node
					node.parent.children.pop();
					node = new TextNode(
						node.parent,
						`@${node.command}${char}`,
						flushWhitespace(),
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
					node = node.parent.parent; // root
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
					node = new FieldNode(node);
				} else if (
					(node.wrapType === "{" && char === "}") ||
					(node.wrapType === "(" && char === ")")
				) {
					node = node.parent.parent; // root
				} else if (char === "=" && node.key && isValidFieldName(node.key)) {
					// Entry has no key, this is a field name
					const field: FieldNode = new FieldNode(node, node.key);
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
					node = node.parent.parent.parent; // root
				} else if (char === "=") {
					node.name = node.name.trim();
					node = node.value;
				} else if (char === ",") {
					node.name = node.name.trim();
					node = new FieldNode(node.parent);
				} else if (!isValidFieldName(char)) {
					throw new BibTeXSyntaxError(input, node, i, line, column);
				} else if (!node.name) {
					if (!isWhitespace(char)) {
						node.parent.fields.push(node);
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
						node = createBracedNode(node);
					} else if (char === '"') {
						latexInput = "";
						node = createQuotedNode(node);
					} else {
						node = createLiteralNode(node, char);
					}
				} else {
					if (char === ",") {
						node = new FieldNode(node.parent.parent);
					} else if (char === "}" || char === ")") {
						node = node.parent.parent.parent.parent; // root
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
					node = node.parent;
				} else if (char === ",") {
					node = new FieldNode(node.parent.parent.parent);
				} else if (char === "}") {
					node = node.parent.parent.parent.parent.parent; // root
				} else if (char === "#") {
					node = node.parent;
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
					node = node.parent; // values
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
					node = node.parent; // values
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
