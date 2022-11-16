<script lang="ts">
	import type { OptionsNormalized } from '../optionUtils';
	import type { BibTeXTidyResult } from '..';
	import FeedbackError from './FeedbackError.svelte';
	import FeedbackSuccess from './FeedbackSuccess.svelte';

	export let options: OptionsNormalized;
	export let status:
		| { status: 'success'; result: BibTeXTidyResult }
		| { status: 'error'; error: unknown };
</script>

<div class="feedback" class:error={status.status === 'error'}>
	{#if status.status === 'success'}
		<FeedbackSuccess {options} result={status.result} />
	{:else}
		<FeedbackError error={status.error} />
	{/if}
</div>

<style>
	.feedback {
		background: var(--green);
		color: #fff;
		font-size: 15px;
		padding: 12px;
	}
	.error {
		background: var(--red);
	}
</style>
