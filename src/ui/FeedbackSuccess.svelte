<script lang="ts">
import type { BibTeXTidyResult } from "../index.ts";
import type { OptionsNormalized } from "../optionUtils.ts";

type Props = {
	options: OptionsNormalized;
	result: BibTeXTidyResult;
};

let { options, result }: Props = $props();

let warnings = $derived(
	result.warnings.filter((w) => w.code !== "DUPLICATE_ENTRY"),
);
let dupes = $derived(
	result.warnings.filter((w) => w.code === "DUPLICATE_ENTRY"),
);
</script>

<div class="container">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="feather feather-info"
		><circle cx="12" cy="12" r="10" /><line
			x1="12"
			y1="16"
			x2="12"
			y2="12"
		/><line x1="12" y1="8" x2="12.01" y2="8" /></svg
	>

	<div class="text">
		<strong>Successful!</strong><br />
		Tidied {result.count} entries.

		{#if warnings.length > 0}
			<ul class="warning-list">
				{#each warnings as warning}
					<li>${warning.message}</li>
				{/each}
			</ul>
		{/if}

		{#if dupes.length === 0}
			No duplicates
		{:else}
			<strong>
				{dupes.length}
				{dupes.length === 1 ? 'duplicate' : 'duplicates'}
				{options.merge ? 'merged' : 'found'}:
			</strong>
			<ul class="warning-list">
				{#each dupes as dupe}
					<li>{dupe.message}</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	strong {
		font: var(--sans-h2);
	}
	.container {
		display: flex;
		gap: 20px;
		margin-left: 8px;
		align-items: center;
	}
	.warning-list {
		padding-left: 18px;
	}
	svg {
		flex: 0 0 24px;
		circle,
		line {
			stroke: var(--green);
		}
	}
</style>
