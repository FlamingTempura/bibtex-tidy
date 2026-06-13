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
	name?: string;
	title?: string;
	description?: string[];
	children?: Snippet;
};

let {
	option,
	checked = false,
	onchange,
	name,
	title,
	description,
	children,
}: Props = $props();

export const optionDefinitionByKey: Record<keyof Options, OptionDefinition> =
	Object.fromEntries(optionDefinitions.map((opt) => [opt.key, opt])) as Record<
		keyof Options,
		OptionDefinition
	>;

const getDef = () => optionDefinitionByKey[option];
</script>

<Label title={(description ?? getDef().description)?.join("\n")} inset>
	<Checkbox name={name ?? option} {checked} onchange={(v) => onchange?.(v)} />
	{title ?? getDef().title}
</Label>

{#if children && checked}
	<SubOptions>{@render children()}</SubOptions>
{/if}
