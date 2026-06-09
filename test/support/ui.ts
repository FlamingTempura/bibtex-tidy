import { join } from "node:path";
import { pathToFileURL } from "node:url";
import type { EditorView } from "@codemirror/view";

const WEB_ROOT = join(import.meta.dirname, "..", "..", "docs", "index.html");

export const WEB_URL = pathToFileURL(WEB_ROOT).href;

declare global {
	interface Window {
		cmEditor: EditorView;
	}
}
