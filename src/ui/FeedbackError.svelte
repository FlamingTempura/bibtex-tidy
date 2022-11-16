<script lang="ts">
	import { BibTeXSyntaxError } from '../bibtex-parser';
	export let error: unknown;
</script>

{#if error instanceof BibTeXSyntaxError}
	<strong>There's a problem with the bibtex (${error.name})</strong><br />
	Syntax Error on line ${error.line} column ${error.column}<br />
	{error.hint ??
		`Unexpected ${JSON.stringify(error.char)} in ${error.node.type}.`}
{:else}
	<strong>There's a problem with the bibtex</strong><br />
	Unknown error: {error}<br />
	This is probably a bug.
{/if}
