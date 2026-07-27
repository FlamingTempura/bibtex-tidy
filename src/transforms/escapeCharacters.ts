import { closestAncestor, walkAst } from "../ast.ts";
import { type LatexNode, parseLaTeX } from "../parsers/latexParser.ts";
import type { Transform, Warning } from "../types.ts";
import { specialCharacters } from "../unicode.ts";
import { coreSpecialCharacters } from "../unicodeCore.ts";

/**
 * The following fields are listed in the BibLaTeX documentation as verbatim (may contain
 * special characters). Source: Kime et al (2024) The biblatex Package (v3.20).
 */
const VERBATIM_FIELDS = new Set([
	"url",
	"doi",
	"eprint",
	"file",
	"verba",
	"verbb",
	"verbc",
	"pdf",
]);

// Unicode's Basic Latin (ASCII) block ends at U+007F.
// Source: https://www.unicode.org/charts/PDF/U0000.pdf
const MAX_ASCII_CODE_POINT = 0x7f;

type ParsedEscape = {
	default: LatexNode[];
	quoted: LatexNode[];
};

type LatexFragment = string | LatexNode;

export function createEscapeCharactersTransform(newMode = false): Transform {
	const escapes = parseEscapes(
		newMode ? coreSpecialCharacters : specialCharacters,
	);

	return {
		name: "escape-characters",
		apply: (ast) => {
			const warnings: Warning[] = [];

			const result = walkAst(ast, {
				// Preserve existing commands and prune their arguments.
				latexCommand: (node) => [node],

				latexText: (node, ctx) => {
					const field = closestAncestor(ctx, "field");
					if (!field || VERBATIM_FIELDS.has(field.name)) return [node];

					const isQuoted = closestAncestor(ctx, "quoted") !== undefined;

					return (
						[...node.text]
							// Escape each character
							.flatMap((char) => {
								const code = char.codePointAt(0);
								if (code === undefined) throw new Error(`No codepoint ${char}`);

								const esc = escapes.get(code);
								if (esc) {
									const templates = isQuoted ? esc.quoted : esc.default;
									return templates.map((tpl) =>
										tpl.type === "latexText" // TODO: extend isNodeType so it can be used for latex and use it here
											? tpl.text
											: tpl,
									);
								}

								if (code > MAX_ASCII_CODE_POINT) {
									const codepoint = code.toString(16).padStart(4, "0");
									warnings.push({
										code: "UNSUPPORTED_ESCAPE",
										character: char,
										codepoint,
										message:
											`Cannot escape character ${char} (U+${codepoint.toUpperCase()}) ` +
											`in ${field.name} without LaTeX packages or special fonts.`,
									});
								}

								return char;
							})
							// Merge consecutive strings into a single string
							.reduce<LatexFragment[]>((merged, frag) => {
								const prev = merged.at(-1);
								if (typeof prev === "string" && typeof frag === "string") {
									merged[merged.length - 1] = prev + frag;
								} else {
									merged.push(frag);
								}
								return merged;
							}, [])
							// Convert strings to TextNodes
							.map((frag) =>
								typeof frag === "string" ? node.with({ text: frag }) : frag,
							)
					);
				},
			});

			return { ast: result, warnings };
		},
	};
}

function parseEscapes(chars: Map<string, string>): Map<number, ParsedEscape> {
	return new Map(
		[...chars].map(([code, escaped]) => {
			const nodes = parseLaTeX(escaped).children;
			const quoted = escaped.includes('"')
				? parseLaTeX(`{${escaped}}`).children
				: nodes;

			return [Number.parseInt(code, 16), { default: nodes, quoted }];
		}),
	);
}
