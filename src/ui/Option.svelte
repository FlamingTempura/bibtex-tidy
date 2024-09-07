<script lang="ts">
import { createEventDispatcher } from "svelte";
import { type OptionDefinition, optionDefinitions } from "../optionDefinitions";
import type { Options, OptionsNormalized } from "../optionUtils";
import Checkbox from "./Checkbox.svelte";
import Label from "./Label.svelte";
import SubOptions from "./SubOptions.svelte";

export let option: keyof OptionsNormalized;
export let checked: boolean | undefined = undefined;

let dispatch = createEventDispatcher<{ change: boolean }>();

export const optionDefinitionByKey: Record<keyof Options, OptionDefinition> =
	Object.fromEntries(optionDefinitions.map((opt) => [opt.key, opt])) as Record<
		keyof Options,
		OptionDefinition
	>;

let def = optionDefinitionByKey[option];
</script>

<Label title={def.description?.join('\n')} inset>
	<Checkbox
		name={option}
		bind:checked
		on:change={() => dispatch('change', checked ?? false)}
	/>
	{def.title}
</Label>
{#if $$slots.default}
	{#if checked}
		<SubOptions><slot /></SubOptions>
	{/if}
{/if}
