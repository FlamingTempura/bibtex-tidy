import assert from 'assert';
import { flattenLaTeX, parseLaTeX, stringifyLaTeX } from '../src/latexParser';
import { test } from './config/utils';

const testStrings = [
	{
		input: 'foo',
		flattened: 'foo',
	},
	{
		input: 'foo{bar}',
		flattened: 'foobar',
	},
	{
		input: 'some {text} with a \\command[and]{multiple}[params]{foo}',
		flattened: 'some text with a \\command[and]{multiple}[params]{foo}',
	},
	{
		input: 'nesting {blocks {and \\commands{like} this}}.',
		flattened: 'nesting blocks and \\commands{like} this.',
	},
	{
		input:
			'\\command{in\\commands{should}[work] even with {nested {blocks}}}{too}',
		flattened:
			'\\command{in\\commands{should}[work] even with {nested {blocks}}}{too}',
	},
];

test('latex parser', () => {
	for (const str of testStrings) {
		assert.strictEqual(stringifyLaTeX(parseLaTeX(str.input)), str.input);
	}
});

test('flattening latex', () => {
	for (const str of testStrings) {
		assert.strictEqual(
			stringifyLaTeX(flattenLaTeX(parseLaTeX(str.input))),
			str.flattened
		);
	}
});
