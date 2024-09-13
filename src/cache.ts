import { formatValue } from "./format";
import { type OptionsNormalized, normalizeOptions } from "./optionUtils";
import type {
	BlockNode,
	BracedNode,
	ConcatNode,
	EntryNode,
	FieldNode,
	LiteralNode,
	QuotedNode,
	RootNode,
} from "./parsers/bibtexParser";
import { parseLaTeX } from "./parsers/latexParser";

export class ASTProxy {
	constructor(
		private ast: RootNode,
		private tidyOptions: OptionsNormalized = normalizeOptions({}),
	) {}

	public getAst(): RootNode {
		return this.ast;
	}

	public allFields(): FieldNode[] {
		return this.allEntries().flatMap((entry) => entry.fields);
	}

	public allEntries(): EntryNode[] {
		return this.ast.children
			.filter((node): node is BlockNode => node.type === "block")
			.map((block) => block.block)
			.filter((entry): entry is EntryNode => entry?.type === "entry");
	}

	public mutateEntries(cb: (entry: EntryNode) => void): void {
		const entries = this.allEntries();
		for (const entry of entries) {
			cb(entry);
		}
	}

	public iterateFields(cb: (entry: FieldNode) => void): void {
		const fields = this.allFields();
		for (const field of fields) {
			cb(field);
		}
	}

	public setFieldValue(field: FieldNode, value: ConcatNode["concat"]): void {
		field.value.concat = value;
		this.invalidateEntryValue(field.parent, field.name);
	}

	public mutateValues(
		cb: (node: LiteralNode | BracedNode | QuotedNode) => void,
	): void {
		this.iterateFields((field) => {
			for (const node of field.value.concat) {
				cb(node);
			}
		});
	}

	private valueLookup = new Map<EntryNode, Map<string, string | undefined>>();
	public lookupEntryValue(entry: EntryNode, field: string): string {
		const fieldName = field.toLocaleLowerCase();
		let value = this.valueLookup.get(entry)?.get(field);
		if (value === undefined) {
			const field = this.lookupField(entry, fieldName);
			if (!field) {
				value = "";
			} else {
				value = formatValue(field, this.tidyOptions) ?? "";
			}
			this.valueLookup.set(entry, new Map([[fieldName, value]]));
		}

		return value;
	}

	public invalidateEntryValue(entry: EntryNode, field: string): void {
		this.valueLookup.get(entry)?.delete(field.toLocaleLowerCase());
		this.renderValueLookup.get(entry)?.delete(field.toLocaleLowerCase());
	}

	private fieldLookup = new Map<EntryNode, Map<string, FieldNode>>();
	public lookupField(entry: EntryNode, fieldLc: string): FieldNode | undefined {
		let fieldNode = this.fieldLookup.get(entry)?.get(fieldLc);
		if (fieldNode === undefined) {
			fieldNode = entry.fields.find(
				(field) => field.name.toLocaleLowerCase() === fieldLc,
			);
		}
		return fieldNode;
	}

	private renderValueLookup = new Map<EntryNode, Map<string, string>>();
	public lookupRenderedEntryValue(entry: EntryNode, field: string): string {
		const fieldName = field.toLocaleLowerCase();
		let value = this.renderValueLookup.get(entry)?.get(field);
		if (value === undefined) {
			const entryValue = this.lookupEntryValue(entry, fieldName);
			value = parseLaTeX(entryValue).renderAsText();
			this.renderValueLookup.set(entry, new Map([[fieldName, value]]));
		}
		return value;
	}

	public lookupRenderedEntryValue2(field: FieldNode): string {
		return this.lookupRenderedEntryValue(field.parent, field.name);
	}

	public lookupRenderedEntryValues(entry: EntryNode): Map<string, string> {
		const values = new Map<string, string>();
		for (const field of entry.fields) {
			values.set(field.name, this.lookupRenderedEntryValue(entry, field.name));
		}
		return values;
	}
}
