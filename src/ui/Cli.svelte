<script lang="ts">
import { optionsToCLIArgs } from "../optionsToCLIArgs.ts";
import type { OptionsNormalized } from "../optionUtils.ts";
import Collapsible from "./Collapsible.svelte";

let { options }: { options: OptionsNormalized } = $props();

let args = $derived(
	optionsToCLIArgs(options).map((arg) => {
		const eqIndex = arg.indexOf("=");
		return eqIndex === -1
			? { key: arg }
			: { key: arg.slice(0, eqIndex), val: arg.slice(eqIndex + 1) };
	}),
);
</script>

<Collapsible title="CLI">
	<p>To run this configuration on the command line:</p>
	<code id="cli">
		bibtex-tidy {#each args as { key, val }}
			<span class="opt-name">{key}</span>{#if val}=<span class="opt-val"
					>{val}</span
				>{/if}{" "}
		{/each}YOUR_FILE.bib
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
