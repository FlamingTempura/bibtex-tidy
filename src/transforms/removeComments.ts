import type { Transform } from "../types";

export function createRemoveCommentsTransform(): Transform {
	return {
		name: "remove-comments",
		apply: (astProxy) => {
			astProxy.root().children = astProxy
				.root()
				.children.filter(
					(child) =>
						child.type !== "text" &&
						(child.type !== "block" || child.block?.type !== "comment"),
				);

			return undefined;
		},
	};
}
