// Defines a lezer-based parser for bibtex for syntax highlighting.
//
// This parser supports incremental parsing and does not halt on errors, unlike
// the existing parser used by bibtex-tidy, making it more suitable for syntax
// highlighting. However, the grammar is incomplete and is only good enough for
// syntax highlighting, so we need both parsers for now.
//
// In future we could modify bibtex-tidy's parser to be incremental and not halt
// on errors, allowing us to remove this lezer based parser.

import {
	HighlightStyle,
	LRLanguage,
	LanguageSupport,
	syntaxHighlighting,
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";
import { parser } from "./__generated__/bibtex";

const language = LRLanguage.define({
	parser: parser.configure({
		props: [
			styleTags({
				Identifier: t.variableName,
				Comment: t.comment,
				Key: t.name,
				Number: t.number,
				BraceContent: t.string,
				Quoted: t.string,
				Command: t.className,
				CommentCommand: t.className,
				PreambleCommand: t.className,
				StringCommand: t.className,
				Field: t.variableName,
			}),
		],
	}),
});

const highlighting = HighlightStyle.define([
	{ tag: t.comment, color: "var(--light5)" },
	{ tag: t.name, color: "var(--orange)" },
	{ tag: t.number, color: "var(--light-blue)" },
	{ tag: t.string, color: "var(--green)" },
	{ tag: t.className, color: "var(--pink)" },
	{ tag: t.variableName, color: "white" },
]);

export function bibtexLanguage() {
	return new LanguageSupport(language);
}

export function bibtexSyntaxHighlighting() {
	return syntaxHighlighting(highlighting);
}
