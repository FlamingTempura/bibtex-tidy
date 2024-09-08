import type { EntryNode, RootNode } from "./bibtexParser";
import { parseAuthors } from "./parseAuthors";
import { isEntryNode } from "./utils";

export const SPECIAL_MARKERS: Record<
	string,
	{
		description: string;
		callback: (
			valueLookup: Map<string, string>,
			n: number | undefined,
		) => string[];
	}
> = {
	auth: {
		description: "Last name of first authors",
		callback: (v) => {
			const authors = parseAuthors(v.get("author") ?? "");
			const author = authors[0]?.lastName;
			return author ? [author] : [];
		},
	},
	authEtAl: {
		description:
			"If 1 or 2 authors, both authors, otherwise first author and EtAl",
		callback: (v) => {
			const authors = parseAuthors(v.get("author") ?? "");
			return [
				...authors.slice(0, 2).map((author) => author.lastName),
				...(authors.length > 2 ? ["Et", "Al"] : []),
			];
		},
	},
	authors: {
		description: "Last name all authors",
		callback: (v) => {
			const authors = parseAuthors(v.get("author") ?? "");
			return authors.map((author) => author.lastName);
		},
	},
	authorsN: {
		description: "Last name N authors, with EtAl if more",
		callback: (v, n = 0) => {
			const authors = parseAuthors(v.get("author") ?? "");
			return [
				...authors.slice(0, n).map((author) => author.lastName),
				...(authors.length > n ? ["Et", "Al"] : []),
			];
		},
	},
	veryshorttitle: {
		description: "First non-function word of the title",
		callback: (v) => nonFunctionWords(title(v)).slice(0, 1),
	},
	shorttitle: {
		description: "First three non-function words of the title",
		callback: (v) => nonFunctionWords(title(v)).slice(0, 3),
	},
	title: {
		description: "Full title, capitalized",
		callback: (v) => capitalize(words(title(v))),
	},
	fulltitle: {
		description: "Full title, verbatim",
		callback: (v) => words(title(v)),
	},
	year: {
		description: "Year",
		callback: (v) => {
			const year = v.get("year")?.replace(/[^0-9]/g, "");
			return year ? [year] : [];
		},
	},
	duplicateLetter: {
		description:
			"If the multiple entries end up with the same key, then insert a letter a-z. By default this will be inserted at the end.",
		callback: () => ["[duplicateLetter]"],
	},
	duplicateNumber: {
		description:
			"If the multiple entries end up with the same key, then insert a number.",
		callback: () => ["[duplicateNumber]"],
	},
};

export const MODIFIERS: Record<
	string,
	{ description: string; callback: (value: string[]) => string[] }
> = {
	required: {
		description: "If data is missing, revert to existing key",
		callback: (words) => {
			if (words.length === 0) throw new MissingRequiredData();
			return words;
		},
	},
	lower: {
		description: "Convert to lowercase",
		callback: (words) => words.map((word) => word.toLocaleLowerCase()),
	},
	upper: {
		description: "Convert to uppercase",
		callback: (words) => words.map((word) => word.toLocaleUpperCase()),
	},
	capitalize: {
		description: "Capitalize first letter of each word",
		callback: capitalize,
	},
};

class MissingRequiredData extends Error {}

/**
 * Generates citation keys for all bibtex entries. The template should be in
 * JabRef citation pattern format:
 * https://docs.jabref.org/setup/citationkeypatterns
 *
 * Not all JabRef special markers and modifiers have been implemented.
 *
 * TODO: Check the output against Jabref itself
 */
export function generateKeys(
	ast: RootNode,
	valueLookup: Map<EntryNode, Map<string, string>>,
	entryKeyTemplate: string,
): Map<EntryNode, string> {
	let template = entryKeyTemplate;
	if (
		!entryKeyTemplate.includes("[duplicateLetter]") &&
		!entryKeyTemplate.includes("[duplicateNumber]")
	) {
		template = `${entryKeyTemplate}[duplicateLetter]`;
	}

	const parsedTemplate = parseEntryKeyTemplate(template);

	const entriesByKey = new Map<string, EntryNode[]>();

	for (const node of ast.children) {
		if (isEntryNode(node)) {
			const entryValues = valueLookup.get(node.block);
			if (!entryValues) continue;
			const newKey = generateKey(entryValues, parsedTemplate);
			if (!newKey) continue;
			const keyEntries = entriesByKey.get(newKey) ?? [];
			entriesByKey.set(newKey, [...keyEntries, node.block]);
		}
	}

	const keys = new Map<EntryNode, string>();

	for (const [key, entries] of entriesByKey) {
		for (const [i, entry] of entries.entries()) {
			const duplicateLetter =
				entries.length > 1 ? String.fromCharCode(97 + i) : ""; // FIXME: this will break after 26 duplicates
			const duplicateNumber = entries.length > 1 ? String(i + 1) : "";
			entry.key = key
				.replace(/\[duplicateLetter\]/g, duplicateLetter)
				.replace(/\[duplicateNumber\]/g, duplicateNumber);
		}
	}

	return keys;
}

