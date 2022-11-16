<script lang="ts">
	import Option from './Option.svelte';
	import type { MergeStrategy, OptionsNormalized } from '../optionUtils';
	import Collapsible from './Collapsible.svelte';
	import Label from './Label.svelte';

	export let options: OptionsNormalized;

	let duplicateCheckChecked = options.duplicates !== undefined;
	let duplicateCheckKey = options.duplicates?.includes('key') ?? true;
	let duplicateCheckDOI = options.duplicates?.includes('doi') ?? false;
	let duplicateCheckCitation =
		options.duplicates?.includes('citation') ?? false;
	let duplicateCheckAbstract =
		options.duplicates?.includes('abstract') ?? false;

	let mergeChecked = options.merge !== undefined;
	let mergeValue: MergeStrategy = options.merge ?? 'combine';

	$: {
		if (duplicateCheckChecked) {
			options.duplicates = [];
			if (duplicateCheckKey) options.duplicates.push('key');
			if (duplicateCheckDOI) options.duplicates.push('doi');
			if (duplicateCheckCitation) options.duplicates.push('citation');
			if (duplicateCheckAbstract) options.duplicates.push('abstract');
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
			<input name="uniqKEY" type="checkbox" bind:checked={duplicateCheckKey} />
			Matching Keys
		</Label>
		<Label>
			<input name="uniqDOI" type="checkbox" bind:checked={duplicateCheckDOI} />
			Matching DOIs
		</Label>
		<Label>
			<input
				name="uniqCIT"
				type="checkbox"
				bind:checked={duplicateCheckCitation}
			/>
			Similar author and title
		</Label>
		<Label>
			<input
				name="uniqABS"
				type="checkbox"
				bind:checked={duplicateCheckAbstract}
			/>
			Similar abstracts
		</Label>
	</Option>

	<Option option="merge" bind:checked={mergeChecked}>
		<Label>
			<input
				name="mergeStrategy"
				type="radio"
				value="combine"
				bind:group={mergeValue}
			/>
			<strong>Combine</strong> (default)<br />
			<small>
				Keep original entry and merge in fields of duplicates if they do not
				already exist
			</small>
		</Label>
		<Label>
			<input
				name="mergeStrategy"
				type="radio"
				value="overwrite"
				bind:group={mergeValue}
			/>
			<strong>Overwrite</strong><br />
			<small>
				Keep original entry and merge in fields of duplicates, overwriting
				existing fields if they exist
			</small>
		</Label>
		<Label>
			<input
				name="mergeStrategy"
				type="radio"
				value="first"
				bind:group={mergeValue}
			/>
			<strong>First</strong><br />
			<small>Only keep the original entry</small>
		</Label>
		<Label>
			<input
				name="mergeStrategy"
				type="radio"
				value="last"
				bind:group={mergeValue}
			/>
			<strong>Last</strong><br />
			<small>Only keep the last found duplicate</small>
		</Label>
	</Option>
</Collapsible>
