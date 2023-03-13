import { deepStrictEqual } from 'assert';
import { test } from '../../test/utils';
import { parseArguments } from './argsParser';

test('parseArguments', async () => {
	deepStrictEqual(parseArguments(''), []);

	deepStrictEqual(parseArguments('foo.bib something.txt'), [
		{ key: '', values: ['foo.bib', 'something.txt'] },
	]);

	deepStrictEqual(parseArguments('--arg'), [{ key: '--arg', values: [] }]);

	deepStrictEqual(parseArguments('-a'), [{ key: '-a', values: [] }]);

	deepStrictEqual(
		parseArguments(
			'--no-tidy-comments --space 3 --trailing-commas --foo --sort-fields=author,title foo.bib something.txt'
		),
		[
			{ key: '--no-tidy-comments', values: [] },
			{ key: '--space', values: ['3'] },
			{ key: '--trailing-commas', values: [] },
			{ key: '--foo', values: [] },
			{ key: '--sort-fields', values: ['author', 'title'] },
			{ key: '', values: ['foo.bib', 'something.txt'] },
		]
	);

	deepStrictEqual(
		parseArguments(
			'--no-tidy-comments --space 3 --trailing-commas --foo -vol --sort-fields=-author,title foo.bib something.txt'
		),
		[
			{ key: '--no-tidy-comments', values: [] },
			{ key: '--space', values: ['3'] },
			{ key: '--trailing-commas', values: [] },
			{ key: '--foo', values: [] },
			// -vol gets interpreted as options because it does not follow a 'sortable' option
			{ key: '-v', values: [] },
			{ key: '-o', values: [] },
			{ key: '-l', values: [] },
			{ key: '--sort-fields', values: ['-author', 'title'] },
			{ key: '', values: ['foo.bib', 'something.txt'] },
		]
	);

	deepStrictEqual(
		parseArguments(
			'--space "3" --sort-fields="-author boo","title" "foo.bib" "something.txt"'
		),
		[
			{ key: '--space', values: ['3'] },
			{ key: '--sort-fields', values: ['-author boo', 'title'] },
			{ key: '', values: ['foo.bib', 'something.txt'] },
		]
	);
});
