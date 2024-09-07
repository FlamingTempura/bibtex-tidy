<script lang="ts">
import { DEFAULT_FIELD_SORT, DEFAULT_SORT } from "../optionDefinitions";
import type { OptionsNormalized } from "../optionUtils";
import Collapsible from "./Collapsible.svelte";
import Option from "./Option.svelte";

export let options: OptionsNormalized;

let sortFieldsChecked =
	options.sortFields !== undefined && options.sortFields.length > 0;
let sortFieldsValue = (options.sortFields ?? DEFAULT_FIELD_SORT).join(" ");

let sortChecked = options.sort !== undefined && options.sort.length > 0;
let sortValue = (options.sort ?? DEFAULT_SORT).join(" ");

$: {
	options.sortFields =
		sortFieldsChecked && sortFieldsValue.length > 0
			? sortFieldsValue.split(/[\n\t ,]+/)
			: undefined;
	options.sort =
		sortChecked && sortValue.length > 0
			? sortValue.split(/[\n\t ,]+/)
			: undefined;
}
</script>

<Collapsible title="Sorting" open={true}>
	<Option option="sort" bind:checked={sortChecked}>
		<label>
			Fields to sort by:
			<textarea name="sortList" spellcheck="false" bind:value={sortValue} />
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
			<code>special</code> to sort special entries (@string, @preamble, @xdata, and
			@set) to the top.
		</p>
	</Option>

	<Option option="sortFields" bind:checked={sortFieldsChecked}>
		<label>
			Field order:
			<textarea
				name="sortFieldList"
				spellcheck="false"
				bind:value={sortFieldsValue}
			/>
		</label>
		<p>Space delimited, e.g: <code>title author year</code></p>
	</Option>
</Collapsible>

<style>
</style>
