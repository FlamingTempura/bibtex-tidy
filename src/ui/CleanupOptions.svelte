<script lang="ts">
import type { OptionsNormalized } from "../optionUtils";
import Collapsible from "./Collapsible.svelte";
import Option from "./Option.svelte";

export let options: OptionsNormalized;

let omitChecked = options.omit !== undefined && options.omit.length > 0;
let omitValue = options.omit?.join(" ") ?? "";

let stripComments = options.stripComments ?? false;
let tidyComments = options.tidyComments ?? false;
let lowercase = options.lowercase ?? false;
let trailingCommasChecked = options.trailingCommas ?? false;

let generateKeysChecked =
	options.generateKeys !== undefined && options.generateKeys.length > 0;
let generateKeysValue =
	options.generateKeys ??
	"[auth:required:lower][year:required][veryshorttitle:lower][duplicateNumber]";

$: {
	options.omit =
		omitChecked && omitValue.length > 0
			? omitValue.split(/[\n\t ,]+/)
			: undefined;

	options.stripComments = stripComments;
	options.tidyComments = tidyComments;
	options.lowercase = lowercase;
	options.trailingCommas = trailingCommasChecked;
	options.generateKeys = generateKeysChecked ? generateKeysValue : undefined;
}
</script>

<Collapsible title="Clean up" open={true}>
	<Option option="omit" bind:checked={omitChecked}>
		Fields to omit:
		<textarea
			name="omitList"
			class="omit"
			placeholder="e.g. abstract keywords"
			spellcheck="false"
			bind:value={omitValue}
		/>
		<p>Space delimited, e.g: <code>id type publisher author</code></p>
	</Option>

	<Option option="stripComments" bind:checked={stripComments} />

	<Option option="tidyComments" bind:checked={tidyComments} />

	<Option option="lowercase" bind:checked={lowercase} />

	<Option option="generateKeys" bind:checked={generateKeysChecked}>
		<label>
			Template:
			<textarea name="generateKeysTemplate" bind:value={generateKeysValue} />
		</label>
		<p>
			<a href="./manual/key-generation.html" target="_blank">
				Template documentation
			</a>
		</p>
	</Option>

	<Option option="trailingCommas" bind:checked={trailingCommasChecked} />
</Collapsible>

<style>
	textarea.omit {
		height: 50px;
	}
</style>
