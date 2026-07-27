import { closestAncestor, getEntries, walkAst } from "./ast.ts";
import { formatBibtex } from "./format.ts";
import { LiteralNode, parseBibTeX } from "./parsers/bibtexParser.ts";

describe("walkAst", () => {
	it("returns a new AST with matching nodes replaced", () => {
		const original = parseBibTeX("@article{key, month = jan, title = jan}");
		const ast = walkAst(original, {
			literal: (node, context) => [
				closestAncestor(context, "field")?.name === "month"
					? new LiteralNode(node.parent, "feb")
					: node,
			],
		});

		expect(formatBibtex(ast)).toBe("@article{key, month= feb title= jan\n}\n");
		expect(formatBibtex(original)).toBe(
			"@article{key, month= jan title= jan\n}\n",
		);
	});

	it("uses next to control descent into a subtree", () => {
		const visited: string[] = [];
		const ast = walkAst(
			parseBibTeX("@article{key, title = {Before \\textit{Inside}}}"),
			{
				_: (node, context) => {
					visited.push(node.type);
					return context.next();
				},
				braced: (node) => {
					visited.push(node.type);
					return [node];
				},
			},
		);

		expect(visited).toContain("braced");
		expect(visited).not.toContain("latexBlock");
		expect(formatBibtex(ast)).toContain("{Before \\textit{Inside}}");
	});

	it("can replace LaTeX nodes with ancestor context", () => {
		const ast = walkAst(
			parseBibTeX("@article{key, title = {Before \\textit{Inside} $x + y$}}"),
			{
				latexCommand: (node) => [node],
				latexText: (node) => [
					node.with({ text: node.text.toLocaleUpperCase() }),
				],
			},
		);

		expect(formatBibtex(ast)).toBe(
			"@article{key, title= {BEFORE \\textit{Inside} $x + y$}\n}\n",
		);
		expect(getEntries(ast)).toHaveLength(1);
	});

	it("allows array children to be removed or expanded", () => {
		const ast = walkAst(
			parseBibTeX("@article{key, month = jan, note = {remove}}"),
			{
				field: (node, ctx) => (node.name === "note" ? [] : ctx.next()),
				literal: (node) => [
					new LiteralNode(node.parent, "feb"),
					new LiteralNode(node.parent, "mar"),
				],
			},
		);

		expect(formatBibtex(ast)).toBe("@article{key, month= feb # mar\n}\n");
	});

	it("requires exactly one replacement for a singular child", () => {
		expect(() =>
			walkAst(parseBibTeX("@article{key, month = jan}"), {
				concat: () => [],
			}),
		).toThrow("Expected exactly one replacement for concat, received 0");

		expect(() =>
			walkAst(parseBibTeX("@article{key, month = jan}"), {
				concat: (node) => [node, node],
			}),
		).toThrow("Expected exactly one replacement for concat, received 2");
	});
});
