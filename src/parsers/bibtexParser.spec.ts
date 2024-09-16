import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { parseBibTeX } from "./bibtexParser";

describe("BibTeX parser", () => {
	it("parses whitespace", () => {
		const input = " @foo{ bar, a = 1} ";
		const output = parseBibTeX(input);

		const blockNode = output.children[0];
		strictEqual(blockNode?.type, "block");
		strictEqual(blockNode?.command, "foo");
		strictEqual(blockNode?.whitespacePrefix, " ");

		const entryNode = blockNode?.block;
		strictEqual(entryNode?.type, "entry");

		const fieldNode = entryNode.fields[0];
		strictEqual(fieldNode?.type, "field");
		strictEqual(fieldNode.whitespacePrefix, " ");

		// TODO:
		// const lastTextNode = output.children[1];
		// strictEqual(lastTextNode?.type, "text");
		// strictEqual(lastTextNode?.text, " ");
		// strictEqual(lastTextNode?.whitespacePrefix, "");
	});

	it("interprets leading whitespace as prefix of first block", () => {
		const input = " \n@foo{bar}";
		const output = parseBibTeX(input);
		const blockNode = output.children[0];
		strictEqual(blockNode?.type, "block");
		strictEqual(blockNode?.whitespacePrefix, " \n");
	});

	it("interprets leading BOM as prefix of first block", () => {
		const input = "\uFEFF@foo{bar}";
		const output = parseBibTeX(input);
		const blockNode = output.children[0];
		strictEqual(blockNode?.type, "block");
		strictEqual(blockNode?.whitespacePrefix, "\uFEFF");
	});
});
