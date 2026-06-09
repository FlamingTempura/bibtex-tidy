<script lang="ts">
import type { OptionsNormalized } from "../optionUtils.ts";
import Collapsible from "./Collapsible.svelte";
import Label from "./Label.svelte";
import NumberInput from "./NumberInput.svelte";
import Radio from "./Radio.svelte";
import SubOptions from "./SubOptions.svelte";

type Props = {
	options: OptionsNormalized;
	onchange?: (options: OptionsNormalized) => void;
};

let { options, onchange }: Props = $props();

let indent = $derived<"tabs" | "spaces">(options.tab ? "tabs" : "spaces");
let spaceValue = $derived(options.space);

const updateOptions = (changes: Partial<OptionsNormalized>): void => {
	onchange?.({ ...options, ...changes });
};
</script>

<Collapsible title="Indent" open={true}>
	<Label title="Indent fields with tabs">
		<Radio
			name="indent"
			value="tabs"
			checked={indent === "tabs"}
			onchange={() => updateOptions({ tab: true })}
		/>
		Indent with tabs
	</Label>
	<Label title="Indent fields with spaces">
		<Radio
			name="indent"
			value="spaces"
			checked={indent === "spaces"}
			onchange={() => updateOptions({ tab: false })}
		/>
		Indent with spaces
	</Label>

	{#if indent === 'spaces'}
		<SubOptions>
			<label>
				Spaces:
				<NumberInput
					name="spaces"
					value={spaceValue}
					oninput={(v) => updateOptions({ space: v })}
				/>
			</label>
		</SubOptions>
	{/if}
</Collapsible>
