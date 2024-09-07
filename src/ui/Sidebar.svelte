<script lang="ts">
import { createEventDispatcher } from "svelte";
import type { BibTeXTidyResult } from "..";
import type { OptionsNormalized } from "../optionUtils";
import CleanupOptions from "./CleanupOptions.svelte";
import Cli from "./Cli.svelte";
import DuplicateOptions from "./DuplicateOptions.svelte";
import Feedback from "./Feedback.svelte";
import IndentOptions from "./IndentOptions.svelte";
import SortingOptions from "./SortingOptions.svelte";
import ValueOptions from "./ValueOptions.svelte";
import WhitespaceOptions from "./WhitespaceOptions.svelte";

export let status:
	| { status: "success"; result: BibTeXTidyResult }
	| { status: "error"; error: unknown }
	| undefined;
export let running: boolean;
export let options: OptionsNormalized;

let dispatch = createEventDispatcher<{ tidy: undefined }>();
</script>

<aside id="sidebar">
	<form on:submit={() => false}>
		<header class="intro">
			<h1>BibTeX Tidy</h1>
			<p>
				This tool tidies bibtex files by fixing inconsistent whitespace,
				removing duplicates, removing unwanted fields, and sorting entries.
			</p>
			<p>
				<a class="btn" href="https://github.com/FlamingTempura/bibtex-tidy">
					Github
				</a>
				<a
					class="btn"
					href="https://github.com/FlamingTempura/bibtex-tidy/issues"
				>
					Report a bug
				</a>
			</p>
		</header>

		<IndentOptions bind:options />
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
		<button id="tidy" disabled={running} on:click={() => dispatch('tidy')}>
			Tidy
		</button>
	</div>
</aside>

<style>
	#sidebar {
		flex: 0 0 400px;
		border-left: 1px solid var(--border-color);
		display: flex;
		flex-direction: column;
		scrollbar-gutter: stable;
	}
	#sidebar form {
		flex: 1 1 auto;
		padding: 20px;
		overflow: auto;
	}
	#sidebar h1 {
		font: var(--sans-h1);
		color: var(--header-fg);
		margin: 0 0 16px 0;
		padding: 0;
	}
	.intro {
		margin-bottom: 20px;
	}
	#sidebar .run {
		flex: 0 0 auto;
		padding: 20px;
		border-top: 1px solid var(--border-color);
	}
	#sidebar #tidy {
		background: var(--light-blue);
		border: 0;
		color: var(--main-bg);
		font: var(--sans-h1);
		font-size: 15px;
		height: 36px;
		width: 100%;
		border-radius: 3px;
		position: relative;
	}
	#sidebar #tidy[disabled] {
		background: var(--dark-gray);
		color: transparent;
		position: relative;
	}
	#sidebar #tidy[disabled]:after {
		animation: pulse 0.9s infinite linear;
		animation-delay: -0.45s;
		background: #fff;
		border-radius: 50%;
		content: '';
		height: 20px;
		left: 160px;
		position: absolute;
		top: 8px;
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
