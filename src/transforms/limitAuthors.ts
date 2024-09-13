import type { Transform } from "../types";

export function createLimitAuthorsTransform(maxAuthors: number): Transform {
	return {
		name: "limit-authors",
		apply: (astProxy) => {
			const fields = astProxy.fields();
			for (const field of fields) {
				if (field.name.toLocaleLowerCase() === "author") {
					for (const node of field.value.concat) {
						// TODO: use author parser?
						const authors = node.value.split(" and ");
						if (authors.length > maxAuthors) {
							node.value = [...authors.slice(0, maxAuthors), "others"].join(
								" and ",
							);
						}
					}
				}
			}
			return undefined;
		},
	};
}
