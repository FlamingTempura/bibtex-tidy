<script lang="ts">
import type { BibTeXTidyResult } from "../index.ts";
import type { OptionsNormalized } from "../optionUtils.ts";
import FeedbackError from "./FeedbackError.svelte";
import FeedbackSuccess from "./FeedbackSuccess.svelte";

type Status =
	| { status: "success"; result: BibTeXTidyResult }
	| { status: "error"; error: unknown };

let { options, status }: { options: OptionsNormalized; status: Status } =
	$props();
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
		max-height: 50vh;
		overflow-y: auto;
	}
</style>
