<script lang="ts">
import { onDestroy } from "svelte";

let resetCopyBtnTimeout: ReturnType<typeof setTimeout>;
let showAsCopied = $state(false);
let { bibtex }: { bibtex: string } = $props();

const handleCopy = () => {
	navigator.clipboard
		.writeText(bibtex)
		.then(() => {
			showAsCopied = true;
			clearTimeout(resetCopyBtnTimeout);
			resetCopyBtnTimeout = setTimeout(() => {
				showAsCopied = false;
			}, 3000);
		})
		.catch(() => {
			alert("Failed to copy");
		});
};

onDestroy(() => {
	clearTimeout(resetCopyBtnTimeout);
});
</script>

<button
	class="btn"
	id="copy"
	title="Copy bibtex"
	aria-label="Copy bibtex"
	onclick={handleCopy}
	class:copied={showAsCopied}
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
		<path
			d="M704 896H64V320h640v192h64V192c0-35-29-64-64-64H512C512 57 455 0 384 0S256 57 256 128H64c-35 0-64 29-64 64v704c0 35 29 64 64 64h640c35 0 64-29 64-64V768h-64v128zM192 192h64s64-29 64-64 29-64 64-64 64 29 64 64 32 64 64 64h64s64 29 64 64H128c0-39 28-64 64-64zm-64 512h128v-64H128v64zm448-128V448L320 640l256 192V704h320V576H576zM128 832h192v-64H128v64zm320-448H128v64h320v-64zM256 512H128v64h128v-64z"
		/>
	</svg>
	<div class="label">{showAsCopied ? "Copied!" : "Copy"}</div>
</button>

<style>
	#copy {
		--text-width: 0ch;
		--text-opacity: 0;
		&:hover {
			--text-width: 4ch;
			--text-opacity: 1;
		}
		&.copied {
			--text-width: 6ch;
			--text-opacity: 1;
		}
		position: absolute;
		top: 12px;
		right: 12px;
		font-weight: bold;
		font-size: 15px;
		z-index: 100;
		display: grid;
		grid-template-columns: auto var(--text-width);
		align-items: center;
		justify-items: start;
		transition: grid-template-columns 0.5s ease;
		padding: 0;
		overflow: hidden;
		.label {
			opacity: var(--text-opacity);
			transition: opacity 0.3s ease;
			transform: translateX(-3px);
		}
		svg {
			fill: currentColor;
			width: 20px;
			margin: 9px 6px 8px 12px;
		}
	}
</style>
