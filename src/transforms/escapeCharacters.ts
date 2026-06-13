import type { Transform, Warning } from "../types.ts";
import { specialCharacters } from "../unicode.ts";
import { coreSpecialCharacters } from "../unicodeCore.ts";

/**
 * The following fields are listed in the BibLaTeX documentation as verbatim (may contain
 * special characters). Source: Kime et al (2024) The biblatex Package (v3.20).
 */
const VERBATIM_FIELDS = [
	"url",
	"doi",
	"eprint",
	"file",
	"verba",
	"verbb",
	"verbc",
	"pdf",
];

// escape special characters like %. Do not do this on the url field, which is a
// special bibtex field where special characters are output verbatim.
export function createEscapeCharactersTransform(newMode = false): Transform {
	const characters = newMode ? coreSpecialCharacters : specialCharacters;

	return {
		name: "escape-characters",
		apply: (ast) => {
			const warnings: Warning[] = [];
			const warned = new Set<string>();

			for (const field of ast.fields()) {
				if (VERBATIM_FIELDS.includes(field.name)) {
					continue;
				}
				for (const entry of field.value.concat) {
					const result = escapeCharacters(
						entry.value,
						characters,
						entry.type === "quoted",
					);
					entry.value = result.value;

					for (const unsupported of result.unsupported) {
						const key = `${field.name}:${unsupported.codepoint}`;
						if (warned.has(key)) continue;
						warned.add(key);
						warnings.push({
							code: "UNSUPPORTED_ESCAPE",
							character: unsupported.character,
							codepoint: unsupported.codepoint,
							message: `Cannot escape character ${unsupported.character} (U+${unsupported.codepoint.toUpperCase()}) in ${field.name} without LaTeX packages or special fonts.`,
						});
					}
				}
			}
			return warnings;
		},
	};
}

function escapeCharacters(
	value: string,
	characters: Map<string, string>,
	protectQuotes = false,
): {
	value: string;
	unsupported: { character: string; codepoint: string }[];
} {
	let result = value;
	const mathExpressions: string[] = [];
	const unsupported: { character: string; codepoint: string }[] = [];

	result = result.replace(/\$[^$]+\$/g, (match) => {
		mathExpressions.push(match);
		return `MATH.EXP.${mathExpressions.length - 1}`;
	});

	let newstr = "";
	let escapeMode = false;

	for (const char of result) {
		if (escapeMode) {
			escapeMode = false;
			newstr += char;
			continue;
		}
		if (char === "\\") {
			escapeMode = true;
			newstr += char;
			continue;
		}
		// iterate through each character and if it's a special char replace with latex code
		const codepointValue = char.codePointAt(0) ?? 0;
		const codepoint = codepointValue.toString(16).padStart(4, "0");
		const escaped = characters.get(codepoint);
		newstr +=
			protectQuotes && escaped?.includes('"')
				? `{${escaped}}`
				: (escaped ?? char);
		if (!escaped && codepointValue > 0x7f) {
			unsupported.push({ character: char, codepoint });
		}
	}
	return {
		value: newstr.replace(
			/MATH\.EXP\.(\d+)/g,
			(_, i) => mathExpressions[Number(i)] ?? "",
		),
		unsupported,
	};
}
