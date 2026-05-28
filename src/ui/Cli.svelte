<script lang="ts">
import { optionsToCLIArgs } from "../optionsToCLIArgs.ts";
import type { OptionsNormalized } from "../optionUtils.ts";
import Collapsible from "./Collapsible.svelte";

let { options }: { options: OptionsNormalized } = $props();

let args = $derived(
	optionsToCLIArgs(options).map((opt) => {
		const i = opt.indexOf("=");
		return i === -1 ? [opt] : [opt.slice(0, i), opt.slice(i + 1)];
	}),
);
</script>

<Collapsible title="CLI">
	<p>To run this configuration on the command line:</p>
	<code id="cli">
		bibtex-tidy {#each args as [key, value]}
			<span class="opt-name">{key}</span>{#if value && value.length > 0}
				=<span class="opt-val">{value}</span>
			{/if}{" "}
		{/each} YOUR_FILE.bib
	</code>
</Collapsible>

<style>
	#cli {
		display: block;
		padding: 8px;
		word-wrap: break-word;
		.opt-name {
			color: var(--green);
		}
		.opt-val {
			color: var(--orange);
		}
	}
</style>
