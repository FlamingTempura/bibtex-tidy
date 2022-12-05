<script lang="ts">
	import CopyButton from './CopyButton.svelte';
	import CodeMirror from 'codemirror';
	import './bibtex-highlighting';
	import { onMount } from 'svelte';

	export let errorRange:
		| { start: { line: number; ch: number }; end: { line: number; ch: number } }
		| undefined;
	export let bibtex: string;
	let textarea: HTMLTextAreaElement;
	let cmEditor: CodeMirror.EditorFromTextArea;

	let errorHighlight: CodeMirror.TextMarker | undefined;

	onMount(() => {
		if (textarea) {
			cmEditor = CodeMirror.fromTextArea(textarea, {
				lineNumbers: true,
				autofocus: true,
			});
			cmEditor.on('change', () => (bibtex = cmEditor.getValue()));

			// make editor available for tests
			//@ts-ignore
			window.cmEditor = cmEditor;
		}
	});

	$: {
		if (errorRange) {
			errorHighlight = cmEditor.markText(errorRange.start, errorRange.end, {
				className: 'bibtex-error',
			});
		} else if (errorHighlight) {
			errorHighlight.clear();
		}
	}

	$: {
		if (cmEditor && bibtex !== cmEditor.getValue()) {
			cmEditor.setValue(bibtex);
		}
	}
</script>

<main id="editor">
	<textarea bind:this={textarea} />
	<CopyButton {bibtex} />
</main>

<style>
	@import 'codemirror/lib/codemirror.css';

	#editor {
		flex-grow: 1;
		position: relative;
	}
	#editor textarea {
		height: 100%;
		width: 100%;
	}
	:global(.CodeMirror) {
		background: var(--main-bg);
		color: var(--main-fg);
		font: var(--mono-normal);
		height: 100%;
		line-height: 1.3em;
		padding: 12px;
		width: 100%;
	}
	:global(.CodeMirror .CodeMirror-gutters) {
		background: var(--main-bg);
		border-right: 14px solid var(--main-bg);
	}
	:global(.CodeMirror .CodeMirror-linenumber) {
		color: var(--dark-gray);
	}
	:global(.CodeMirror .CodeMirror-selected) {
		background: #283655;
	}
	:global(.CodeMirror .CodeMirror-cursor) {
		border-left: 1px solid #ffffec;
	}
	:global(.CodeMirror .cm-comment) {
		color: var(--dark-gray);
	}
	:global(.CodeMirror .cm-keyword) {
		color: #fff;
	}
	:global(.CodeMirror .cm-variable-2) {
		color: var(--pink);
	}
	:global(.CodeMirror .cm-variable-3) {
		color: var(--orange);
	}
	:global(.CodeMirror .cm-operator) {
		color: var(--light-gray);
	}
	:global(.CodeMirror .cm-string) {
		color: var(--green);
	}
	:global(.CodeMirror .cm-number) {
		color: var(--light-blue);
	}
	:global(.CodeMirror .bibtex-error) {
		background: var(--red);
		color: white;
		font: var(--mono-bold);
	}
</style>
