<script lang="ts">
import { createEventDispatcher } from "svelte";
import { optionDefinitionByKey } from "../optionDefinitions";
import type { OptionsNormalized } from "../optionUtils";
import Checkbox from "./Checkbox.svelte";
import Label from "./Label.svelte";
import SubOptions from "./SubOptions.svelte";

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
