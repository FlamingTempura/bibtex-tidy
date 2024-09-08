import { formatValue } from "./format";
import { type OptionsNormalized, normalizeOptions } from "./optionUtils";
import type { EntryNode, FieldNode } from "./parsers/bibtexParser";
import { parseLaTeX } from "./parsers/latexParser";

export class Cache {
	constructor(private tidyOptions: OptionsNormalized = normalizeOptions({})) {}

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

	public lookupRenderedEntryValues(entry: EntryNode): Map<string, string> {
		const values = new Map<string, string>();
		for (const field of entry.fields) {
			values.set(field.name, this.lookupRenderedEntryValue(entry, field.name));
		}
		return values;
	}
}
