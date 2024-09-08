import { specialCharacters } from "../unicode";
import type { Modifier } from "./limitAuthorsModifier";

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
export const escapeCharactersModifier: Modifier<boolean> = {
	condition: (fieldName, options) =>
		Boolean(options.escape && !VERBATIM_FIELDS.includes(fieldName)),
	modifyRenderedValue: (str) => {
		let result = str;
		const mathExpressions: string[] = [];

		result = result.replace(/\$[^$]+\$/g, (match) => {
			mathExpressions.push(match);
			return `MATH.EXP.${mathExpressions.length - 1}`;
		});

		let newstr = "";
		let escapeMode = false;

		for (let i = 0; i < result.length; i++) {
			if (escapeMode) {
				escapeMode = false;
				newstr += result[i];
				continue;
			}
			if (result[i] === "\\") {
				escapeMode = true;
				newstr += result[i];
				continue;
			}
			// iterate through each character and if it's a special char replace with latex code
			const c = result.charCodeAt(i).toString(16).padStart(4, "0");
			newstr += specialCharacters.get(c) ?? result[i];
		}
		return newstr.replace(
			/MATH\.EXP\.(\d+)/g,
			(_, i) => mathExpressions[Number(i)] ?? "",
		);
	},
};
