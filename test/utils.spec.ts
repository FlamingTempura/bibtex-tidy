import { deepStrictEqual } from 'assert';
import { groupCLIOptions, splitCLIArgs, parseArguments } from '../src/cliUtils';
import { test } from './utils';

test('groupCLIOptions', async () => {
	deepStrictEqual(
		groupCLIOptions(['--no-wrap', '--space', '3', 'foo', '--tab=10,11']),
		{
			'--no-wrap': [],
			'--space': ['3', 'foo'],
			'--tab': ['10', '11'],
		}
	);
});

test('splitCLIArgs', async () => {
	deepStrictEqual(
		splitCLIArgs([
			'foo.bib',
			'something.txt',
			'--no-wrap',
			'--space',
			'3',
			'foo',
			'--tab=10,11',
		]),
		{
			inputFiles: ['foo.bib', 'something.txt'],
			optionArgs: {
				'--no-wrap': [],
				'--space': ['3', 'foo'],
				'--tab': ['10', '11'],
			},
		}
	);

	deepStrictEqual(
		splitCLIArgs([
			'--no-wrap',
			'--space',
			'3',
			'foo',
			'--tab=10,11',
			'foo.bib',
			'something.txt',
		]),
		{
			inputFiles: ['foo.bib', 'something.txt'],
			optionArgs: {
				'--no-wrap': [],
				'--space': ['3', 'foo'],
				'--tab': ['10', '11'],
			},
		}
	);
});

test('parseArguments', async () => {
	deepStrictEqual(
		parseArguments([
			'--no-tidy-comments',
			'--space',
			'3',
			'--trailing-commas',
			'--sort-fields=author,title',
			'foo.bib',
			'something.txt',
		]),
		{
			inputFiles: ['foo.bib', 'something.txt'],
			options: {
				tidyComments: false,
				space: 3,
				trailingCommas: true,
				sortFields: ['author', 'title'],
			},
		}
	);
});
