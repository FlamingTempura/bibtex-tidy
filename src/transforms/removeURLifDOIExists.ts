import type { Transform } from "../types.ts";

export function createRemoveUrlIfDoiExistsTransform(): Transform {
	return {
		name: "remove-url-if-doi-exists",
		apply: (astProxy) => {
			for (const entry of astProxy.entries()) {
				// Check if DOI exists and is non-empty
				const doiValue = astProxy.lookupRenderedEntryValue(entry, "doi").trim();
				if (doiValue) {
					// Filter out URL fields
					entry.fields = entry.fields.filter(
						(field) => field.name.toLowerCase() !== "url",
					);
				}
			}
			return undefined;
		},
	};
}
