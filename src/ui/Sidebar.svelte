<script lang="ts">
import type { BibTeXTidyResult } from "../index.ts";
import type { OptionsNormalized } from "../optionUtils.ts";
import CleanupOptions from "./CleanupOptions.svelte";
import Cli from "./Cli.svelte";
import DuplicateOptions from "./DuplicateOptions.svelte";
import Feedback from "./Feedback.svelte";
import IndentOptions from "./IndentOptions.svelte";
import SortingOptions from "./SortingOptions.svelte";
import ValueOptions from "./ValueOptions.svelte";
import WhitespaceOptions from "./WhitespaceOptions.svelte";

type Props = {
	status:
		| { status: "success"; result: BibTeXTidyResult }
		| { status: "error"; error: unknown }
		| undefined;
	running: boolean;
	options: OptionsNormalized;
	onchange?: (options: OptionsNormalized) => void;
	ontidy?: () => void;
};

let { status, running, options, onchange, ontidy }: Props = $props();

const updateOptions = (next: OptionsNormalized): void => {
	onchange?.(next);
};
</script>

<aside id="sidebar">
	<form onsubmit={(e) => e.preventDefault()}>
		<header class="intro">
			<h1>BibTeX Tidy</h1>
			<p>
				This tool tidies bibtex files by fixing inconsistent whitespace,
				removing duplicates, removing unwanted fields, and sorting
				entries.
			</p>
			<p>
				<a
					class="btn"
					href="https://github.com/FlamingTempura/bibtex-tidy"
				>
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

		<IndentOptions {options} onchange={updateOptions} />
		<WhitespaceOptions {options} onchange={updateOptions} />
		<ValueOptions {options} onchange={updateOptions} />
		<SortingOptions {options} onchange={updateOptions} />
		<DuplicateOptions {options} onchange={updateOptions} />
		<CleanupOptions {options} onchange={updateOptions} />
		<Cli {options} />
	</form>

	<div class="run">
		{#if status}
			<Feedback {options} {status} />
		{/if}
		<button id="tidy" disabled={running} onclick={ontidy}> Tidy </button>
	</div>
</aside>

<style>
	#sidebar {
		border-left: 1px solid var(--border-color);
		display: grid;
		grid-template-rows: auto auto;
		overflow-y: auto;
		scrollbar-gutter: stable;
		form {
			padding: 20px;
			overflow: auto;
			.intro {
				margin-bottom: 20px;
				h1 {
					font: var(--sans-h1);
					color: var(--header-fg);
					margin: 0 0 16px 0;
					padding: 0;
				}
			}
		}
		.run {
			padding: 20px;
			border-top: 1px solid var(--border-color);

			#tidy {
				background: var(--light-blue);
				border: 0;
				color: var(--main-bg);
				font: var(--sans-h1);
				font-size: 15px;
				height: 36px;
				width: 100%;
				border-radius: 3px;
				position: relative;

				&[disabled] {
					background: var(--dark-gray);
					color: transparent;

					&:after {
						animation: pulse 0.9s infinite linear;
						animation-delay: -0.45s;
						background: #fff;
						border-radius: 50%;
						content: "";
						height: 20px;
						left: 160px;
						position: absolute;
						top: 8px;
						width: 20px;
					}
				}
			}
		}

		:global(code) {
			font-size: 0.9em;
			border: 1px solid rgba(255, 255, 255, 0.2);
			background: rgba(0, 0, 0, 0.1);
			color: var(--light-gray);
			padding: 1px 4px;
			border-radius: 3px;
		}
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
