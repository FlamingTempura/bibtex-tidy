import assert from 'assert';
import { flattenLaTeX, parseLaTeX, stringifyLaTeX } from '../src/latexParser';
import { test } from './utils';

const testStrings = [
	'foo',
	'foo{bar}',
	'some {text} with a \\command[and]{multiple}[params]{foo}',
	'nesting {blocks {and \\commands{like} this}}.',
	'\\command{in\\commands{should}[work] even with {nested {blocks}}}{too}',
];

test('latex parser', () => {
	for (const str of testStrings) {
		assert.strictEqual(stringifyLaTeX(parseLaTeX(str)), str);
	}
});

const testStringsFlattened = [
	'foo',
	'foobar',
	'some text with a \\command[and]{multiple}[params]{foo}',
	'nesting blocks and \\commands{like} this.',
	'\\command{in\\commands{should}[work] even with {nested {blocks}}}{too}',
];

test('flattening latex', () => {
	for (let i = 0; i < testStrings.length; i++) {
		assert.strictEqual(
			stringifyLaTeX(flattenLaTeX(parseLaTeX(testStrings[i]))),
			testStringsFlattened[i]
		);
	}
});
