<script lang="ts">
import type { OptionsNormalized } from "../optionUtils";
import Collapsible from "./Collapsible.svelte";
import Label from "./Label.svelte";
import Radio from "./Radio.svelte";
import SubOptions from "./SubOptions.svelte";

export let options: OptionsNormalized;

let indent: "tabs" | "spaces" = options.tab ? "tabs" : "spaces";

let spaceValue = options.space;

$: {
	options.space = spaceValue; // FIXME: allow undefined if tab
	options.tab = indent === "tabs";
}
</script>

<Collapsible title="Indent" open={true}>
	<Label title="Indent fields with tabs">
		<Radio name="indent" value="tabs" bind:group={indent} />
		Indent with tabs
	</Label>
	<Label title="Indent fields with spaces">
		<Radio name="indent" value="spaces" bind:group={indent} />
		Indent with spaces
	</Label>

	{#if indent === 'spaces'}
		<SubOptions>
			<label>
				Spaces: <input name="spaces" type="number" bind:value={spaceValue} />
			</label>
		</SubOptions>
	{/if}
</Collapsible>
