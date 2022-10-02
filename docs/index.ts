import CodeMirror from 'codemirror';
import bibtexTidy, { BibTeXTidyResult } from '../src/index';
import { optionDefinitions, OptionDefinition } from '../src/optionDefinitions';
import { Options, UniqueKey } from '../src/optionUtils';
import { optionsToCLIArgs } from '../src/cliUtils';
import { BibTeXSyntaxError } from '../src/bibtex-parser';
import './bibtex-highlighting';

function $<T extends HTMLElement>(selector: string, parent?: ParentNode) {
	return (parent ?? document).querySelector<T>(selector)!;
}
function $$<T extends HTMLElement>(selector: string, parent?: ParentNode) {
	return (parent ?? document).querySelectorAll<T>(selector);
}

function renderSuboptions() {
	for (const suboption of $$('.suboptions')) {
		const checkbox = $<HTMLInputElement>('input', suboption.parentNode!);
		suboption.style.display = checkbox.matches(':checked') ? 'block' : 'none';
	}
}

function delay(fn: Function, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return function(this: typeof delay, ...args: any) {
    clearTimeout(timer);
    timer = setTimeout(fn.bind(this, ...args), ms || 0);
  }
}

function inputUpdate() {
	renderSuboptions();
	formatCLICommand();
	updateURLParams();
}

for (const input of $$('input')) {
	input.addEventListener('input', inputUpdate);
}

for (const input of $$('textarea')) {
	input.addEventListener('input', delay(inputUpdate, 500));
}


renderSuboptions();

const options = (document.forms as any).options;
const cmEditor = CodeMirror.fromTextArea($('#editor textarea'), {
	lineNumbers: true,
	autofocus: true,
});
let errorHighlight: CodeMirror.TextMarker | undefined;

const optionDocs: Record<string, OptionDefinition> = {};
for (const option of optionDefinitions) {
	optionDocs[option.key] = option;
}

for (let $label of $$('label[data-option]')) {
	const key = $label.dataset.option!;
	const option = optionDocs[key];
	const $input = $label.querySelector('input');
	if (option.description)
		$label.setAttribute('title', option.description.join('\n'));
	$label.querySelector('.name')!.textContent = option.title;
	if (!$input!.getAttribute('name')) {
		$input!.setAttribute('name', key);
	}
}

$('#tidy').addEventListener('click', () => {
	$('#tidy').setAttribute('disabled', 'true');

	$('#feedback').style.display = 'none';
	$('#feedback').innerHTML = '';

	document.body.classList.toggle('error', false);

	if (errorHighlight) errorHighlight.clear();

	const bibtex = cmEditor.getValue();
	let result;
	const opt = getOptions();
	setTimeout(() => {
		try {
			result = bibtexTidy.tidy(bibtex, opt);
			cmEditor.setValue(result.bibtex);
			$('#feedback').innerHTML += formatSuccessMessage(opt, result);
		} catch (e: unknown) {
			console.error('bibtex parse problem:', e);
			document.body.classList.toggle('error', true);
			$('#feedback').innerHTML = formatError(e);
			if (e instanceof BibTeXSyntaxError) {
				console.log(e.line, e.column);
				errorHighlight = cmEditor.markText(
					{ line: e.line - 1, ch: e.column - 2 },
					{ line: e.line - 1, ch: e.column - 1 },
					{ className: 'bibtex-error' }
				);
			}
		}
		$('#feedback').style.display = 'block';
		$('#tidy').removeAttribute('disabled');
	}, 100);
});

let resetCopyBtnTimeout: NodeJS.Timeout;
$('#copy').addEventListener('click', async () => {
	try {
		await navigator.clipboard.writeText(cmEditor.getValue());
		$('#copy').classList.toggle('copied', true);
		clearInterval(resetCopyBtnTimeout);
		resetCopyBtnTimeout = setTimeout(
			() => $('#copy').classList.toggle('copied', false),
			3000
		);
	} catch {
		alert('Failed to copy');
	}
});

function formatSuccessMessage(
	options: Options,
	result: BibTeXTidyResult
): string {
	const warnings = result.warnings.filter((w) => w.code !== 'DUPLICATE_ENTRY');
	return `
		<strong>Successful!</strong><br>
		Tidied ${result.count} entries.<br><br>
		<ul>
			${warnings.map((warning) => `<li>${warning.message}</li>`).join('')}
		</ul>
		${options.merge ? formatDuplicateSummary(result) : ''}`;
}

function formatDuplicateSummary(result: BibTeXTidyResult): string {
	const dupes = result.warnings.filter((w) => w.code === 'DUPLICATE_ENTRY');
	if (dupes.length > 0) {
		return `No duplicates.`;
	}
	return `
		<strong>${dupes.length} merged:
			<ul>
				${dupes.map((dupe) => `<li>${dupe.message}</li>`).join('')}
			</ul>
		</strong>`;
}

function formatError(e: unknown): string {
	if (e instanceof BibTeXSyntaxError) {
		return `
		<strong>There's a problem with the bibtex (${e.name})</strong><br>
		Syntax Error on line ${e.line} column ${e.column}<br>
		Unexpected ${JSON.stringify(e.char)} in ${e.node.type}.`;
	}
	return `
		<strong>There's a problem with the bibtex</strong><br>
		Unknown error: ${e}<br>
		This is probably a bug.`;
}

