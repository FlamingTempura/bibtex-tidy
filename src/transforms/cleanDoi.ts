import type { Transform } from "../types.ts";
/**
 *  Cleans the doi by transforming it from a potential url to the actual identifier
 */
export function createCleanDoiTransform(): Transform {
	return {
		name: "clean-doi",
		apply: (ast) => {
			for (const field of ast.fields()) {
				if (field.name.toLocaleLowerCase() === "doi") {
					for (const entry of field.value.concat) {
						entry.value = entry.value
							.replace("https://doi.org/", "")
							.replace("doi.org/", "");
					}
					ast.invalidateField(field);
				}
			}
			return undefined;
		},
	};
}
