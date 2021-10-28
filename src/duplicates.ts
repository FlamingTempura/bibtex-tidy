import { UniqueKey, MergeStrategy } from './optionUtils';
import { EntryNode, RootNode } from './bibtex-parser';
import { alphaNum } from './utils';
import { getEntries, Warning } from '.';

export function checkForDuplicates(
	ast: RootNode,
	valueLookup: Map<EntryNode, Map<string, string | undefined>>,
	duplicates?: UniqueKey[],
	merge?: MergeStrategy
): { entries: Set<EntryNode>; warnings: Warning[] } {
	const uniqCheck: Map<UniqueKey, boolean> = new Map();

	if (duplicates) {
		for (const key of duplicates) {
			uniqCheck.set(key, !!merge);
		}
	}

	if (!uniqCheck.has('key')) {
		// always check key uniqueness
		uniqCheck.set('key', false);
	}

	const duplicateEntries = new Set<EntryNode>();
	// Warnings to be output at the end
	const warnings: Warning[] = [];

	// Set of entry keys, used to check for duplicate key warnings
	const keys: Map<string, EntryNode> = new Map();
	const dois: Map<string, EntryNode> = new Map();
	const citations: Map<string, EntryNode> = new Map();
	const abstracts: Map<string, EntryNode> = new Map();

	for (const entry of getEntries(ast)) {
		const entryValues = valueLookup.get(entry)!;

		for (const [key, doMerge] of uniqCheck) {
			let duplicateOf: EntryNode | undefined;

			switch (key) {
				case 'key':
					if (!entry.key) continue;
					duplicateOf = keys.get(entry.key);
					if (!duplicateOf) keys.set(entry.key, entry);
					break;

				case 'doi':
					const doi = alphaNum(entryValues.get('doi') ?? '');
					if (!doi) continue;
					duplicateOf = dois.get(doi);
					if (!duplicateOf) dois.set(doi, entry);
					break;

				case 'citation':
					const ttl = entryValues.get('title');
					const aut = entryValues.get('author');
					if (!ttl || !aut) continue;
					const cit: string =
						alphaNum(aut.split(/,| and/)[0]) + ':' + alphaNum(ttl);
					duplicateOf = citations.get(cit);
					if (!duplicateOf) citations.set(cit, entry);
					break;

				case 'abstract':
					const abstract = alphaNum(entryValues.get('abstract') ?? '');
					const abs = abstract?.slice(0, 100);
					if (!abs) continue;
					duplicateOf = abstracts.get(abs);
					if (!duplicateOf) abstracts.set(abs, entry);
					break;
			}

			if (duplicateOf) {
				if (doMerge) {
					duplicateEntries.add(entry);
					warnings.push({
						code: 'DUPLICATE_ENTRY',
						message: `${entry.key} appears to be a duplicate of ${duplicateOf.key} and was removed.`,
					});
					mergeEntries(merge, duplicateOf, entry);
				} else {
					warnings.push({
						code: 'DUPLICATE_KEY',
						message: `${entry.key} is a duplicate entry key.`,
					});
				}
			}
		}
	}

	return { entries: duplicateEntries, warnings };
}

function mergeEntries(
	merge: MergeStrategy | undefined,
	duplicateOf: EntryNode,
	entry: EntryNode
): void {
	switch (merge) {
		case 'last':
			duplicateOf.key = entry.key;
			duplicateOf.fields = entry.fields;
			break;

		case 'combine':
		case 'overwrite':
			for (const field of entry.fields) {
				const existing = duplicateOf.fields.find(
					(f) => f.name.toLocaleLowerCase() === field.name.toLocaleLowerCase()
				);
				if (!existing) {
					duplicateOf.fields.push(field);
				} else if (merge === 'overwrite') {
					existing.value = field.value;
				}
			}
			break;
		// TODO: case 'keep-both'
	}
}
