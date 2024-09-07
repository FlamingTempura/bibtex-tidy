<script lang="ts">
import type { BibTeXTidyResult } from "..";
import type { OptionsNormalized } from "../optionUtils";
import FeedbackError from "./FeedbackError.svelte";
import FeedbackSuccess from "./FeedbackSuccess.svelte";

export let options: OptionsNormalized;
export let status:
	| { status: "success"; result: BibTeXTidyResult }
	| { status: "error"; error: unknown };
</script>

<div role="alert">
	{#if status.status === 'success'}
		<FeedbackSuccess {options} result={status.result} />
	{:else}
		<FeedbackError error={status.error} />
	{/if}
</div>

<style>
	div {
		background: var(--dark2);
		border: 1px solid var(--border-color);
		padding: 12px;
		margin-bottom: 20px;
		border-radius: 8px;
	}
</style>
