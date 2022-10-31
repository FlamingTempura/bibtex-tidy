type Author = {
	firstNames: string;
	lastName: string;
};

export function parseAuthors(authors: string, sanitize?: boolean): Author[] {
	return authors
		.replace(/\s+/g, ' ') // normalise whitespace and remove new lines
		.split(/ and /i)
		.map((nameRaw) => {
			let name = nameRaw.trim();
			if (sanitize) {
				name = name.replace(/["{}]/g, '');
			}
			const commaPos = name.indexOf(',');
			if (commaPos > -1) {
				return {
					firstNames: name.slice(commaPos + 1).trim(),
					lastName: name.slice(0, commaPos).trim(),
				};
			} else {
				const lastSpacePos = name.lastIndexOf(' ');
				return {
					firstNames: name.slice(0, lastSpacePos).trim(),
					lastName: name.slice(lastSpacePos).trim(),
				};
			}
		});
}
