<script lang="ts">
import { type BibTeXTidyResult, tidy } from "../";
import { type OptionsNormalized, normalizeOptions } from "../optionUtils";
import { BibTeXSyntaxError } from "../parsers/bibtexParser";
import Editor from "./Editor.svelte";
import Sidebar from "./Sidebar.svelte";
import { DEFAULT_BIBTEX } from "./defaultBibtex";

// Unfortunatly when the UI was originally made public it had different
// defaults to the CLI/JS API. In future it might be good to make the UI
// consistent.
const optionDefaults = normalizeOptions({
	tab: true,
	align: 13,
	curly: true,
	numeric: true,
	escape: false,
	duplicates: ["key"],
	sortFields: true,
	removeDuplicateFields: false,
});

let running = false;
let bibtex: string = DEFAULT_BIBTEX;
let options: OptionsNormalized = getOptionsFromURL() ?? optionDefaults;

let status:
	| { status: "success"; result: BibTeXTidyResult }
	| { status: "error"; error: unknown }
	| undefined;
let error: BibTeXSyntaxError | undefined;

function handleTidy() {
	running = true;
	status = undefined;
	error = undefined;
	setTimeout(() => {
		// TODO: requestAnimationFrame
		try {
			const result = tidy(bibtex, options);
			bibtex = result.bibtex;
			status = { status: "success", result };
		} catch (e: unknown) {
			console.error("bibtex parse problem:", e);
			status = { status: "error", error: e };
			if (e instanceof BibTeXSyntaxError) {
				error = e;
			}
		} finally {
			running = false;
		}
	}, 100);
}

function getOptionsFromURL(): OptionsNormalized | undefined {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const optionsJSON = urlParams.get("opt");
	if (!optionsJSON) return;
	try {
		return normalizeOptions(JSON.parse(optionsJSON));
	} catch (e) {
		console.error("Error parsing options in URL");
		return;
	}
}

window.addEventListener("popstate", () => {
	options = getOptionsFromURL() ?? optionDefaults;
});

$: {
	const optionsJSON = JSON.stringify(options);
	const params = new URLSearchParams([["opt", optionsJSON]]);
	window.history.pushState(options, "", `index.html?${params.toString()}`);
}
</script>

<Editor bind:bibtex {error} />
<Sidebar on:tidy={handleTidy} {status} {running} bind:options />

<style>
	@font-face {
		font-family: 'IBM Plex Sans';
		font-style: normal;
		font-weight: 300;
		src:
			local('IBM Plex Sans Light'),
			local('IBMPlexSans-Light'),
			url('./fonts/Plex/IBMPlexSans-Light.woff2') format('woff2');
	}
	@font-face {
		font-family: 'IBM Plex Sans';
		font-style: normal;
		font-weight: 500;
		src:
			local('IBM Plex Sans Regular'),
			local('IBMPlexSans-Regular'),
			url('./fonts/Plex/IBMPlexSans-Medium.woff2') format('woff2');
	}
	@font-face {
		font-family: 'Inconsolata';
		font-style: normal;
		font-weight: 400;
		src:
			local('Inconsolata Regular'),
			local('Inconsolata-Regular'),
			url('./fonts/Inconsolata/Inconsolata-Regular.woff2') format('woff2');
	}

	:global(:root) {
		/* https://coolors.co/gradient-palette/1c222a-505f69?number=10 */
		--dark1: #1c222aff;
		--dark2: #222931ff;
		--dark3: #283038ff;
		--dark4: #2d363fff;
		--dark5: #333d46ff;
		--dark6: #39444dff;
		--dark7: #3f4b54ff;
		--dark8: #44515bff;
		--dark9: #4a5862ff;
		--dark10: #505f69ff;

		/* https://coolors.co/gradient-palette/eaeaea-968c8d?number=6 */
		--light1: #eaeaeaff;
		--light2: #d9d7d7ff;
		--light3: #c8c4c5ff;
		--light4: #b8b2b2ff;
		--light5: #a79fa0ff;
		--light6: #968c8dff;

		--red: #de3040;
		--green: #05c46b;
		--orange: #f9b653;
		--pink: #f36eb7;
		--light-blue: #71cafd;

		--main-bg: var(--dark1);
		--border-color: var(--dark6);
		--hover-bg: var(--dark3);
		--main-fg: var(--light2);
		--header-fg: var(--light1);
		--textfield-bg: var(--dark3);
		--light-gray: var(--light3);
		--dark-gray: var(--light6);

		--mono-normal: 400 14px 'Inconsolata', monospace;
		--sans-normal: 300 14px 'IBM Plex Sans', sans-serif;
		--sans-h1: 500 16px 'IBM Plex Sans', sans-serif;
		--sans-h2: 500 14px 'IBM Plex Sans', sans-serif;
	}

	:global(*) {
		box-sizing: border-box;
	}
	:global(html) {
		height: 100%;
	}
	:global(body) {
		background: var(--main-bg);
		color: var(--main-fg);
		font: var(--sans-normal);
		line-height: 1.5em;
		margin: 0;
		display: flex;
		height: 100%;
	}
	:global(button) {
		cursor: pointer;
	}
	:global(input[type='number']),
	:global(textarea) {
		background: var(--textfield-bg);
		color: var(--header-fg);
		border: 1px solid var(--border-color);
		padding: 8px;
		font: var(--sans-normal);
		border-radius: 3px;
		font-size: 15px;
		min-height: 24px;
	}
	:global(input[type='number']) {
		-moz-appearance: textfield;
		margin-left: 8px;
	}
	:global(input[type='number']::-webkit-inner-spin-button) {
		-webkit-appearance: none;
	}
	:global(textarea) {
		margin-top: 4px;
		line-height: 1.4em;
	}
	:global(a) {
		color: inherit;
	}
	:global(p:first-child) {
		margin-top: 0;
	}
	:global(p:last-child) {
		margin-bottom: 0;
	}

	:global(.btn) {
		background: var(--main-bg);
		border: 1px solid var(--border-color);
		border-radius: 3px;
		color: var(--header-fg);
		font: var(--sans-normal);
		display: inline-block;
		margin-right: 6px;
		padding: 5px 12px;
		text-decoration: none;
	}
</style>
