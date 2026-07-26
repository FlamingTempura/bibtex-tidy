import { ASTProxy } from "./ASTProxy.ts";
import { formatBibtex } from "./format.ts";
import {
	type FieldNode,
	isNodeType,
	LiteralNode,
	parseBibTeX,
	TextNode,
} from "./parsers/bibtexParser.ts";

describe("ASTProxy", () => {
	it("walks matching nodes with ancestor context", () => {
		const ast = new ASTProxy(
			parseBibTeX("@article{key, month = jan, title = jan}"),
		);

		ast.walk({
			where: (node, ctx): node is LiteralNode => {
				if (!isNodeType(node, "literal")) return false;

				const field = ctx.closestAncestor("field");
				return field?.name === "month";
			},
			enter: (node) => [new LiteralNode(node.parent, "feb")],
		});

		expect(formatBibtex(ast.root())).toBe(
			"@article{key, month= feb title= jan\n}\n",
		);
	});

	it("finds the closest ancestor by type", () => {
		const ast = new ASTProxy(
			parseBibTeX("@article{key, month = jan, title = jan}"),
		);

		ast.walk({
			where: (node, ctx): node is LiteralNode =>
				isNodeType(node, "literal") &&
				ctx.closestAncestor("field")?.name === "title",
			enter: (node) => [new LiteralNode(node.parent, "feb")],
		});

		expect(formatBibtex(ast.root())).toBe(
			"@article{key, month= jan title= feb\n}\n",
		);
	});

	it("removes matching nodes", () => {
		const ast = new ASTProxy(
			parseBibTeX("@article{key, title = {Title}, note = {Note}}"),
		);

		ast.walk({
			where: (node): node is FieldNode =>
				isNodeType(node, "field") && node.name === "note",
			enter: () => [],
		});

		expect(formatBibtex(ast.root())).toBe("@article{key, title= {Title}\n}\n");
	});

	it("expands matching value nodes", () => {
		const ast = new ASTProxy(parseBibTeX("@article{key, month = jan}"));

		ast.walk({
			where: (node): node is LiteralNode => isNodeType(node, "literal"),
			enter: (node) => [
				new LiteralNode(node.parent, "feb"),
				new LiteralNode(node.parent, "mar"),
			],
		});

		expect(formatBibtex(ast.root())).toBe(
			"@article{key, month= feb # mar\n}\n",
		);
	});

	it("replaces top-level nodes without constructor side effects", () => {
		const ast = new ASTProxy(parseBibTeX("before @article{key} after"));

		ast.walk({
			where: (node): node is TextNode =>
				isNodeType(node, "text") && node.text === "before ",
			enter: (node) => [new TextNode(node.parent, "prefix ", "")],
		});

		expect(ast.root().children).toHaveLength(3);
		expect(formatBibtex(ast.root())).toBe("prefix @article{key,\n} after\n");
	});

	it("replaces concat nodes", () => {
		const ast = new ASTProxy(parseBibTeX("@article{key, title = {Title}}"));
		const field = ast.entries()[0]?.fields[0];
		const original = field?.value;

		ast.walk({
			where: (node) => isNodeType(node, "concat"),
			enter: (node) => [node.with({ whitespacePrefix: " " })],
		});

		expect(field?.value).not.toBe(original);
		expect(field?.value.whitespacePrefix).toBe(" ");
		expect(original?.whitespacePrefix).toBe("");
		expect(field?.value.concat[0]?.parent).toBe(field?.value);
	});
});
