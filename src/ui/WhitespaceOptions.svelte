<script lang="ts">
import { DEFAULT_WRAP } from "../optionDefinitions.ts";
import type { OptionsNormalized } from "../optionUtils.ts";
import Collapsible from "./Collapsible.svelte";
import NumberInput from "./NumberInput.svelte";
import Option from "./Option.svelte";

type Props = {
	options: OptionsNormalized;
	onchange?: (options: OptionsNormalized) => void;
};

let { options, onchange }: Props = $props();

let alignChecked = $derived(options.align > 1); // FIXME: allow undefined
let alignValue = $derived(alignChecked ? options.align : 13);
let wrapChecked = $derived(options.wrap !== undefined);
let wrapValue = $derived(options.wrap ?? DEFAULT_WRAP);

const updateOptions = (changes: Partial<OptionsNormalized>): void => {
	onchange?.({ ...options, ...changes });
};
</script>

<Collapsible title="Whitespace" open={true}>
	<Option
		option="align"
		checked={alignChecked}
		onchange={(v) => updateOptions({ align: v ? alignValue : 1 })}
	>
		<label>
			Column:
			<NumberInput
				name="alignnum"
				value={alignValue}
				oninput={(v) => updateOptions({ align: v })}
			/>
		</label>
	</Option>

	<Option
		option="wrap"
		checked={wrapChecked}
		onchange={(v) => updateOptions({ wrap: v ? wrapValue : undefined })}
	>
		<label>
			Column:
			<NumberInput
				name="wrapnum"
				value={wrapValue}
				oninput={(v) => updateOptions({ wrap: v })}
			/>
		</label>
	</Option>

	<Option
		option="blankLines"
		checked={options.blankLines}
		onchange={(v) => updateOptions({ blankLines: v })}
	/>
</Collapsible>
