/* jshint esversion: 6 */

/* global CodeMirror, bibtexTidy */
CodeMirror.defineSimpleMode('simplemode', {
	// bibtex syntax highlighting
	start: [
		{ regex: /.*@comment/i, token: 'comment', push: 'comment' },
		{
			regex: /(\s*)(@preamble)(\s*{)/i,
			token: [null, 'variable-2'],
			push: 'braced',
		},
		{
			regex: /(\s*)(@preamble)(\s*\()/i,
			token: [null, 'variable-2'],
			push: 'parenthesised',
		},
		{
			regex: /(\s*)(@string)(\s*{)/i,
			token: [null, 'variable-2'],
			push: 'braced',
		},
		{
			regex: /(\s*)(@string)(\s*\()/i,
			token: [null, 'variable-2'],
			push: 'parenthesised',
		},
		{
			regex: /(\s*)(@[^=#,{}()[\] \t\n\r]+)(\s*\{\s*)([^=#,{}()[\] \t\n\r]+)(\s*,)/,
			token: [null, 'variable-2', null, 'variable-3'],
			push: 'entry',
		},
		{ regex: /.*/, token: 'comment' },
	],
	entry: [
		{
			regex: /([^=,{}()[\]\t\n\r]+)(\s*)(=)/,
			token: ['keyword', null, 'operator'],
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

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

for (let $suboption of $$('.suboptions')) {
	let $check = $suboption.parentNode.querySelector('input'),
		toggle = () =>
			($suboption.style.display = $check.checked ? 'block' : 'none');
	$check.addEventListener('change', toggle);
	toggle();
	$('input[name=indent]').addEventListener('change', toggle); // hack
}

let options = document.forms.options,
	cmEditor = CodeMirror.fromTextArea($('#editor textarea'), {
		lineNumbers: true,
		autofocus: true,
	}),
	errorHighlight;

const optionDocs = {};
for (const option of bibtexTidy.options) {
	optionDocs[option.key] = option;
}

for (let $label of $$('label[data-option]')) {
	const key = $label.dataset.option;
	const option = optionDocs[key];
	const $input = $label.querySelector('input');
	const [name, description] = option.description.split(' - ');
	$label.setAttribute('title', description);
	$label.querySelector('.name').textContent = name;
	if (!$input.getAttribute('name')) {
		$input.setAttribute('name', key);
	}
}

$('#tidy').addEventListener('click', () => {
	$('#tidy').setAttribute('disabled', true);
	$('#feedback').style.display = 'none';
	$('#feedback').innerHTML = '';
	document.body.classList.toggle('error', false);
	if (errorHighlight) {
		errorHighlight.clear();
	}
	const bibtex = cmEditor.getValue();
	let result;
	const opt = {
		curly: options.curly.checked,
		numeric: options.numeric.checked,
		sort: options.sort.checked && options.sortList.value.split(/[\n\t ,]+/),
		omit: options.omit.checked
			? options.omitList.value.split(/[\n\t ,]+/)
			: undefined,
		space: Number(options.spaces.value),
		tab: options.indent.value === 'tabs',
		align: options.align.checked ? Number(options.alignnum.value) : 0,
		wrap: options.wrap.checked ? Number(options.wrapnum.value) : false,
		duplicates: options.duplicates.checked
			? [
					options.uniqKEY.checked ? 'key' : null,
					options.uniqDOI.checked ? 'doi' : null,
					options.uniqABS.checked ? 'abstract' : null,
					options.uniqCIT.checked ? 'citation' : null,
			  ].filter((a) => a !== null)
			: false,
		merge: options.merge.checked ? options.mergeStrategy.value : false,
		enclosingBraces:
			options.enclosingBraces.checked &&
			options.enclosingBracesList.value.split(/[\n\t ,]+/),
		stripEnclosingBraces: options.stripEnclosingBraces.checked,
		dropAllCaps: options.dropAllCaps.checked,
		sortFields:
			options.sortFields.checked &&
			options.sortFieldList.value.split(/[\n\t ,]+/),
		stripComments: options.stripComments.checked,
		tidyComments: options.tidyComments.checked,
		encodeUrls: options.encodeUrls.checked,
		escape: options.escape.checked,
		trailingCommas: options.trailingCommas.checked,
		removeEmptyFields: options.removeEmptyFields.checked,
		lowercase: options.lowercase.checked,
		maxAuthors: options.maxAuthors.checked ? Number(options.maxAuthorsNum.value) : undefined
	};
	setTimeout(() => {
		try {
			result = bibtexTidy.tidy(bibtex, opt);
			cmEditor.setValue(result.bibtex);

			$(
				'#feedback'
			).innerHTML += `<strong>Successful!</strong><br>Tidied ${result.entries.length} entries.<br><br>`;

			let warnings = result.warnings.filter(
				(w) => w.code !== 'DUPLICATE_ENTRY'
			);
			$('#feedback').innerHTML +=
				'<ul>' +
				warnings.map((dupe) => `<li>${dupe.message}</li>`).join('') +
				'</ul>';

			if (opt.merge) {
				let dupes = result.warnings.filter((w) => w.code === 'DUPLICATE_ENTRY');
				$('#feedback').innerHTML += `<strong>${dupes.length} merged${
					dupes.length > 0 ? ':' : ''
				}</strong><br>`;
				if (dupes.length > 0) {
					$('#feedback').innerHTML +=
						'<ul>' +
						dupes.map((dupe) => `<li>${dupe.message}</li>`).join('') +
						'</ul>';
				}
			}
		} catch (e) {
			console.error('bibtex parse problem:', e);
			document.body.classList.toggle('error', true);
			$(
				'#feedback'
			).innerHTML = `<strong>There's a problem with the bibtex (${e.name})</strong><br>
			Line ${e.location.start.line} column ${e.location.start.column}<br>
			${e.message}`;
			let from = {
					line: e.location.start.line - 1,
					ch: e.location.start.column - 1,
				},
				to = { line: e.location.end.line - 1, ch: e.location.end.column + 9 };
			errorHighlight = cmEditor.markText(from, to, {
				css: 'background: #de3040; color: white; font-weight: bold',
			});
		}
		$('#feedback').style.display = 'block';
		$('#tidy').removeAttribute('disabled');
	}, 100);
});

$('#dlgclose').addEventListener(
	'click',
	() => ($('#dlg').style.display = 'none')
);
$('#dlg').addEventListener('click', () => ($('#dlg').style.display = 'none'));
$('#dlginner').addEventListener('click', (e) => e.stopPropagation());

// make editor available for tests
window.cmEditor = cmEditor;
