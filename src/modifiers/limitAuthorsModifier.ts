import type { Transformation } from "../types";

export function createLimitAuthorsTransformation(
	maxAuthors: number,
): Transformation {
	return {
		name: "limit-authors",
		apply: (astProxy) => {
			astProxy.mutateValues((node) => {
				if (node.parent.parent.name.toLocaleLowerCase() === "author") {
					// TODO: use author parser?
					const authors = node.value.split(" and ");
					if (authors.length > maxAuthors) {
						node.value = [...authors.slice(0, maxAuthors), "others"].join(
							" and ",
						);
					}
				}
			});
			return undefined;
		},
	};
}
