<script lang="ts">
import type { MergeStrategy, OptionsNormalized } from "../optionUtils";
import Checkbox from "./Checkbox.svelte";
import Collapsible from "./Collapsible.svelte";
import Label from "./Label.svelte";
import Option from "./Option.svelte";
import Radio from "./Radio.svelte";

export let options: OptionsNormalized;

let duplicateCheckChecked = options.duplicates !== undefined;
let duplicateCheckKey = options.duplicates?.includes("key") ?? true;
let duplicateCheckDOI = options.duplicates?.includes("doi") ?? false;
let duplicateCheckCitation = options.duplicates?.includes("citation") ?? false;
let duplicateCheckAbstract = options.duplicates?.includes("abstract") ?? false;

let mergeChecked = options.merge !== undefined;
let mergeValue: MergeStrategy = options.merge ?? "combine";

$: {
	if (duplicateCheckChecked) {
		options.duplicates = [];
		if (duplicateCheckKey) options.duplicates.push("key");
		if (duplicateCheckDOI) options.duplicates.push("doi");
		if (duplicateCheckCitation) options.duplicates.push("citation");
		if (duplicateCheckAbstract) options.duplicates.push("abstract");
	} else {
		options.duplicates = undefined;
	}
	options.merge = mergeChecked ? mergeValue : undefined;
}
</script>

<Collapsible title="Duplicates" open={true}>
	<Option option="duplicates" bind:checked={duplicateCheckChecked}>
		<p>What to check:</p>
		<Label>
			<Checkbox name="uniqKEY" bind:checked={duplicateCheckKey} />
			Matching Keys
		</Label>
		<Label>
			<Checkbox name="uniqDOI" bind:checked={duplicateCheckDOI} />
			Matching DOIs
		</Label>
		<Label>
			<Checkbox name="uniqCIT" bind:checked={duplicateCheckCitation} />
			Similar author and title
		</Label>
		<Label>
			<Checkbox name="uniqABS" bind:checked={duplicateCheckAbstract} />
			Similar abstracts
		</Label>
	</Option>

	<Option option="merge" bind:checked={mergeChecked}>
		<Label>
			<Radio name="mergeStrategy" value="combine" bind:group={mergeValue} />
			<span>
				<strong>Combine</strong><br />
				<small>
					Keep original entry and merge in fields of duplicates if they do not
					already exist
				</small>
			</span>
		</Label>
		<Label>
			<Radio name="mergeStrategy" value="overwrite" bind:group={mergeValue} />
			<span>
				<strong>Overwrite</strong><br />
				<small>
					Keep original entry and merge in fields of duplicates, overwriting
					existing fields if they exist
				</small>
			</span>
		</Label>
		<Label>
			<Radio name="mergeStrategy" value="first" bind:group={mergeValue} />
			<span>
				<strong>First</strong><br />
				<small>Only keep the original entry</small>
			</span>
		</Label>
		<Label>
			<Radio name="mergeStrategy" value="last" bind:group={mergeValue} />
			<span>
				<strong>Last</strong><br />
				<small>Only keep the last found duplicate</small>
			</span>
		</Label>
	</Option>
</Collapsible>
