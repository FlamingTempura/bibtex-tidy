type KeyValues = { key: string; values: string[] };

/**
 * Options where we must assume that values following it that begin with - are not
 * options, but descending order values.
 */
const OPTIONS_WITH_SORTED_VALUES = [
	"--sort",
	"--sort-fields",
	"--sort-properties",
];

/**
 * Parses shell arguments of the form <input files> <options> (in any order). Options with
 * values can be specified as --thing=a,b,c or --thing a b c. However, some values can
 * being with "-", e.g when setting a field to sort in descending order.
 */
export function parseCLIArguments(
	argv: string[],
	noTrailingInputPaths?: boolean,
): Record<string, string[]> {
	let inputPaths: string[] = [];
	const keyValues: Record<string, string[]> = {};
	let currKey: string | undefined;
	let currValues: string[] = [];
	let mode: "root" | "values" = "root";

	function flushKey() {
		if (!currKey) return;
		keyValues[currKey] = currValues;
		currKey = undefined;
		currValues = [];
	}

	for (const arg of argv) {
		const matchesStdinMarker = arg === "-";
		const matchesLongArg = arg.startsWith("--");
		const matchesShortArg = arg.startsWith("-");
		const isNegatedValue =
			matchesShortArg &&
			currKey &&
			OPTIONS_WITH_SORTED_VALUES.includes(currKey);

		if (matchesLongArg) {
			flushKey();
			const parsed = parseLongCLIOption(arg);
			if (parsed.values.length > 0) {
				keyValues[parsed.key] = parsed.values;
			} else {
				currKey = parsed.key;
				mode = "values";
			}
		} else if (matchesShortArg && !matchesStdinMarker && !isNegatedValue) {
			flushKey();
			for (const c of arg.slice(1)) {
				const key = `-${c}`;
				keyValues[key] = [];
				currKey = key;
				mode = "values";
			}
		} else if (mode === "root") {
			inputPaths.push(arg);
		} else if (mode === "values") {
			currValues.push(arg);
		}
	}

	if (inputPaths.length === 0 && !noTrailingInputPaths) {
		inputPaths = currValues;
		currValues = [];
	}

	flushKey();

	return { ...keyValues, "": inputPaths };
}

export function parseLongCLIOption(arg: string): KeyValues {
	let mode: "key" | "values" | "double-quoted" | "single-quoted" = "key";
	let currToken = "";
	let key: string | undefined;
	const values: string[] = [];

	if (!arg.startsWith("-")) {
		throw new Error(`Error parsing arg ${arg}`);
	}

	function flushToken() {
		if (!currToken) return;
		if (mode === "key") {
			key = currToken;
		} else if (mode === "values") {
			values.push(currToken);
		}
		currToken = "";
	}

	for (const c of arg) {
		switch (mode) {
			case "key":
				if (c === "=") {
					key = currToken;
					currToken = "";
					mode = "values";
				} else {
					currToken += c;
				}
				break;

			case "values":
				if (c === '"') {
					mode = "double-quoted";
				} else if (c === "'") {
					mode = "single-quoted";
				} else if (c === ",") {
					flushToken();
				} else {
					currToken += c;
				}
				break;

			case "double-quoted":
				if (c === '"') {
					mode = "values";
				} else {
					currToken += c;
				}
				break;

			case "single-quoted":
				if (c === "'") {
					mode = "values";
				} else {
					currToken += c;
				}
				break;
		}
	}

	flushToken();

	if (!key) {
		throw new Error(`Failed to parse argument ${arg}`);
	}

	return { key, values };
}
