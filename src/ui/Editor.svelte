<script lang="ts">
import { onMount } from "svelte";
import CopyButton from "./CopyButton.svelte";
import { createEditor, type Editor } from "./editor.ts";

type Props = {
	value: string;
	errorLine?: number;
	onchange: (value: string) => void;
};

let { value, errorLine, onchange }: Props = $props();

let editorRef = $state<HTMLElement | undefined>(undefined);
let editor = $state<Editor | undefined>();

onMount(() => {
	if (!editorRef) return;

	editor = createEditor(editorRef, value);
	editor.addEventListener("change", onchange);

	// make editor available for tests
	window.cmEditor = editor.view;

	return () => {
		editor?.destroy();
		editor = undefined;
	};
});

$effect(() => {
	editor?.setErrorLine(errorLine ?? null);
});

$effect(() => {
	editor?.setValue(value);
});
</script>

<main id="editor" bind:this={editorRef}>
	<CopyButton bibtex={value} />
</main>

<style>
	#editor {
		position: relative;
		overflow: hidden;

		:global(.cm-editor) {
			color: var(--dark-gray);
			height: 100%;

			:global(.cm-scroller) {
				font: var(--mono-normal);
				font-size: 14px;
				line-height: 1.3em;
				padding: 12px 0 12px 0;
			}
			:global(.cm-gutters) {
				background: var(--main-bg);
				border-color: var(--main-bg);
				color: var(--light6);
				padding-left: 12px;
				:global(.cm-gutter) {
					min-width: 32px;
				}
			}
			:global(.cm-activeLineGutter) {
				background: var(--main-bg);
				color: var(--light1);
			}
			:global(.cm-selectionBackground) {
				background: #283655 !important;
			}
			:global(.cm-cursor) {
				border-left: 2px solid #ffffec;
			}
			:global(.cm-error-line) {
				text-decoration: underline wavy var(--red);
				text-decoration-thickness: 1px;
				text-underline-offset: 3px;
			}
		}
	}
</style>
