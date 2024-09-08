type Name = {
	last: string;
	first: string;
	pre: string;
	suf: string;
};

/**
 * Name fields (like author and editor) contain a list of names delimited by 'and'. Each
 * name has the following four parts (Lamport, 1994, p157):
 *  1. Given names or initials (including middle names). Space delimited.
 *  2. Prefixes (e.g. "von", "de"), which should be lower-case to be correctly identified
 *     as a prefix by bibtex
 *  3. Family names or initials. Space delimited.
 *  4. Suffixes (e.g. "Jr.")
 *
 * These parts can be separated by spaces and/or commas (Lamport, 1994, p157). For
 * example:
 *  - "John Paul Jones" or "Jones, John Paul"
 *  - "John von Neumann" or "von Neumann, John"
 *
 * Sometimes, commas must be used to accurately represent a name (Lamport, 1994, p157).
 * For example, where a family name has multiple parts like "Brinch Hansen, Per".
 * Additionally, suffixes can only be used with commas: "Ford, Jr., Henry".
 *
 * There are therefore severl supported syntaxes - where NameToken is a capitalized word
 * and PrefixToken is a lowercase word:
 *
 * `NameToken`
 *
 * Just a last name
 *
 * `NameToken NameToken+`
 *
 * The first token becomes the first name, remaining become the last name
 *
 * `NameToken* PrefixToken+ NameToken*`
 *
 * All tokens before the lower token becomes the first name, the lower tokens become the
 * prefix, and the remaining tokens become the last name
 *
 * `NameToken+, NameToken* PrefixToken*`
 *
 * All tokens before the comma are the last name, capitalized tokens after the comma are
 * the first name, and lower case tokens at the end are the prefix
 *
 * `NameToken+, NameToken+, NameToken* PrefixToken*`
 *
 * All tokens before the first comma are the last names, tokens between the commas are the
 * suffix, capitalzied tokens after the comma are the first name, and lower case tokens at
 * the end are the prefix
 *
 * The list can be truncaced with the keyword 'and others'.
 *
 * Limitations
 * - A bibtex end-user can override the components of a name, though this seems relatively
 *   uncommon.
 * - This does not support the Extended Name Format yet (e.g. {given=Jean, family=Smith,
 *   suffix=Jr., prefix=von}).
 * - This will be buggy when the name contains braced values (e.g. "John {Smith, Jr.}").
 */
export function parseNameList(value: string): Name[] {
	return value.split(/\s+and\s+/i).map(parseName);
}

type NameSyntax =
	| "Empty"
	| "Others"
	| "LastName"
	| "FirstName LastNames"
	| "FirstNames Prefixes LastNames"
	| "LastNames, FirstNames Prefixes"
	| "LastNames, Suffixes, FirstNames Prefixes";

function detectNameSyntax(tokens: Token[]): NameSyntax {
	const names = tokens.filter((token) => token.type === "name");
	const prefixes = tokens.filter((token) => token.type === "prefix");
	const commas = tokens.filter((token) => token.type === "comma");
	if (tokens.length === 0) {
		return "Empty";
	}
	if (tokens.length === 1 && nameStr(tokens) === "others") {
		return "Others";
	}
	if (tokens.length === names.length && tokens.length === 1) {
		return "LastName";
	}
	if (tokens.length === names.length) {
		return "FirstName LastNames";
	}
	if (prefixes.length > 0 && commas.length === 0) {
		return "FirstNames Prefixes LastNames";
	}
	if (commas.length === 1) {
		return "LastNames, FirstNames Prefixes";
	}
	if (commas.length === 2) {
		return "LastNames, Suffixes, FirstNames Prefixes";
	}
	throw new Error(
		`Invalid name syntax: ${tokens.map((token) => token.type).join(" ")}`,
	);
}

export function parseName(name: string): Name {
	const tokens = tokeniseName(name);

	switch (detectNameSyntax(tokens)) {
		case "Empty":
			return { first: "", last: "", pre: "", suf: "" };

		case "Others":
			return { first: "", last: "others", pre: "", suf: "" };

		case "LastName":
			return { first: "", last: nameStr(tokens), pre: "", suf: "" };

		case "FirstName LastNames": {
			const [first, last] = partition(tokens, ["name", "name"] as const);
			return { first: nameStr(first), last: nameStr(last), pre: "", suf: "" };
		}

		case "FirstNames Prefixes LastNames": {
			const [first, pre, last] = partition(tokens, [
				"name",
				"prefix",
				"name",
			] as const);

			return {
				first: nameStr(first),
				pre: nameStr(pre),
				last: nameStr(last),
				suf: "",
			};
		}

		case "LastNames, FirstNames Prefixes": {
			const [lastNames, firstNames, prefixes] = partition(tokens, [
				"name",
				"comma",
				"prefix",
			] as const);
			return {
				last: nameStr(lastNames),
				first: nameStr(firstNames),
				pre: nameStr(prefixes),
				suf: "",
			};
		}

		case "LastNames, Suffixes, FirstNames Prefixes": {
			const [lastNames, suffixes, firstNames, prefixes] = partition(tokens, [
				"name",
				"comma",
				"comma",
				"prefix",
			] as const);
			return {
				last: nameStr(lastNames),
				suf: nameStr(suffixes),
				first: nameStr(firstNames),
				pre: nameStr(prefixes),
			};
		}
	}
}

type Token = { type: "name" | "prefix"; value: string } | { type: "comma" };

function tokeniseName(name: string): Token[] {
	const tokens: Token[] = [];

	let current = "";
	function flushToken() {
		if (!current) return;
		tokens.push({
			type: isPrefixToken(current) ? "prefix" : "name",
			value: current,
		});
	}
	for (const c of name) {
		if (c === ",") {
			flushToken();
			tokens.push({ type: "comma" });
			current = "";
		} else if (/\s/.test(c)) {
			flushToken();
			current = "";
		} else {
			current += c;
		}
	}
	flushToken();
	return tokens;
}

function nameStr(tokens: Token[]): string {
	return tokens
		.filter(
			(token): token is Token & { value: string } => token.type !== "comma",
		)
		.map((token) => token.value)
		.join(" ");
}

function isPrefixToken(token: string) {
	return /^[a-z]/.test(token);
}

function partition<T extends readonly Token["type"][]>(
	tokens: Token[],
	divideBefore: T,
): { [I in keyof T]: Token[] } {
	const partitions = divideBefore.map(() => []) as {
		[I in keyof T]: Token[];
	};
	let currPartition = -1;
	for (const token of tokens) {
		if (divideBefore[currPartition + 1] === token.type) {
			currPartition++;
		}
		partitions[currPartition]?.push(token);
	}
	return partitions;
}
