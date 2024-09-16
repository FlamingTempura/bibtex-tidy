import type { Node } from "./parsers/bibtexParser";

export function logAST(node: Node, depth = 0) {
	const indent = "  ".repeat(depth);
	let log = `\n${indent}${node.type} ws="${"whitespacePrefix" in node ? node.whitespacePrefix.replace(/\n/g, "\\n") : ""}"`;
	switch (node.type) {
		case "root":
			for (const child of node.children) {
				log += logAST(child, depth + 1);
			}
			break;
		case "block":
			log += ` command="${node.command}"`;
			if (node.block) {
				log += logAST(node.block, depth + 1);
			}
			break;
		case "concat":
			for (const value of node.concat) {
				log += logAST(value, depth + 1);
			}
			break;
		case "entry":
			log += ` key="${node.key}"`;
			for (const field of node.fields) {
				log += logAST(field, depth + 1);
			}
			break;
		case "field":
			log += ` name="${node.name}"`;
			log += logAST(node.value, depth + 1);
			break;
		case "text":
			log += ` text="${node.text.replace(/\n/g, "\\n")}"`;
			break;
		case "braced":
		case "quoted":
		case "comment":
		case "preamble":
		case "string":
		case "literal":
			break;
	}
	return log;
}
