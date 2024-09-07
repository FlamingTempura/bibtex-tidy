<script lang="ts">
import { history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { bracketMatching } from "@codemirror/language";
import { linter } from "@codemirror/lint";
import { Compartment, EditorState } from "@codemirror/state";
import {
	EditorView,
	type ViewUpdate,
	drawSelection,
	dropCursor,
	highlightActiveLineGutter,
	keymap,
	lineNumbers,
} from "@codemirror/view";
import { onMount } from "svelte";
import type { BibTeXSyntaxError } from "../bibtexParser";
import CopyButton from "./CopyButton.svelte";
import {
	bibtexLanguage,
	bibtexSyntaxHighlighting,
} from "./codemirrorExtensions";

export let bibtex: string;
export let error: BibTeXSyntaxError | undefined;

let editorRef: HTMLElement;
let cmEditor: EditorView | undefined;
let lintCompartment: Compartment;

onMount(() => {
	const onUpdate = EditorView.updateListener.of((v: ViewUpdate) => {
		if (cmEditor && v.docChanged) {
			bibtex = cmEditor.state.doc.toString();
		}
	});

	lintCompartment = new Compartment();

	cmEditor = new EditorView({
		parent: editorRef,
		state: EditorState.create({
			doc: bibtex,
			extensions: [
				lineNumbers(),

				highlightActiveLineGutter(),

				// For dragging text onto the editor
				dropCursor(),

				EditorState.allowMultipleSelections.of(true),

				// Highlight matching brackets
				bracketMatching(),

				// Replace native selection with customisable one (e.g. background
				// color)
				drawSelection(),

				bibtexLanguage(),
				bibtexSyntaxHighlighting(),

				keymap.of([...historyKeymap, indentWithTab]),
				// Enables undo/redo. Without this, codemirror completely bugs out on
				// undo/redo
				history(),
				// Listen for changes and propagate to state
				onUpdate,

				lintCompartment.of([]),
			],
		}),
	});

	cmEditor.focus();

	// make editor available for tests
	window.cmEditor = cmEditor;
});

$: {
	cmEditor?.dispatch({
		effects: lintCompartment.reconfigure(
			linter(() => {
				if (error && cmEditor) {
					const line = cmEditor.state.doc.line(error.line);
					const from = line.from;
					const to = line.to;
					return [{ from, to, severity: "error", message: "Syntax Error" }];
				}
				return [];
			}),
		),
	});
}

$: {
	// update editor content from incoming state
	if (cmEditor && bibtex !== cmEditor.state.doc.toString()) {
		cmEditor.dispatch({
			changes: { from: 0, to: cmEditor.state.doc.length, insert: bibtex },
		});
	}
}
</script>

<main id="editor" bind:this={editorRef}>
	<CopyButton {bibtex} />
</main>

<style>
	#editor {
		flex-grow: 1;
		position: relative;
		overflow: hidden;
	}
	:global(.cm-editor) {
		color: var(--dark-gray);
		height: 100%;
	}

	:global(.cm-editor .cm-scroller) {
		font: var(--mono-normal);
		font-size: 14px;
		line-height: 1.3em;
		padding: 12px 0 12px 0;
	}
	:global(.cm-editor .cm-gutters) {
		background: var(--main-bg);
		border-right: 14px solid var(--main-bg);
		color: var(--light6);
		padding-left: 12px;
	}
	:global(.cm-editor .cm-activeLineGutter) {
		background: var(--main-bg);
		color: var(--light1);
	}
	:global(.cm-editor .cm-gutters .cm-gutter) {
		min-width: 32px;
	}
	:global(.cm-editor .cm-selectionBackground) {
		background: #283655 !important;
	}
	:global(.cm-editor .cm-cursor) {
		border-left: 2px solid #ffffec;
	}
	:global(.cm-editor .cm-lintRange-error) {
		background: none;
		border-bottom: 2px solid var(--red);
	}
</style>