// make editor available for tests
//@ts-ignore
window.cmEditor = cmEditor;

function getOptions(): Options {
	return {
		curly: options.curly.checked,
		numeric: options.numeric.checked,
		sort:
			options.sort.checked &&
			options.sortList.value.length > 0 &&
			options.sortList.value.split(/[\n\t ,]+/),
		omit:
			options.omit.checked && options.omitList.value.length > 0
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
			  ].filter((a): a is UniqueKey => a !== null)
			: false,
		merge: options.merge.checked ? options.mergeStrategy.value : false,
		enclosingBraces:
			options.enclosingBraces.checked &&
			options.enclosingBracesList.value.length > 0 &&
			options.enclosingBracesList.value.split(/[\n\t ,]+/),
		stripEnclosingBraces: options.stripEnclosingBraces.checked,
		dropAllCaps: options.dropAllCaps.checked,
		sortFields:
			options.sortFields.checked &&
			options.sortFieldList.value.length > 0 &&
			options.sortFieldList.value.split(/[\n\t ,]+/),
		stripComments: options.stripComments.checked,
		tidyComments: options.tidyComments.checked,
		encodeUrls: options.encodeUrls.checked,
		escape: options.escape.checked,
		trailingCommas: options.trailingCommas.checked,
		removeEmptyFields: options.removeEmptyFields.checked,
		removeDuplicateFields: options.removeDuplicateFields.checked,
		lowercase: options.lowercase.checked,
		generateKeys: options.generateKeys.checked,
		maxAuthors: options.maxAuthors.checked
			? Number(options.maxAuthorsNum.value)
			: undefined,
	};
}

function setOptions(opts: Options) {
	options.curly.checked = opts.curly;
	options.numeric.checked = opts.numeric;
	options.sort.checked = opts.sort && (opts.sort as string[]).length > 0;
	options.sortList.value = (opts.sort && (opts.sort as string[]).join(',')) || '';
	options.omit.checked = opts.omit !== null;
	options.omitList.value = (opts.omit && opts.omit.length > 0 && opts.omit.join(',')) || '';
	options.spaces.value = String(opts.space);
	options.indent.value = opts.tab ? 'tabs' : 'spaces';
	options.align.checked = opts.align && opts.align != 0;
	options.alignnum.value = String(opts.align || 0);
	options.wrap.checked = opts.wrap !== false;
	options.wrapnum.value = String(opts.wrap || 0);
	options.duplicates.checked = Boolean(opts.duplicates);
	options.uniqKEY.checked = (opts.duplicates && (opts.duplicates as string[]).includes("key")) || false;
	options.uniqDOI.checked = (opts.duplicates && (opts.duplicates as string[]).includes("doi")) || false;
	options.uniqABS.checked = (opts.duplicates && (opts.duplicates as string[]).includes("abstract")) || false;
	options.uniqCIT.checked = (opts.duplicates && (opts.duplicates as string[]).includes("citation")) || false;
	options.merge.checked = Boolean(opts.merge)
	options.mergeStrategy.value = opts.merge || '';
	options.enclosingBraces.checked = opts.enclosingBraces && (opts.enclosingBraces as string[]).length > 0;
	options.enclosingBracesList.value = (opts.enclosingBraces && (opts.enclosingBraces as string[]).join(',')) || '';
	options.dropAllCaps.checked = opts.dropAllCaps;
	options.sortFields.checked = opts.sortFields && (opts.sortFields as string[]).length > 0;
	options.sortFieldList.value = (opts.sortFields && (opts.sortFields as string[]).join(',')) || '';
	options.stripComments.checked = opts.stripComments;
	options.tidyComments.checked = opts.tidyComments;
	options.encodeUrls.checked = opts.encodeUrls;
	options.escape.checked = opts.escape;
	options.trailingCommas.checked = opts.trailingCommas;
	options.removeEmptyFields.checked = opts.removeEmptyFields;
	options.removeDuplicateFields.checked = opts.removeDuplicateFields;
	options.lowercase.checked = opts.lowercase;
	options.generateKeys.checked = opts.generateKeys;
	options.maxAuthors.checked = opts.maxAuthors !== null;
	options.maxAuthorsNum.value = String(opts.maxAuthors || 0);
}

function updateURLParams() {
	const options = getOptions();
	const options_json = JSON.stringify(options);
	window.history.pushState(options, "", `index.html?opt=${encodeURIComponent(options_json)}`);
}

function getOptionsFromURL() : Options {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const options_json = urlParams.get('opt') || "";
	return JSON.parse(options_json);
}

function formatCLICommand() {
	const options = getOptions();

	$('#cli').innerHTML =
		'bibtex-tidy ' +
		optionsToCLIArgs(options)
			.map((opt) => {
				const i = opt.indexOf('=');
				if (i === -1) {
					return `<span class="opt-name">${opt}</span>`;
				} else {
					return [
						`<span class="opt-name">${opt.slice(0, i)}</span>`,
						`<span class="opt-val">${opt.slice(i + 1)}</span>`,
					].join('=');
				}
			})
			.join(' ') +
		' YOUR_FILE.bib';
}

window.requestAnimationFrame(formatCLICommand);

function onPopState(event: any) {
	setOptions(event.state);
	renderSuboptions();
}

window.onpopstate = onPopState;

setOptions(getOptionsFromURL());
renderSuboptions();
formatCLICommand();
