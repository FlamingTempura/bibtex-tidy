<script lang="ts">
import type { Snippet } from "svelte";
import {
	type OptionDefinition,
	optionDefinitions,
} from "../optionDefinitions.ts";
import type { Options, OptionsNormalized } from "../optionUtils.ts";
import Checkbox from "./Checkbox.svelte";
import Label from "./Label.svelte";
import SubOptions from "./SubOptions.svelte";

type Props = {
	option: keyof OptionsNormalized;
	checked?: boolean;
	onchange?: (value: boolean) => void;
	children?: Snippet;
};

let { option, checked = false, onchange, children }: Props = $props();

export const optionDefinitionByKey: Record<keyof Options, OptionDefinition> =
	Object.fromEntries(optionDefinitions.map((opt) => [opt.key, opt])) as Record<
		keyof Options,
		OptionDefinition
	>;

const getDef = () => optionDefinitionByKey[option];
</script>

<Label title={getDef().description?.join("\n")} inset>
	<Checkbox name={option} {checked} onchange={(v) => onchange?.(v)} />
	{getDef().title}
</Label>

{#if children && checked}
	<SubOptions>{@render children()}</SubOptions>
{/if}
