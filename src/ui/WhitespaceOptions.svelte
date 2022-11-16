<script lang="ts">
	import Option from './Option.svelte';
	import type { OptionsNormalized } from '../optionUtils';
	import {
		DEFAULT_ALIGN,
		DEFAULT_SPACE,
		DEFAULT_WRAP,
	} from '../optionDefinitions';
	import Collapsible from './Collapsible.svelte';

	export let options: OptionsNormalized;

	let alignChecked = options.align !== 1; // FIXME: allow undefined
	let alignValue = options.align ?? DEFAULT_ALIGN;
	let wrapChecked = options.wrap !== undefined;
	let wrapValue = options.wrap ?? DEFAULT_WRAP;
	let indent: 'tabs' | 'spaces' = options.tab ? 'tabs' : 'spaces';

	let spaceValue = DEFAULT_SPACE;

	$: {
		options.align = alignChecked ? alignValue : 1; // FIXME: allow undefined
		options.wrap = wrapChecked ? wrapValue : undefined;

		options.space = spaceValue; // FIXME: allow undefined if tab
		options.tab = indent === 'tabs';
	}
</script>

<Collapsible title="Whitespace" open={true}>
	<Option
		option="tab"
		groupName="indent"
		groupValue="tabs"
		bind:group={indent}
	/>

	<Option
		option="space"
		groupName="indent"
		groupValue="spaces"
		bind:group={indent}
	>
		<div class="keyvalue">
			Spaces: <input name="spaces" type="number" bind:value={spaceValue} />
		</div>
	</Option>

	<Option option="align" bind:checked={alignChecked}>
		<div class=" keyvalue">
			Column:
			<input name="alignnum" type="number" bind:value={alignValue} />
		</div>
	</Option>

	<Option option="wrap" bind:checked={wrapChecked}>
		<div class=" keyvalue">
			Column:
			<input name="wrapnum" type="number" bind:value={wrapValue} />
		</div>
	</Option>

	<Option option="blankLines" bind:checked={options.blankLines} />
</Collapsible>

<style>
	.keyvalue input {
		margin-left: 8px;
	}
</style>
