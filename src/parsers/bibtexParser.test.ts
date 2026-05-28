import { parseBibTeX } from "./bibtexParser.ts";

describe("BibTeX parser", () => {
	it("parses whitespace", () => {
		const input = " @foo{ bar, a = 1} ";
		const output = parseBibTeX(input);

		const blockNode = output.children[0];
		expect(blockNode?.type).toBe("block");
		if (blockNode?.type !== "block") throw new Error("Expected block node");
		expect(blockNode?.command).toBe("foo");
		expect(blockNode?.whitespacePrefix).toBe(" ");

		const entryNode = blockNode?.block;
		expect(entryNode?.type).toBe("entry");
		if (entryNode?.type !== "entry") throw new Error("Expected entry node");

		const fieldNode = entryNode.fields[0];
		expect(fieldNode?.type).toBe("field");
		if (!fieldNode) throw new Error("Expected field node");
		expect(fieldNode.whitespacePrefix).toBe(" ");

		// TODO:
		// const lastTextNode = output.children[1];
		// expect(lastTextNode?.type).toBe("text");
		// expect(lastTextNode?.text).toBe(" ");
		// expect(lastTextNode?.whitespacePrefix).toBe("");
	});

	it("interprets leading whitespace as prefix of first block", () => {
		const input = " \n@foo{bar}";
		const output = parseBibTeX(input);
		const blockNode = output.children[0];
		expect(blockNode?.type).toBe("block");
		if (blockNode?.type !== "block") throw new Error("Expected block node");
		expect(blockNode?.whitespacePrefix).toBe(" \n");
	});

	it("interprets leading BOM as prefix of first block", () => {
		const input = "\uFEFF@foo{bar}";
		const output = parseBibTeX(input);
		const blockNode = output.children[0];
		expect(blockNode?.type).toBe("block");
		if (blockNode?.type !== "block") throw new Error("Expected block node");
		expect(blockNode?.whitespacePrefix).toBe("\uFEFF");
	});
});
