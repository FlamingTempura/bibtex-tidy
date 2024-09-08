import type { Cache } from "./cache";
import type { EntryNode } from "./parsers/bibtexParser";
import {
	type EntryKeyTemplateToken,
	parseEntryKeyTemplate,
} from "./parsers/entryKeyTemplateParser";
import { parseNameList } from "./parsers/nameFieldParser";

export const SPECIAL_MARKERS: Record<
	string,
	{
		description: string;
		callback: (
			valueLookup: Map<string, string>,
			n: number | undefined,
			duplicate: number | undefined,
		) => string[];
	}
> = {
	auth: {
		description: "Last name of first authors",
		callback: (v) => {
			const authors = parseNameList(v.get("author") ?? "");
			const author = authors[0]?.last;
			return author ? [author] : [];
		},
	},
	authEtAl: {
		description:
			"If 1 or 2 authors, both authors, otherwise first author and EtAl",
		callback: (v) => {
			const authors = parseNameList(v.get("author") ?? "");
			return [
				...authors.slice(0, 2).map((author) => author.last),
				...(authors.length > 2 ? ["Et", "Al"] : []),
			];
		},
	},
	authors: {
		description: "Last name all authors",
		callback: (v) => {
			const authors = parseNameList(v.get("author") ?? "");
			return authors.map((author) => author.last);
		},
	},
	authorsN: {
		description: "Last name N authors, with EtAl if more",
		callback: (v, n = 0) => {
			const authors = parseNameList(v.get("author") ?? "");
			return [
				...authors.slice(0, n).map((author) => author.last),
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
		callback: (_, __, duplicate) => [duplicate ? numToLetter(duplicate) : ""],
	},
	duplicateNumber: {
		description:
			"If the multiple entries end up with the same key, then insert a number.",
		callback: (_, __, duplicate) => [duplicate ? String(duplicate) : ""],
	},
};

function numToLetter(n: number) {
	return String.fromCharCode(96 + n); // FIXME: this will break after 26 duplicates;
}

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
	entries: EntryNode[],
	cache: Cache,
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

	for (const entry of entries) {
		const entryValues = cache.lookupRenderedEntryValues(entry);
		const key = generateKey(entryValues, parsedTemplate);
		if (!key) continue;

		const entriesSoFar = entriesByKey.get(key) ?? [];
		entriesSoFar.push(entry);
		entriesByKey.set(key, entriesSoFar);
	}

	const keys = new Map<EntryNode, string>();
	for (const [key, entries] of entriesByKey) {
		const regenerateDuplicate = entries.length > 1;
		for (let i = 0; i < entries.length; i++) {
			const node = entries[i];
			if (!node) continue;
			const entryValues = cache.lookupRenderedEntryValues(node);
			const newKey = regenerateDuplicate
				? generateKey(entryValues, parsedTemplate, i + 1)
				: key;
			if (!newKey) continue;
			keys.set(node, newKey);
		}
	}

	return keys;
}

export function generateKey(
	valueLookup: Map<string, string>,
	entryKeyTemplate: EntryKeyTemplateToken[],
	duplicateNumber?: number,
): string | undefined {
	try {
		let newKey = entryKeyTemplate
			.map((token) => {
				if (typeof token === "string") {
					return token;
				}
				const { marker, parameter, modifiers } = token;

				const specialMarker = SPECIAL_MARKERS[marker];
				let key: string[];
				if (specialMarker) {
					key = specialMarker.callback(valueLookup, parameter, duplicateNumber);
				} else if (marker === marker.toLocaleUpperCase()) {
					const value = valueLookup.get(marker.toLocaleLowerCase());
					key = value ? words(value) : [];
				} else {
					throw new Error(`Invalid citation key token ${marker}`);
				}

				for (const modifierKey of modifiers) {
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
 *
 * Also remove other kinds of punctuation (.,:;[]_) to create tidy entry keys - though these
 * are technically valid in entry keys.
 */
function removeUnsafeEntryKeyChars(str: string): string {
	return str.replace(/[{},\s\\#%~()"'=.,:;[\]_]+/g, "");
}
