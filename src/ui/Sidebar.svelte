<script lang="ts">
	import WhitespaceOptions from './WhitespaceOptions.svelte';
	import ValueOptions from './ValueOptions.svelte';
	import SortingOptions from './SortingOptions.svelte';
	import CleanupOptions from './CleanupOptions.svelte';
	import DuplicateOptions from './DuplicateOptions.svelte';
	import Cli from './Cli.svelte';
	import type { OptionsNormalized } from '../optionUtils';
	import { createEventDispatcher } from 'svelte';
	import Feedback from './Feedback.svelte';
	import type { BibTeXTidyResult } from '..';

	export let status:
		| { status: 'success'; result: BibTeXTidyResult }
		| { status: 'error'; error: unknown }
		| undefined;
	export let running: boolean;
	export let options: OptionsNormalized;

	let dispatch = createEventDispatcher<{ tidy: void }>();
</script>

<div id="sidebar">
	<form on:submit={() => false}>
		<h1>BibTeX Tidy</h1>
		<p>
			This tool tidies bibtex files by fixing inconsistent whitespace, removing
			duplicates, removing unwanted fields, and sorting entries.
		</p>
		<p>
			<a class="btn" href="https://github.com/FlamingTempura/bibtex-tidy"
				>Github</a
			>
			<a class="btn" href="https://github.com/FlamingTempura/bibtex-tidy/issues"
				>Report a bug</a
			>
		</p>

		<WhitespaceOptions bind:options />
		<ValueOptions bind:options />
		<SortingOptions bind:options />
		<DuplicateOptions bind:options />
		<CleanupOptions bind:options />
		<Cli {options} />
	</form>

	<div class="run">
		{#if status}
			<Feedback {options} {status} />
		{/if}
		<button id="tidy" disabled={running} on:click={() => dispatch('tidy')}
			>Tidy</button
		>
	</div>
</div>

<style>
	#sidebar {
		background: rgba(154, 199, 255, 0.2);
		bottom: 0;
		box-shadow: 0 0 7px #000;
		display: flex;
		flex-direction: column;
		position: absolute;
		right: 0;
		top: 0;
		width: 320px;
		z-index: 10;
	}
	#sidebar form {
		flex: 1 1 auto;
		overflow: auto;
		padding: 0 12px 200px 12px;
	}
	#sidebar .run {
		flex: 0 0 auto;
	}
	#sidebar #tidy {
		background: var(--blue);
		border: 0;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
		color: #fff;
		font: var(--sans-title);
		font-size: 21px;
		height: 60px;
		width: 100%;
	}
	#sidebar #tidy[disabled] {
		background: var(--dark-gray);
		color: transparent;
		position: relative;
	}
	#sidebar #tidy[disabled]:after {
		animation: pulse 0.9s infinite linear;
		background: #fff;
		border-radius: 50%;
		content: '';
		height: 20px;
		left: 140px;
		position: absolute;
		top: 22px;
		width: 20px;
	}

	#sidebar :global(code) {
		font-size: 0.9em;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(0, 0, 0, 0.1);
		color: var(--light-gray);
		padding: 1px 4px;
		border-radius: 3px;
	}

	@keyframes pulse {
		0% {
			transform: translateX(-80px) scale(0);
		}
		35% {
			transform: translateX(-40px) scale(0.85);
		}
		50% {
			transform: translateX(0px) scale(1);
		}
		65% {
			transform: translateX(40px) scale(0.85);
		}
		100% {
			transform: translateX(80px) scale(0);
		}
	}
</style>
