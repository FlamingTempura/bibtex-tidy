<script lang="ts">
import { history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { bracketMatching } from "@codemirror/language";
import { linter } from "@codemirror/lint";
import { Compartment, EditorState } from "@codemirror/state";
import {
	drawSelection,
	dropCursor,
	EditorView,
	highlightActiveLineGutter,
	keymap,
	lineNumbers,
	type ViewUpdate,
} from "@codemirror/view";
import { onMount } from "svelte";
import type { BibTeXSyntaxError } from "../parsers/bibtexParser.ts";
import CopyButton from "./CopyButton.svelte";
import {
	bibtexLanguage,
	bibtexSyntaxHighlighting,
} from "./codemirrorExtensions/index.ts";

type Props = {
	bibtex: string;
	error: BibTeXSyntaxError | undefined;
	onbibtexchange?: (bibtex: string) => void;
};

let { bibtex, error, onbibtexchange }: Props = $props();

let editorRef = $state<HTMLElement | undefined>(undefined);
let cmEditor: EditorView | undefined;
let lintCompartment: Compartment;

const applyLint = (): void => {
	if (!cmEditor || !lintCompartment) return;

	cmEditor.dispatch({
		effects: lintCompartment.reconfigure(
			linter(() => {
				if (error && cmEditor) {
					const line = cmEditor.state.doc.line(error.line);
					const from = line.from;
					const to = line.to;
					return [
						{
							from,
							to,
							severity: "error",
							message: "Syntax Error",
						},
					];
				}
				return [];
			}),
		),
	});
};

const applyExternalBibtex = (): void => {
	if (!cmEditor || bibtex === cmEditor.state.doc.toString()) return;

	cmEditor.dispatch({
		changes: { from: 0, to: cmEditor.state.doc.length, insert: bibtex },
	});
};

onMount(() => {
	if (!editorRef) return;

	const onUpdate = EditorView.updateListener.of((v: ViewUpdate) => {
		if (cmEditor && v.docChanged) {
			onbibtexchange?.(cmEditor.state.doc.toString());
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

				EditorView.contentAttributes.of({
					"aria-label": "BibTeX Editor",
				}),

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
	applyLint();
	applyExternalBibtex();
});

$effect(() => {
	// Track 'error' so the lint markers update whenever the prop changes.
	error;
	applyLint();
});

$effect(() => {
	// Track 'bibtex' so the editor content is replaced whenever the prop
	// changes externally (e.g. after pressing Tidy).
	bibtex;
	applyExternalBibtex();
});
</script>

<main id="editor" bind:this={editorRef}>
	<CopyButton {bibtex} />
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
			:global(.cm-lintRange-error) {
				background: none;
				border-bottom: 2px solid var(--red);
			}
		}
	}
</style>
