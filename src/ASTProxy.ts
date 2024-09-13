import { formatValue } from "./format";
import { type OptionsNormalized, normalizeOptions } from "./optionUtils";
import type {
	BlockNode,
	EntryNode,
	FieldNode,
	RootNode,
} from "./parsers/bibtexParser";
import { parseLaTeX } from "./parsers/latexParser";

export class ASTProxy {
	constructor(
		private ast: RootNode,
		private tidyOptions: OptionsNormalized = normalizeOptions({}),
	) {}

	public root(): RootNode {
		return this.ast;
	}

	public fields(): FieldNode[] {
		return this.entries().flatMap((entry) => entry.fields);
	}

	public entries(): EntryNode[] {
		return this.ast.children
			.filter((node): node is BlockNode => node.type === "block")
			.map((block) => block.block)
			.filter((entry): entry is EntryNode => entry?.type === "entry");
	}

	public invalidateField(field: FieldNode): void {
		this.renderValueLookup.delete(field);
	}

	private fieldLookup = new Map<EntryNode, Map<string, FieldNode>>();
	private lookupField(
		entry: EntryNode,
		fieldLc: string,
	): FieldNode | undefined {
		let fieldNode = this.fieldLookup.get(entry)?.get(fieldLc);
		if (fieldNode === undefined) {
			fieldNode = entry.fields.find(
				(field) => field.name.toLocaleLowerCase() === fieldLc,
			);
		}
		return fieldNode;
	}

	private renderValueLookup = new Map<FieldNode, string>();

	public lookupRenderedEntryValue(entry: EntryNode, fieldname: string): string;
	public lookupRenderedEntryValue(field: FieldNode): string;
	public lookupRenderedEntryValue(
		node: EntryNode | FieldNode,
		fieldName?: string,
	): string {
		const field =
			node.type === "entry"
				? this.lookupField(node, (fieldName ?? "").toLocaleLowerCase())
				: node;

		if (!field) {
			return "";
		}
		let value = this.renderValueLookup.get(field);
		if (value === undefined) {
			const entryValue = formatValue(field, this.tidyOptions) ?? "";
			value = parseLaTeX(entryValue).renderAsText();
			this.renderValueLookup.set(field, value);
		}
		return value;
	}

	public lookupRenderedEntryValues(entry: EntryNode): Map<string, string> {
		const values = new Map<string, string>();
		for (const field of entry.fields) {
			values.set(field.name, this.lookupRenderedEntryValue(field));
		}
		return values;
	}
}
