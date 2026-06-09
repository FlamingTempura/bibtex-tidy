<script lang="ts">
import { BibTeXSyntaxError } from "../parsers/bibtexParser.ts";

let { error }: { error: unknown } = $props();
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
	>
		<circle cx="12" cy="12" r="10" />
		<line x1="12" y1="8" x2="12" y2="12" />
		<line x1="12" y1="16" x2="12.01" y2="16" />
	</svg>

	<div class="text">
		{#if error instanceof BibTeXSyntaxError}
			<strong>There's a problem with the bibtex</strong><br />
			{error.name} on line {error.line} column {error.column}<br />
			{#if error.hint}
				{error.hint}
			{:else if error.char}
				Unexpected {JSON.stringify(error.char)}.
			{:else}
				Invalid BibTeX syntax.
			{/if}
		{:else}
			<strong>There's a problem with the bibtex</strong><br />
			Unknown error: {error}<br />
			This is probably a bug.
		{/if}
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 24px auto;
		gap: 20px;
		margin-left: 8px;
		align-items: center;
		svg {
			color: var(--red);
		}
	}
</style>
