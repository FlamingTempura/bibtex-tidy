import { deepStrictEqual } from 'assert';
import { splitCLIArgs, parseArguments } from '../src/cliUtils';
import { test } from './utils';

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
			optionArgVals: {
				'--no-wrap': [],
				'--space': ['3', 'foo'],
				'--tab': ['10', '11'],
			},
			unknownArgs: [],
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
			optionArgVals: {
				'--no-wrap': [],
				'--space': ['3', 'foo'],
				'--tab': ['10', '11'],
			},
			unknownArgs: [],
		}
	);
});

test('parseArguments', async () => {
	deepStrictEqual(parseArguments([]), {
		inputFiles: [],
		options: {},
		unknownArgs: [],
	});

	deepStrictEqual(parseArguments(['foo.bib', 'something.txt']), {
		inputFiles: ['foo.bib', 'something.txt'],
		options: {},
		unknownArgs: [],
	});

	deepStrictEqual(parseArguments(['--bad-arg']), {
		inputFiles: [],
		options: {},
		unknownArgs: ['--bad-arg'],
	});

	deepStrictEqual(
		parseArguments([
			'--no-tidy-comments',
			'--space',
			'3',
			'--trailing-commas',
			'--foo',
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
			unknownArgs: ['--foo'],
		}
	);

	deepStrictEqual(
		parseArguments([
			'--no-tidy-comments',
			'--space',
			'3',
			'--trailing-commas',
			'--foo',
			'-vol',
			'--sort-fields=-author,title',
			'foo.bib',
			'something.txt',
		]),
		{
			inputFiles: ['foo.bib', 'something.txt'],
			options: {
				tidyComments: false,
				space: 3,
				trailingCommas: true,
				sortFields: ['-author', 'title'],
			},
			unknownArgs: ['--foo', '-vol'],
		}
	);
});