export function generateKey(
	valueLookup: Map<string, string>,
	entryKeyTemplate: EntryKeyTemplateToken[],
): string | undefined {
	try {
		let newKey = entryKeyTemplate
			.map((token) => {
				if (typeof token === "string") {
					return token;
				}
				const { markerName, parameter, modifierNames } = token;

				const specialMarker = SPECIAL_MARKERS[markerName];
				let key: string[];
				if (specialMarker) {
					key = specialMarker.callback(valueLookup, parameter);
				} else if (markerName === markerName.toLocaleUpperCase()) {
					const value = valueLookup.get(markerName.toLocaleLowerCase());
					key = value ? words(value) : [];
				} else {
					throw new Error(`Invalid citation key token ${markerName}`);
				}

				for (const modifierKey of modifierNames) {
					const modifier = MODIFIERS[modifierKey];
					if (modifier) {
						key = modifier.callback(key);
					} else {
						throw new Error(`Invalid modifier ${modifierKey}`);
					}
				}

				return key.join("");
			})
			.join("");

		newKey = removeUnsafeEntryKeyChars(newKey);
		if (newKey === "") return; // keep existing key
		return newKey;
	} catch (e) {
		if (e instanceof MissingRequiredData) {
			return; // keep existing key
		}
		throw e;
	}
}

type EntryKeyTemplateToken =
	| string
	| { markerName: string; parameter?: number; modifierNames: string[] };

export function parseEntryKeyTemplate(
	template: string,
): EntryKeyTemplateToken[] {
	const tokens: EntryKeyTemplateToken[] = [];
	const matches = template.matchAll(/\[[^:\]]+(?::[^:\]]+)*\]/g);

	let pos = 0;
	for (const match of matches) {
		if (match.index === undefined) break;
		if (match.index !== pos) {
			tokens.push(template.slice(pos, match.index));
		}
		const [tokenKeyN, ...modifierKeys] = match[0].slice(1, -1).split(":");
		if (!tokenKeyN) {
			throw new Error("Token parse error");
		}

		let n: number | undefined;
		const tokenKey = tokenKeyN.replace(/[0-9]+/g, (m) => {
			n = Number(m);
			return "N";
		});

		tokens.push({
			markerName: tokenKey,
			parameter: n,
			modifierNames: modifierKeys,
		});
		pos = match.index + match[0].length;
	}
	if (pos < template.length) {
		tokens.push(template.slice(pos));
	}

	return tokens;
}

export const functionWords = new Set([
	"a",
	"about",
	"above",
	"across",
	"against",
	"along",
	"among",
	"an",
	"and",
	"around",
	"at",
	"before",
	"behind",
	"below",
	"beneath",
	"beside",
	"between",
	"beyond",
	"but",
	"by",
	"down",
	"during",
	"except",
	"for",
	"for",
	"from",
	"in",
	"inside",
	"into",
	"like",
	"near",
	"nor",
	"of",
	"off",
	"on",
	"onto",
	"or",
	"since",
	"so",
	"the",
	"through",
	"to",
	"toward",
	"under",
	"until",
	"up",
	"upon",
	"with",
	"within",
	"without",
	"yet",
]);

function nonFunctionWords(value: string): string[] {
	return words(value).filter(
		(word) => !functionWords.has(word.toLocaleLowerCase()),
	);
}

function words(value: string): string[] {
	return value.split(/[\s.,:;]+/).filter((word) => word.length > 0);
}

function capitalize(words: string[]): string[] {
	return words.map(
		(word) =>
			word.slice(0, 1).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase(),
	);
}

function title(entryValues: Map<string, string>): string {
	return entryValues.get("title") ?? entryValues.get("booktitle") ?? "";
}

/**
 * "Curly braces ({}), commas, spaces, backslashes (\), hashes (#), percent characters (%)
 * and tildes (~) are always forbidden. biber additionally forbids round brackets (()),
 * quotation marks (", '), and the equals sign (=). Source: Kime et al (2024) The biblatex
 * Package (v3.20).
 */
function removeUnsafeEntryKeyChars(str: string): string {
	return str.replace(/[{},\s\\#%~()"'=]+/g, "_");
}
