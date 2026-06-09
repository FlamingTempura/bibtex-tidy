<script lang="ts">
import { DEFAULT_FIELD_SORT, DEFAULT_SORT } from "../optionDefinitions.ts";
import type { OptionsNormalized } from "../optionUtils.ts";
import Collapsible from "./Collapsible.svelte";
import Option from "./Option.svelte";
import TextAreaInput from "./TextAreaInput.svelte";

type Props = {
	options: OptionsNormalized;
	onchange?: (options: OptionsNormalized) => void;
};

let { options, onchange }: Props = $props();

let sortFieldsChecked = $derived(
	options.sortFields !== undefined && options.sortFields.length > 0,
);
let sortFieldsValue = $derived(
	(options.sortFields ?? DEFAULT_FIELD_SORT).join(" "),
);

let sortChecked = $derived(
	options.sort !== undefined && options.sort.length > 0,
);
let sortValue = $derived((options.sort ?? DEFAULT_SORT).join(" "));

const updateOptions = (changes: Partial<OptionsNormalized>): void => {
	onchange?.({ ...options, ...changes });
};

const splitFields = (checked: boolean, value: string): string[] | undefined =>
	checked && value.length > 0 ? value.split(/[\n\t ,]+/) : undefined;
</script>

<Collapsible title="Sorting" open={true}>
	<Option
		option="sort"
		checked={sortChecked}
		onchange={(v) => updateOptions({ sort: splitFields(v, sortValue) })}
	>
		<label>
			Fields to sort by:
			<TextAreaInput
				name="sortList"
				spellcheck="false"
				value={sortValue}
				oninput={(v) => updateOptions({ sort: splitFields(sortChecked, v) })}
			/>
		</label>
		<p>
			Space delimited, e.g: <code>key type publisher author</code>. For
			descending order, prefix the field name with a dash, e.g.
			<code>-year author</code>.
		</p>
		<p>
			In addition to field names, you can use <code>key</code> to sort by
			citation key,
			<code>type</code> to sort by entry type (@article, @misc, etc), and
			<code>special</code> to sort special entries (@string, @preamble, @xdata,
			and @set) to the top.
		</p>
	</Option>

	<Option
		option="sortFields"
		checked={sortFieldsChecked}
		onchange={(v) => updateOptions({ sortFields: splitFields(v, sortFieldsValue) })}
	>
		<label>
			Field order:
			<TextAreaInput
				name="sortFieldList"
				spellcheck="false"
				value={sortFieldsValue}
				oninput={(v) =>
					updateOptions({ sortFields: splitFields(sortFieldsChecked, v) })}
			/>
		</label>
		<p>Space delimited, e.g: <code>title author year</code></p>
	</Option>
</Collapsible>

<style>
</style>
