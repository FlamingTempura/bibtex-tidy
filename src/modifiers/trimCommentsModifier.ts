import type { Modifier } from "../types";

export const trimCommentsModifier: Modifier = {
	type: "RootModifier",
	condition: (options) => Boolean(options.tidyComments),
	modifyRoot: (root) => {
		for (const child of root.children) {
			if (child.type === "text") {
				child.text = tidyComment(child.text);
			} else if (child.block?.type === "comment") {
				child.block.raw = tidyComment(child.block.raw);
			}
		}
		return undefined;
	},
};

function tidyComment(comment: string) {
	const trimmed = comment.trim();
	if (trimmed === "") return "";
	return `${trimmed}\n`;
}
