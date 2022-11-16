<script lang="ts">
	import type { OptionsNormalized } from '../optionUtils';
	import { optionDefinitionByKey } from '../optionDefinitions';
	import { createEventDispatcher } from 'svelte';
	import Label from './Label.svelte';

	export let option: keyof OptionsNormalized;
	export let checked: boolean | undefined = undefined;
	export let group: string | undefined = undefined;
	export let groupName: string | undefined = undefined;
	export let groupValue: string | undefined = undefined;

	let dispatch = createEventDispatcher<{ change: boolean }>();

	let def = optionDefinitionByKey[option];
</script>

<Label title={def.description?.join('\n')}>
	{#if group}
		<input type="radio" name={groupName} value={groupValue} bind:group />
	{:else}
		<input
			name={option}
			type="checkbox"
			bind:checked
			on:change={() => dispatch('change', checked)}
		/>
	{/if}
	<span class="name">{def.title} </span>
	{#if $$slots.default}
		{#if checked || (groupName && group === groupValue)}
			<div class="suboptions"><slot /></div>
		{/if}
	{/if}
</Label>

<style>
	.suboptions {
		font-size: 13px;
		margin: 4px 0 18px;
	}
	.suboptions :global(textarea) {
		resize: vertical;
		width: 100%;
		height: 100px;
		padding: 4px 5px;
	}
	.suboptions :global(textarea),
	.suboptions :global(input) {
		font: var(--mono-normal);
		border: 0;
		border-radius: 3px;
		min-height: 24px;
		font-size: 15px;
	}

	input[type='checkbox'],
	input[type='radio'],
	.suboptions :global(input[type='radio']),
	.suboptions :global(input[type='checkbox']) {
		left: 0;
		position: absolute;
		top: 0;
	}

	.suboptions :global(input[type='number']) {
		display: inline-block;
		width: 62px;
	}
</style>
