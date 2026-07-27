import { getEntries, walkAst } from "../ast.ts";
import { generateKeys } from "../generateKeys.ts";
import { isNodeType } from "../parsers/bibtexParser.ts";
import type { Transform } from "../types.ts";

export function createGenerateKeysTransform(template: string): Transform {
	return {
		name: "generate-keys",
		apply: (ast) => {
			const newKeys = generateKeys(getEntries(ast), template);
			return {
				ast: walkAst(ast, {
					block: (node) => {
						if (!isNodeType(node.block, "entry")) return [node];
						const key = newKeys.get(node.block);
						return [
							key ? node.with({ block: node.block.with({ key }) }) : node,
						];
					},
				}),
			};
		},
	};
}
