<script lang="ts">
	import type { OptionsNormalized } from '../optionUtils';
	import { optionDefinitionByKey } from '../optionDefinitions';
	import { createEventDispatcher } from 'svelte';
	import Label from './Label.svelte';
	import SubOptions from './SubOptions.svelte';
	import Checkbox from './Checkbox.svelte';

	export let option: keyof OptionsNormalized;
	export let checked: boolean | undefined = undefined;

	let dispatch = createEventDispatcher<{ change: boolean }>();

	let def = optionDefinitionByKey[option];
</script>

<Label title={def.description?.join('\n')} inset>
	<Checkbox
		name={option}
		bind:checked
		on:change={() => dispatch('change', checked)}
	/>
	{def.title}
</Label>
{#if $$slots.default}
	{#if checked}
		<SubOptions><slot /></SubOptions>
	{/if}
{/if}
