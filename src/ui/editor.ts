import { history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { bracketMatching } from "@codemirror/language";
import {
	Annotation,
	EditorState,
	StateEffect,
	StateField,
} from "@codemirror/state";
import {
	Decoration,
	drawSelection,
	dropCursor,
	EditorView,
	highlightActiveLineGutter,
	keymap,
	lineNumbers,
	type ViewUpdate,
} from "@codemirror/view";
import {
	bibtexLanguage,
	bibtexSyntaxHighlighting,
} from "./codemirrorExtensions/index.ts";

export type Editor = ReturnType<typeof createEditor>;

const setErrorLine = StateEffect.define<number | null>();

const errorLineField = StateField.define<number | null>({
	create: () => null,
	update(value, tx) {
		return tx.effects.find((e) => e.is(setErrorLine))?.value ?? value;
	},
	provide: (field) =>
		EditorView.decorations.compute([field], (state) => {
			const lineNo = state.field(field);

			if (!lineNo) return Decoration.none;

			const { from, to } = state.doc.line(lineNo);

			return Decoration.set([
				Decoration.mark({ class: "cm-error-line" }).range(from, to),
			]);
		}),
});

export function createEditor(parent: HTMLElement, initialValue = "") {
	const events = new Map<"change", Set<(value: string) => void>>();
	const externalTextUpdate = Annotation.define<boolean>();

	const view = new EditorView({
		parent,
		state: EditorState.create({
			doc: initialValue,
			extensions: [
				lineNumbers(),
				highlightActiveLineGutter(),
				dropCursor(), // For dragging text onto the editor
				EditorState.allowMultipleSelections.of(true),
				EditorView.contentAttributes.of({
					"aria-label": "BibTeX Editor",
				}),
				bracketMatching(),
				drawSelection(),
				bibtexLanguage(),
				bibtexSyntaxHighlighting(),
				keymap.of([...historyKeymap, indentWithTab]),
				history(),
				errorLineField,
				EditorView.updateListener.of((v: ViewUpdate) => {
					if (!v.docChanged) return;

					const isExternal = v.transactions.some((tx) =>
						tx.annotation(externalTextUpdate),
					);
					if (isExternal) return;

					for (const callback of events.get("change") ?? []) {
						callback(v.state.doc.toString());
					}
				}),
			],
		}),
	});

	return {
		view,
		setValue: (value: string) => {
			if (value === view.state.doc.toString()) return;

			view.dispatch({
				changes: { from: 0, to: view.state.doc.length, insert: value },
				annotations: externalTextUpdate.of(true),
			});
		},
		setErrorLine: (lineNo: number | null) => {
			view.dispatch({
				effects: setErrorLine.of(lineNo),
			});
		},
		addEventListener: (event: "change", callback: (value: string) => void) => {
			events.getOrInsert(event, new Set()).add(callback);
		},
		destroy: () => {
			view.destroy();
			events.clear();
		},
	};
}
