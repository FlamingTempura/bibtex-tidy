// Allows \ to be used and removes the empty line at the start
export const bibtex = (str) => String.raw(str).slice(1);

class TestFail extends Error {
	constructor(message, a, b) {
		super(message);
		const alines = String(a).split('\n');
		const blines = String(b).split('\n');
		this.lines = Array(Math.max(alines.length, blines.length))
			.fill(null)
			.map((u, i) => {
				return {
					a: alines[i] || '',
					b: blines[i] || '',
					same: alines[i] === blines[i],
				};
			});
	}
}

export const checkSame = (t, a, b, message = 'Incorrect output') => {
	if (a !== b) throw new TestFail(message, a, b);
};

const DEFAULT_FIELD_ORDER = [
	'title',
	'shorttitle',
	'author',
	'year',
	'month',
	'day',
	'journal',
	'booktitle',
	'location',
	'on',
	'publisher',
	'address',
	'series',
	'volume',
	'number',
	'pages',
	'doi',
	'isbn',
	'issn',
	'url',
	'urldate',
	'copyright',
	'category',
	'note',
	'metadata',
];

const $results = document.querySelector('#results');
const $iframe = document.querySelector('iframe');

const getOpt = (name) =>
	$iframe.contentDocument.querySelector(`[name=${name}]`);

const tests = [];

const tidy = (input, options = {}) =>
	new Promise((resolve) => {
		$iframe.contentDocument.querySelector('textarea').value = input;
		$iframe.contentWindow.cmEditor.setValue(input);

		if (options.align === undefined) options.align = 14;
		if (options.space === undefined) options.space = 2;
		if (options.tidyComments === undefined) options.tidyComments = true;
		if (options.escape === undefined) options.escape = true;

		getOpt('curly').checked = !!options.curly;
		getOpt('numeric').checked = !!options.numeric;
		getOpt('stripEnclosingBraces').checked = !!options.stripEnclosingBraces;
		getOpt('dropAllCaps').checked = !!options.dropAllCaps;
		getOpt('escape').checked = !!options.escape;
		getOpt('stripComments').checked = !!options.stripComments;
		getOpt('encodeUrls').checked = !!options.encodeUrls;
		getOpt('tidyComments').checked = !!options.tidyComments;

		if (options.align === true || typeof options.align === 'number') {
			getOpt('align').checked = true;
			if (typeof options.align === 'number') {
				getOpt('alignnum').value = options.align;
			}
		} else {
			getOpt('align').checked = false;
		}
		if (options.omit) {
			getOpt('omit').checked = true;
			getOpt('omitList').value = options.omit.join(' ');
		} else {
			getOpt('omit').checked = false;
		}
		if (options.space) {
			$iframe.contentDocument.querySelector('[value=spaces]').checked = true;
			getOpt('spaces').value = options.space === true ? 2 : options.space;
		}
		if (options.tab) {
			$iframe.contentDocument.querySelector('[value=tabs]').checked = true;
		}
		if (options.sort) {
			getOpt('sort').checked = true;
			getOpt('sortList').value =
				options.sort === true ? 'key' : options.sort.join(' ');
		} else {
			getOpt('sort').checked = false;
			getOpt('sortList').value = '';
		}
		if (options.duplicates) {
			getOpt('duplicates').checked = true;
			if (options.duplicates === true) {
				options.duplicates = ['doi', 'citation', 'abstract'];
			}
			getOpt('uniqKEY').checked = options.duplicates.includes('key');
			getOpt('uniqDOI').checked = options.duplicates.includes('doi');
			getOpt('uniqCIT').checked = options.duplicates.includes('citation');
			getOpt('uniqABS').checked = options.duplicates.includes('abstract');
		} else {
			getOpt('duplicates').checked = false;
		}
		if (options.merge) {
			getOpt('merge').checked = true;
			if (options.merge === true) options.merge = 'combine';
			getOpt('mergeStrategy').value = options.merge;
		} else {
			getOpt('merge').checked = false;
		}

		if (options.sortFields) {
			getOpt('sortFields').checked = true;
			getOpt('sortFieldList').value =
				options.sortFields === true
					? DEFAULT_FIELD_ORDER.join(' ')
					: options.sortFields.join(' ');
		} else {
			getOpt('sortFields').checked = false;
			getOpt('sortFieldList').value = '';
		}

		const onchange = () => {
			$iframe.contentWindow.cmEditor.off('change', onchange);
			// wait for feedback to be written
			window.requestAnimationFrame(() => {
				resolve({
					bibtex: $iframe.contentWindow.cmEditor.getValue(),
					warnings: [
						...$iframe.contentDocument.querySelectorAll('#feedback li'),
					].map((li) => ({
						code: li.textContent.includes('duplicate') ? 'DUPLICATE_ENTRY' : '',
					})),
				});
			});
		};
		$iframe.contentWindow.cmEditor.on('change', onchange);
		$iframe.contentDocument.querySelector('#tidy').click();
	});

export const test = (title, cb) => {
	tests.push(async (i) => {
		$results.innerHTML += `<div class="title"><strong>Test ${
			i + 1
		}</strong> ${title}</div>`;
		try {
			await cb(null, tidy);
			$results.innerHTML += `<div class="pass"><strong>PASSED</strong></div>`;
			return true;
		} catch (e) {
			$results.innerHTML += `
				<div class="fail"><strong>FAILED</strong> ${e.message}</div>`;
			if (e instanceof TestFail) {
				$results.innerHTML += `
				<code class="diff">
					<div>
						<div>Expected:</div>
						<div>Output:</div>
					</div>
					${e.lines
						.map(({ same, a, b }, i) => {
							const className = !same ? 'highlight' : '';
							return `
								<div class="${className}">
									<div><i>${i}</i>${a}</div>
									<div><i>${i}</i>${b}</div>
								</div>`;
						})
						.join('\n')}
				</code>`;
			} else {
				console.error(e);
			}
			return false;
		}
	});
};

$iframe.contentWindow.addEventListener('load', async () => {
	let passes = 0;
	for (let i = 0; i < tests.length; i++) {
		if (await tests[i](i)) passes++;
	}
	const className = passes === tests.length ? 'pass' : 'fail';
	$results.innerHTML += `
		<div class="${className}">${passes}/${tests.length} tests passed</div>`;
});
