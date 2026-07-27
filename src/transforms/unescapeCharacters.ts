import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";
import { coreSpecialCharactersReversible } from "../unicodeCore.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

const coreUnescapeCharacters = [...coreSpecialCharactersReversible]
	.map(([codepoint, escaped]) => ({
		character: String.fromCodePoint(Number.parseInt(codepoint, 16)),
		escaped,
	}))
	.sort((a, b) => b.escaped.length - a.escaped.length);

const coreQuotedUnescapeCharacters = coreUnescapeCharacters
	.filter(({ escaped }) => escaped.includes('"'))
	.map(({ character, escaped }) => ({ character, escaped: `{${escaped}}` }));

function unescapeCharacters(value: string, quoted = false): string {
	let result = value;

	if (quoted) {
		for (const { escaped, character } of coreQuotedUnescapeCharacters) {
			result = result.replaceAll(escaped, character);
		}
	}

	for (const { escaped, character } of coreUnescapeCharacters) {
		result = result.replaceAll(escaped, character);
	}

	return result;
}

export function createUnescapeCharactersTransform(): Transform {
	return {
		name: "unescape-characters",
		apply: (ast) => {
			ast.replace(
				(node) => isNodeType(node, "braced", "quoted"),
				(node) => [
					replaceValueNodeText(
						node,
						unescapeCharacters(
							renderValueNode(node),
							isNodeType(node, "quoted"),
						),
					),
				],
			);
		},
	};
}
