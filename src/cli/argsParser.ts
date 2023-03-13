/**
 * Options where we must assume that values following it that begin with - are not
 * options, but descending order values.
 */
const OPTIONS_WITH_SORTED_VALUES = [
	'--sort',
	'--sort-fields',
	'--sort-properties',
];

type Mode =
	| 'key'
	| 'single-letter-keys'
	| 'value'
	| 'csv-value'
	| 'double-quoted'
	| 'single-quoted';

/**
 * Parses shell arguments of the form <input files> <options> (in any order). Options with
 * values can be specified as --thing=a,b,c or --thing a b c. However, some values can
 * being with "-", e.g when setting a field to sort in descending order.
 */
export function parseArguments(argv: string): KeyValues[] {
	const kvs: KeyValues[] = [];

	let mode: Mode = 'value';
	let prevMode: Mode = 'key';

	let currValue = '';
	let currKey = '';
	let currValues: string[] = [];

	function flushKV() {
		if (currKey || currValues.length > 0) {
			kvs.push({ key: currKey, values: currValues });
		}
		currValues = [];
		currValue = '';
		currKey = '';
	}

	function flushValue() {
		if (currValue) {
			currValues.push(currValue);
		}
		currValue = '';
	}

	for (let i = 0; i < argv.length; i++) {
		const c = argv[i];
		const next = argv[i + 1];
		switch (mode) {
			case 'value': {
				if (c === '"') {
					prevMode = mode;
					mode = 'double-quoted';
				} else if (c === "'") {
					prevMode = mode;
					mode = 'single-quoted';
				} else if (currValue === '-' && c === '-') {
					flushKV();
					currKey = '--';
					mode = 'key';
				} else if (
					currValue === '' &&
					c === '-' &&
					next?.match(/[a-zA-Z]/) &&
					!OPTIONS_WITH_SORTED_VALUES.includes(currKey)
				) {
					currValue = '';
					flushKV();
					mode = 'single-letter-keys';
				} else if (c === ' ') {
					flushValue();
				} else {
					currValue += c;
				}
				break;
			}

			case 'csv-value': {
				if (c === '"') {
					prevMode = mode;
					mode = 'double-quoted';
				} else if (c === "'") {
					prevMode = mode;
					mode = 'single-quoted';
				} else if (currValue === '-' && c === '-') {
					flushKV();
					currKey = '--';
					mode = 'key';
				} else if (c === ',') {
					flushValue();
				} else if (c === ' ') {
					flushValue();
					flushKV();
					mode = 'value';
				} else {
					currValue += c;
				}
				break;
			}

			case 'double-quoted': {
				if (c === '"') {
					mode = prevMode;
				} else {
					currValue += c;
				}
				break;
			}

			case 'single-quoted': {
				if (c === "'") {
					mode = prevMode;
				} else {
					currValue += c;
				}
				break;
			}

			case 'key': {
				if (c === ' ') {
					mode = 'value';
				} else if (c === '=') {
					mode = 'csv-value';
				} else {
					currKey += c;
				}
				break;
			}

			case 'single-letter-keys': {
				if (c === ' ') {
					mode = 'value';
				} else {
					flushKV();
					currKey = '-' + c;
				}
				break;
			}
		}
	}

	flushValue();
	flushKV();

	return kvs;
}

type KeyValues = { key: string; values: string[] };
