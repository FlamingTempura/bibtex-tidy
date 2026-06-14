import type { Transform } from "../types.ts";
import { renderValueNode, replaceValueNodeText } from "../valueNodes.ts";

export function createEncodeUrlsTransform(): Transform {
	return {
		name: "encode-urls",
		apply: (ast) => {
			for (const field of ast.fields()) {
				if (field.name.toLocaleLowerCase() === "url") {
					for (const entry of field.value.concat) {
						replaceValueNodeText(entry, encodeUrl(renderValueNode(entry)));
					}
					ast.invalidateField(field);
				}
			}
			return undefined;
		},
	};
}

function encodeUrl(url: string): string {
	return url.replace(/\\?_/g, "\\%5F");
}
