export type BibTeXValue = {
	type: 'quoted' | 'braced' | 'literal';
	value: string;
};

type BibTeXString = {
	itemtype: 'string';
	raw: string;
};

type BibTeXComment = {
	itemtype: 'comment';
	comment: string;
};

type BibTeXPreamble = {
	itemtype: 'preamble';
	raw: string;
};

export type BibTeXEntry = {
	itemtype: 'entry';
	key?: string;
	type: string;
	/**
	 * Indexed by name in lowercase
	 */
	fields: BibTeXField[];
	duplicate?: boolean;
};

export type BibTeXField = { name: string; values: BibTeXValue[] };

export type BibTeXItem =
	| BibTeXString
	| BibTeXEntry
	| BibTeXPreamble
	| BibTeXComment;

type NodeBase<TParent extends Node | null> = { parent: TParent };

type RootNode = NodeBase<null> & {
	type: 'root';
	children: (TextNode | BlockNode)[];
};

type TextNode = NodeBase<RootNode> & { type: 'text'; comment: string };
type BlockNode = NodeBase<RootNode> & {
	type: 'block';
	command: string;
	block?: CommentNode | PreambleNode | StringNode | EntryNode;
};
type CommentNode = NodeBase<BlockNode> & {
	type: 'comment';
	raw: string;
	braces: number;
	parens: number;
};
type PreambleNode = NodeBase<BlockNode> & {
	type: 'preamble';
	raw: string;
	braces: number;
	parens: number;
};
type StringNode = NodeBase<BlockNode> & {
	type: 'string';
	raw: string;
	braces: number;
	parens: number;
};
type EntryNode = NodeBase<BlockNode> & {
	type: 'entry';
	key?: string;
	fields: FieldNode[];
}; // forming any @ prefixed line
type FieldNode = NodeBase<EntryNode> & {
	type: 'field';
	name: string;
	/** Each value is concatenated */
	value?: ConcatNode;
};
type ConcatNode = NodeBase<FieldNode> & {
	type: 'values';
	concat: (LiteralNode | BracedNode | QuotedNode)[];
};
type LiteralNode = NodeBase<ConcatNode> & {
	type: 'literal';
	value: string;
};
type BracedNode = NodeBase<ConcatNode> & {
	type: 'braced';
	value: string;
	/** Used to count opening and closing braces */
	depth: number;
};
type QuotedNode = NodeBase<ConcatNode> & {
	type: 'quoted';
	value: string;
};

type Node =
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

const cliOutput: Record<Node['type'], (char: string) => void> = {
	root: (char) => process.stdout.write(`\x1b[31m${char}\x1b[0m`), //red
	text: (char) => process.stdout.write(`\x1b[32m${char}\x1b[0m`), //green
	block: (char) => process.stdout.write(`\x1b[33m${char}\x1b[0m`), // yellow
	entry: (char) => process.stdout.write(`\x1b[34m${char}\x1b[0m`), // blue
	comment: (char) => process.stdout.write(`\x1b[35m${char}\x1b[0m`), // magenta
	preamble: (char) => process.stdout.write(`\x1b[30m\x1b[46m${char}\x1b[0m`), // bg cyan
	string: (char) => process.stdout.write(`\x1b[30m\x1b[41m${char}\x1b[0m`), // bg red
	field: (char) => process.stdout.write(`\x1b[36m${char}\x1b[0m`), // cyan
	values: (char) => process.stdout.write(`\x1b[30m\x1b[43m${char}\x1b[0m`), // bg yellow
	literal: (char) => process.stdout.write(`\x1b[30m\x1b[44m${char}\x1b[0m`), // bg blue
	braced: (char) => process.stdout.write(`\x1b[30m\x1b[45m${char}\x1b[0m`), // bg magenta
	quoted: (char) => process.stdout.write(`\x1b[30m\x1b[42m${char}\x1b[0m`), // bg green
};

