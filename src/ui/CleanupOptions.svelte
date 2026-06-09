<script lang="ts">
import type { OptionsNormalized } from "../optionUtils.ts";
import Collapsible from "./Collapsible.svelte";
import Option from "./Option.svelte";
import TextAreaInput from "./TextAreaInput.svelte";

type Props = {
	options: OptionsNormalized;
	onchange?: (options: OptionsNormalized) => void;
};

const DEFAULT_KEY_TEMPLATE =
	"[auth:required:lower][year:required][veryshorttitle:lower][duplicateNumber]";

let { options, onchange }: Props = $props();

let omitChecked = $derived(options.omit !== undefined);
let omitValue = $derived(options.omit?.join(" ") ?? "");
let stripComments = $derived(options.stripComments ?? false);
let tidyComments = $derived(options.tidyComments ?? false);
let lowercase = $derived(options.lowercase ?? false);
let trailingCommasChecked = $derived(options.trailingCommas ?? false);
let generateKeysChecked = $derived(
	options.generateKeys !== undefined && options.generateKeys.length > 0,
);
let generateKeysValue = $derived(options.generateKeys ?? DEFAULT_KEY_TEMPLATE);

const updateOptions = (changes: Partial<OptionsNormalized>): void => {
	onchange?.({ ...options, ...changes });
};

const getOmit = (checked: boolean, v: string): string[] | undefined => {
	if (!checked) return undefined;
	if (v.length === 0) return [];
	return v.split(/[\n\t ,]+/);
};
</script>

<Collapsible title="Clean up" open={true}>
	<Option
		option="omit"
		checked={omitChecked}
		onchange={(v) => updateOptions({ omit: getOmit(v, omitValue) })}
	>
		Fields to omit:
		<TextAreaInput
			name="omitList"
			placeholder="e.g. abstract keywords"
			spellcheck="false"
			value={omitValue}
			oninput={(v) => updateOptions({ omit: getOmit(omitChecked, v) })}
		/>
		<p>Space delimited, e.g: <code>id type publisher author</code></p>
	</Option>

	<Option
		option="stripComments"
		checked={stripComments}
		onchange={(v) => updateOptions({ stripComments: v })}
	/>

	<Option
		option="tidyComments"
		checked={tidyComments}
		onchange={(v) => updateOptions({ tidyComments: v })}
	/>

	<Option
		option="lowercase"
		checked={lowercase}
		onchange={(v) => updateOptions({ lowercase: v })}
	/>

	<Option
		option="generateKeys"
		checked={generateKeysChecked}
		onchange={(v) => updateOptions({ generateKeys: v ? generateKeysValue : undefined })}
	>
		<label>
			Template:
			<TextAreaInput
				name="generateKeysTemplate"
				value={generateKeysValue}
				oninput={(v) => updateOptions({ generateKeys: v })}
			/>
		</label>
		<p>
			<a href="./manual/key-generation.html" target="_blank">
				Template documentation
			</a>
		</p>
	</Option>

	<Option
		option="trailingCommas"
		checked={trailingCommasChecked}
		onchange={(v) => updateOptions({ trailingCommas: v })}
	/>
</Collapsible>
