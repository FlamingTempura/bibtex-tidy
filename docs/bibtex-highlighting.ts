import CodeMirror from 'codemirror';
import 'codemirror/addon/mode/simple';

CodeMirror.defineSimpleMode('simplemode', {
	// bibtex syntax highlighting
	start: [
		{ regex: /.*@comment/i, token: 'comment', push: 'comment' },
		{
			regex: /(\s*)(@preamble)(\s*{)/i,
			token: ['', 'variable-2'],
			push: 'braced',
		},
		{
			regex: /(\s*)(@preamble)(\s*\()/i,
			token: ['', 'variable-2'],
			push: 'parenthesised',
		},
		{
			regex: /(\s*)(@string)(\s*{)/i,
			token: ['', 'variable-2'],
			push: 'braced',
		},
		{
			regex: /(\s*)(@string)(\s*\()/i,
			token: ['', 'variable-2'],
			push: 'parenthesised',
		},
		{
			regex: /(\s*)(@[^=#,{}()[\] \t\n\r]+)(\s*\{\s*)([^=#,{}()[\] \t\n\r]+)(\s*,)/,
			token: ['', 'variable-2', '', 'variable-3'],
			push: 'entry',
		},
		{ regex: /.*/, token: 'comment' },
	],
	entry: [
		{
			regex: /([^=,{}()[\]\t\n\r]+)(\s*)(=)/,
			token: ['keyword', '', 'operator'],
		},
		{ regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: 'string' },
		{ regex: /\d+/i, token: 'number' },
		{ regex: /\{/, push: 'braced' },
		{ regex: /}/, pop: true },
	],
	braced: [
		{ regex: /\{/, push: 'braced' },
		{ regex: /[^{}]+/, token: 'string' },
		{ regex: /\}/, pop: true },
	],
	parenthesised: [
		{ regex: /\{/, token: 'comment', push: 'braced' },
		{ regex: /[^{)]+/, token: 'string' },
		{ regex: /\)/, pop: true },
	],
	comment: [
		{ regex: /.*\}/, token: 'comment', pop: true },
		{ regex: /.*/, token: 'comment' },
	],
});
