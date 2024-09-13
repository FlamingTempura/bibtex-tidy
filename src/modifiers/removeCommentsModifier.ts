import type { Transformation } from "../types";

export const removeCommentsModifier: Transformation = {
	name: "remove-comments",
	type: "RootModifier",
	condition: (options) => Boolean(options.stripComments),
	modifyRoot: (root) => {
		root.children = root.children.filter(
			(child) =>
				child.type !== "text" &&
				(child.type !== "block" || child.block?.type !== "comment"),
		);

		return undefined;
	},
};
