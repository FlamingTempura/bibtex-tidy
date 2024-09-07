<script lang="ts">
let resetCopyBtnTimeout: ReturnType<typeof setTimeout>;
let showAsCopied = false;
export let bibtex: string;

const handleCopy = () => {
	navigator.clipboard
		.writeText(bibtex)
		.then(() => {
			showAsCopied = true;
			clearInterval(resetCopyBtnTimeout);
			resetCopyBtnTimeout = setTimeout(() => {
				showAsCopied = false;
			}, 3000);
		})
		.catch(() => {
			alert("Failed to copy");
		});
};
</script>

<button
	class="btn"
	id="copy"
	title="Copy bibtex"
	on:click={handleCopy}
	class:copied={showAsCopied}
>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
		<path
			d="M704 896H64V320h640v192h64V192c0-35-29-64-64-64H512C512 57 455 0 384 0S256 57 256 128H64c-35 0-64 29-64 64v704c0 35 29 64 64 64h640c35 0 64-29 64-64V768h-64v128zM192 192h64s64-29 64-64 29-64 64-64 64 29 64 64 32 64 64 64h64s64 29 64 64H128c0-39 28-64 64-64zm-64 512h128v-64H128v64zm448-128V448L320 640l256 192V704h320V576H576zM128 832h192v-64H128v64zm320-448H128v64h320v-64zM256 512H128v64h128v-64z"
		/>
	</svg>
</button>

<style>
	#copy {
		position: absolute;
		top: 12px;
		right: 12px;
		font-weight: bold;
		font-size: 15px;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 8px 8px 8px 12px;
		transition: width 0.5s ease;
		width: 40px;
	}
	#copy:after {
		content: 'Copy';
		overflow: hidden;
		white-space: nowrap;
		text-indent: 6px;
	}
	#copy:hover {
		width: 90px;
	}
	#copy.copied {
		width: 110px;
	}
	#copy.copied:after {
		content: 'Copied!';
	}
	#copy svg {
		fill: currentColor;
		width: 20px;
		flex-shrink: 0;
	}
</style>
