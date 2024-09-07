<script lang="ts">
import { DEFAULT_WRAP } from "../optionDefinitions";
import type { OptionsNormalized } from "../optionUtils";
import Collapsible from "./Collapsible.svelte";
import Option from "./Option.svelte";

export let options: OptionsNormalized;

let alignChecked = options.align > 1; // FIXME: allow undefined
let alignValue = alignChecked ? options.align : 13;
let wrapChecked = options.wrap !== undefined;
let wrapValue = options.wrap ?? DEFAULT_WRAP;

$: {
	options.align = alignChecked ? alignValue : 1; // FIXME: allow undefined
	options.wrap = wrapChecked ? wrapValue : undefined;
}
</script>

<Collapsible title="Whitespace" open={true}>
	<Option option="align" bind:checked={alignChecked}>
		<label>
			Column:
			<input name="alignnum" type="number" bind:value={alignValue} />
		</label>
	</Option>

	<Option option="wrap" bind:checked={wrapChecked}>
		<label>
			Column:
			<input name="wrapnum" type="number" bind:value={wrapValue} />
		</label>
	</Option>

	<Option option="blankLines" bind:checked={options.blankLines} />
</Collapsible>
