import type { Transform } from "../types";

export function createTrimCommentsTransform(): Transform {
	return {
		name: "trim-comments",
		apply: (ast) => {
			for (const child of ast.root().children) {
				if (child.type === "text") {
					child.text = tidyComment(child.text);
				} else if (child.block?.type === "comment") {
					child.block.raw = tidyComment(child.block.raw);
				}
			}
			return undefined;
		},
	};
}
function tidyComment(comment: string) {
	const trimmed = comment.trim();
	if (trimmed === "") return "";
	return `${trimmed}\n`;
}
