<script lang="ts">
	import { BibTeXSyntaxError } from '../bibtex-parser';
	import bibtexTidy, { type BibTeXTidyResult } from '../';
	import { normalizeOptions, type OptionsNormalized } from '../optionUtils';
	import Editor from './Editor.svelte';
	import Sidebar from './Sidebar.svelte';
	import { DEFAULT_BIBTEX } from './defaultBibtex';

	// Unfortunatly when the UI was originally made public it had different
	// defaults to the CLI/JS API. In future it might be good to make the UI
	// consistent.
	const optionDefaults = normalizeOptions({
		tab: true,
		align: 13,
		curly: true,
		numeric: true,
		escape: false,
		duplicates: ['key'],
		sortFields: true,
		removeDuplicateFields: false,
	});

	let running: boolean = false;
	let bibtex: string = DEFAULT_BIBTEX;
	let options: OptionsNormalized = getOptionsFromURL() ?? optionDefaults;

	let status:
		| { status: 'success'; result: BibTeXTidyResult }
		| { status: 'error'; error: unknown }
		| undefined;
	let errorRange:
		| { start: { line: number; ch: number }; end: { line: number; ch: number } }
		| undefined;

	function handleTidy() {
		running = true;
		status = undefined;
		errorRange = undefined;
		setTimeout(() => {
			// TODO: requestAnimationFrame
			try {
				const result = bibtexTidy.tidy(bibtex, options);
				bibtex = result.bibtex;
				status = { status: 'success', result };
			} catch (e: unknown) {
				console.error('bibtex parse problem:', e);
				status = { status: 'error', error: e };
				if (e instanceof BibTeXSyntaxError) {
					errorRange = {
						start: { line: e.line - 1, ch: e.column - 2 },
						end: { line: e.line - 1, ch: e.column - 1 },
					};
				}
			} finally {
				running = false;
			}
		}, 100);
	}

	function getOptionsFromURL(): OptionsNormalized | undefined {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const optionsJSON = urlParams.get('opt');
		if (!optionsJSON) return;
		try {
			return normalizeOptions(JSON.parse(optionsJSON));
		} catch (e) {
			console.error('Error parsing options in URL');
			return;
		}
	}

	window.addEventListener('popstate', () => {
		options = getOptionsFromURL() ?? optionDefaults;
	});

	$: {
		const optionsJSON = JSON.stringify(options);
		const params = new URLSearchParams([['opt', optionsJSON]]);
		window.history.pushState(options, '', `index.html?${params.toString()}`);
	}
</script>

<Editor bind:bibtex {errorRange} />
<Sidebar on:tidy={handleTidy} {status} {running} bind:options />

<style>
	@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400&family=Inconsolata:wght@400;600&display=swap');

	:global(:root) {
		--header-bg: rgba(0, 0, 0, 0.2);
		--main-bg: #1e272e;
		--main-fg: #edf0f3;
		--red: #de3040;
		--green: #05c46b;
		--orange: #f9b653;
		--pink: #f36eb7;
		--light-blue: #71cafd;
		--blue: #179fef;
		--light-gray: #bdbdbd;
		--dark-gray: #696867;
		--mono-normal: 400 14px 'Inconsolata', monospace;
		--mono-bold: 600 14px 'Inconsolata', monospace;
		--sans-normal: 300 13px 'IBM Plex Sans', sans-serif;
		--sans-title: 400 15px 'IBM Plex Sans', sans-serif;
	}

	:global(*) {
		box-sizing: border-box;
	}
	:global(body) {
		background: var(--main-bg);
		color: var(--main-fg);
		font: var(--sans-normal);
		line-height: 1.5em;
		margin: 0;
	}
	:global(button) {
		cursor: pointer;
	}
	:global(h1) {
		font: var(--sans-title);
		padding: 12px;
		margin: 0px -12px 8px;
		background: var(--header-bg);
	}
	:global(input[type='number']) {
		-moz-appearance: textfield;
	}
	:global(input[type='number']::-webkit-inner-spin-button) {
		-webkit-appearance: none;
	}
	:global(a) {
		color: #fff;
	}

	:global(.btn) {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 3px;
		color: var(--main-fg);
		display: inline-block;
		margin-right: 6px;
		padding: 5px 12px;
		text-decoration: none;
	}
</style>
