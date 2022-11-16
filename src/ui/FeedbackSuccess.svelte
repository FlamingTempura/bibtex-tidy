<script lang="ts">
	import type { BibTeXTidyResult } from '..';
	import type { OptionsNormalized } from '../optionUtils';

	export let options: OptionsNormalized;
	export let result: BibTeXTidyResult;

	let warnings = result.warnings.filter((w) => w.code !== 'DUPLICATE_ENTRY');
	let dupes = result.warnings.filter((w) => w.code === 'DUPLICATE_ENTRY');
</script>

<strong>Successful!</strong><br />
Tidied {result.count} entries.<br /><br />

<ul>
	{#each warnings as warning}
		<li>${warning.message}</li>
	{/each}
</ul>

{#if options.merge}
	{#if dupes.length === 0}
		No duplicates
	{:else}
		<strong
			>{dupes.length} merged:
			<ul>
				{#each dupes as dupe}
					<li>{dupe.message}</li>
				{/each}
			</ul>
		</strong>
	{/if}
{/if}