function generateAST(input: string): RootNode {
	const rootNode: RootNode = { type: 'root', parent: null, children: [] };
	let node: Node = rootNode;
	let line = 1;
	let column = 0;

	for (let i = 0; i < input.length; i++) {
		const char = input[i];

		if (char === '\n') {
			line++;
			column = 0;
		}
		column++;

		switch (node.type) {
			case 'root': {
				let newNode: Node;
				if (char === '@') {
					newNode = { type: 'block', parent: node, command: '' };
				} else {
					newNode = { type: 'text', parent: node, comment: char };
				}
				node.children.push(newNode);
				node = newNode;
				break;
			}

			case 'text': {
				if (char === '@') {
					const newNode: BlockNode = {
						type: 'block',
						parent: node.parent,
						command: '',
					};
					node.parent.children.push(newNode);
					node = newNode;
				} else {
					node.comment += char;
				}
				break;
			}

			case 'block': {
				if (char === '@') {
					// everything prior to this was a comment
					const previousNode =
						node.parent.children[node.parent.children.length - 2];
					if (previousNode.type === 'text') {
						previousNode.comment += '@' + node.command;
					} else {
						// insert text node 1 from the end
						node.parent.children.splice(-1, 0, {
							parent: node.parent,
							type: 'text',
							comment: '@' + node.command,
						});
					}
					node.command = '';
				} else if (char === '{' || char === '(') {
					if (node.command.trim() === '') {
						// A block without a command is invalid. It's sometimes used in comments though, e.g. @(#)
						const newNode: TextNode = {
							parent: node.parent,
							type: 'text',
							comment: '@' + node.command + char,
						};
						node.parent.children.splice(-1, 1, newNode); // replace the block node
						node = newNode;
					} else {
						node.command = node.command.trim();
						const command: string = node.command.toLowerCase();
						const [braces, parens] = char === '{' ? [1, 0] : [0, 1];
						let childNode: StringNode | PreambleNode | CommentNode | EntryNode;
						switch (command) {
							case 'string':
							case 'preamble':
							case 'comment':
								childNode = {
									parent: node,
									type: command,
									raw: '@' + command + char, // TODO: this lowercases String etc, should be dependant on lowercase option
									braces,
									parens,
								};
								break;
							default:
								childNode = {
									parent: node,
									type: 'entry',
									key: '',
									fields: [],
								};
								break;
						}
						node.block = childNode;
						node = childNode;
					}
				} else if (char.match(/[=#,{}()\[\]]/)) {
					throw new BibTeXSyntaxError(input, node, i, line, column);
					// } else if (isWhitespace(char)) {
					// 	// TODO - ignore if start or end, otherwise error
				} else {
					node.command += char;
				}
				break;
			}

			case 'comment':
			case 'string':
			case 'preamble': {
				if (char === '{') {
					node.braces++;
				} else if (char === '}') {
					node.braces--;
				} else if (char === '(') {
					node.parens++;
				} else if (char === ')') {
					node.parens--;
				}
				node.raw += char;
				if (node.braces === 0 && node.parens === 0) {
					node = node.parent.parent; // root
				}
				break;
			}

			case 'entry': {
				if (char === '}' || char === ')') {
					node = node.parent.parent; // root
				} else if (char === ',') {
					const newNode: FieldNode = { parent: node, type: 'field', name: '' };
					node.fields.push(newNode);
					node = newNode;
				} else if (char === '=') {
					// no key, this is a field name
					const field: FieldNode = {
						parent: node,
						type: 'field',
						name: node.key?.trim() ?? '',
					};
					node.fields.push(field);
					node.key = undefined;
					const value: ConcatNode = {
						parent: field,
						type: 'values',
						concat: [],
					};
					field.value = value;
					node = value;
				} else if (isWhitespace(char)) {
					//TODO
				} else if (char.match(/[=#,{}()\[\]]/)) {
					throw new BibTeXSyntaxError(input, node, i, line, column);
				} else {
					node.key = (node.key ?? '') + char;
				}
				break;
			}

			case 'field': {
				if (char === '}' || char === ')') {
					node.name = node.name.trim();
					node = node.parent.parent.parent; // root
				} else if (char === '=') {
					node.name = node.name.trim();
					const newNode: ConcatNode = {
						parent: node,
						type: 'values',
						concat: [],
					};
					node.value = newNode;
					node = newNode;
				} else if (char === ',') {
					node.name = node.name.trim();
					const newNode: FieldNode = {
						parent: node.parent,
						type: 'field',
						name: '',
					};
					node.parent.fields.push(newNode);
					node = newNode;
				} else if (char.match(/[=,{}()\[\]]/)) {
					throw new BibTeXSyntaxError(input, node, i, line, column);
				} else {
					node.name += char;
				}
				break;
			}

			case 'values': {
				if (isWhitespace(char)) {
					// noop
				} else if (char === '{') {
					const newNode: BracedNode = {
						parent: node,
						type: 'braced',
						depth: 0,
						value: '',
					};
					node.concat.push(newNode);
					node = newNode;
				} else if (char === '"') {
					const newNode: QuotedNode = {
						parent: node,
						type: 'quoted',
						value: '',
					};
					node.concat.push(newNode);
					node = newNode;
				} else if (char === '#') {
					// TODO: error check if missing
				} else if (char === ',') {
					const newNode: FieldNode = {
						parent: node.parent.parent,
						type: 'field',
						name: '',
					};
					node.parent.parent.fields.push(newNode);
					node = newNode;
				} else if (char === '}' || char === ')') {
					node = node.parent.parent.parent.parent; // root
				} else {
					const newNode: LiteralNode = {
						parent: node,
						type: 'literal',
						value: char,
					};
					node.concat.push(newNode);
					node = newNode;
				}
				break;
			}

			case 'literal':
				if (isWhitespace(char)) {
					if (!node.value) {
						// noop - ignore whitespace
					} else {
						// end of literal
						node = node.parent;
					}
				} else if (char === ',') {
					const newNode: FieldNode = {
						parent: node.parent.parent.parent,
						type: 'field',
						name: '',
					};
					node.parent.parent.parent.fields.push(newNode);
					node = newNode;
				} else if (char === '}') {
					node = node.parent.parent.parent.parent.parent; // root
				} else {
					node.value += char;
				}
				break;

			case 'braced': {
				if (char === '}' && node.depth === 0) {
					node = node.parent; // values
				} else {
					if (char === '{') {
						node.depth++;
					} else if (char === '}') {
						node.depth--;
					}
					node.value += char;
				}
				break;
			}

			case 'quoted': {
				if (char === '"' && input[i - 1] !== '\\') {
					node = node.parent; // values
				} else {
					node.value += char;
				}
				break;
			}
		}

		// cliOutput[node.type](
		// 	char.replace(' ', '_').replace('\t', '_').replace('\n', '¶\n')
		// );
	}

	//console.log('\n------------------');
	// console.dir(node, { depth: 100 });
	//console.log('------------------');

	return rootNode;
}

export function parse(input: string): BibTeXItem[] {
	const nodes = generateAST(input).children;
	const items: BibTeXItem[] = [];
	for (const node of nodes) {
		switch (node.type) {
			case 'text':
				const prevItem = items[items.length - 1];
				if (prevItem?.itemtype === 'comment') {
					prevItem.comment += node.comment;
				} else {
					items.push({ itemtype: 'comment', comment: node.comment });
				}
				break;

			case 'block':
				if (!node.block) throw new Error('FATAL');
				switch (node.block.type) {
					case 'preamble':
					case 'string':
						items.push({ itemtype: node.block.type, raw: node.block.raw });
						break;

					case 'comment':
						const prevItem = items[items.length - 1];
						if (prevItem?.itemtype === 'comment') {
							prevItem.comment += node.block.raw;
						} else {
							items.push({ itemtype: 'comment', comment: node.block.raw });
						}
						break;

					case 'entry': {
						items.push({
							itemtype: 'entry',
							type: node.command,
							key: node.block.key,
							fields: node.block.fields
								.filter((field) => field.name)
								.map((field) => ({
									name: field.name,
									values: field.value?.concat ?? [],
								})),
						});
						break;
					}
				}
				break;

			default:
				throw new Error('FATAL');
		}
	}

	// console.dir(items, { depth: 6 });
	// console.log('OK');

	return items;
}

function isWhitespace(string: string): boolean {
	return /^[ \t\n\r]*$/.test(string);
}

export class BibTeXSyntaxError extends Error {
	public char: string;
	constructor(
		input: string,
		public node: Node,
		pos: number,
		public line: number,
		public column: number
	) {
		super(
			`Line ${line}:${column}: Syntax Error in ${node.type}\n` +
				input.slice(Math.max(0, pos - 20), pos) +
				'>>' +
				input[pos] +
				'<<' +
				input.slice(pos + 1, pos + 20)
		);
		this.name = 'Syntax Error';
		this.char = input[pos];
	}
}
