export type EntryKeyTemplateToken =
	| string
	| { marker: string; parameter?: number; modifiers: string[] };

export function parseEntryKeyTemplate(
	template: string,
): EntryKeyTemplateToken[] {
	const tokens: EntryKeyTemplateToken[] = [];
	const matches = template.matchAll(/\[[^:\]]+(?::[^:\]]+)*\]/g);

	let pos = 0;
	for (const match of matches) {
		if (match.index === undefined) break;
		if (match.index !== pos) {
			tokens.push(template.slice(pos, match.index));
		}
		const [tokenKeyN, ...modifierKeys] = match[0].slice(1, -1).split(":");
		if (!tokenKeyN) {
			throw new Error("Token parse error");
		}

		let n: number | undefined;
		const tokenKey = tokenKeyN.replace(/[0-9]+/g, (m) => {
			n = Number(m);
			return "N";
		});

		tokens.push({
			marker: tokenKey,
			parameter: n,
			modifiers: modifierKeys,
		});
		pos = match.index + match[0].length;
	}
	if (pos < template.length) {
		tokens.push(template.slice(pos));
	}

	return tokens;
}
