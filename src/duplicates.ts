import type { EntryNode, RootNode } from './bibtexParser';
import type { DuplicateRule, MergeStrategy } from './optionUtils';
import { parseAuthors } from './parseAuthors';
import { alphaNum } from './utils';
import { getEntries } from '.';
import type { Warning } from '.';

export function checkForDuplicates(
	ast: RootNode,
	valueLookup: Map<EntryNode, Map<string, string | undefined>>,
	duplicateRules?: DuplicateRule[],
	merge?: MergeStrategy,
): { entries: Set<EntryNode>; warnings: Warning[] } {
	const rules = new Map<DuplicateRule, boolean>();

	if (duplicateRules) {
		for (const rule of duplicateRules) {
			rules.set(rule, !!merge);
		}
	}

	if (!rules.has('key')) {
		// always check key uniqueness
		rules.set('key', false);
	}

	const duplicateEntries = new Set<EntryNode>();
	// Warnings to be output at the end
	const warnings: Warning[] = [];

	// Set of entry keys, used to check for duplicate key warnings
	const keys = new Map<string, EntryNode>();
	const dois = new Map<string, EntryNode>();
	const citations = new Map<string, EntryNode>();
	const abstracts = new Map<string, EntryNode>();

	for (const entry of getEntries(ast)) {
		const entryValues = valueLookup.get(entry);
		if (!entryValues) continue;

		for (const [rule, doMerge] of rules) {
			let duplicateOf: EntryNode | undefined;
			let warning: string | undefined;

			switch (rule) {
				case 'key': {
					if (!entry.key) continue;
					// Bibtex keys are case insensitive
					// https://web.archive.org/web/20210422110817/https://maverick.inria.fr/~Xavier.Decoret/resources/xdkbibtex/bibtex_summary.html
					const keyLC = entry.key.toLocaleLowerCase();
					duplicateOf = keys.get(keyLC);
					if (!duplicateOf) {
						keys.set(keyLC, entry);
					} else {
						warning = `The citation key ${entry.key} has already been used.`;
					}
					break;
				}

				case 'doi': {
					const doi = alphaNum(entryValues.get('doi') ?? '');
					if (!doi) continue;
					duplicateOf = dois.get(doi);
					if (!duplicateOf) {
						dois.set(doi, entry);
					} else {
						warning = `Entry ${entry.key} has an identical DOI to entry ${duplicateOf.key}.`;
					}
					break;
				}

				case 'citation': {
					const ttl = entryValues.get('title');
					const aut = entryValues.get('author');
					// Author/title can be identical for numbered reports https://github.com/FlamingTempura/bibtex-tidy/issues/364
					const num = entryValues.get('number');
					if (!ttl || !aut) continue;
					const cit: string = [
						alphaNum(parseAuthors(aut)[0]?.lastName ?? aut),
						alphaNum(ttl),
						alphaNum(num ?? '0'),
					].join(':');
					duplicateOf = citations.get(cit);
					if (!duplicateOf) {
						citations.set(cit, entry);
					} else {
						warning = `Entry ${entry.key} has similar content to entry ${duplicateOf.key}.`;
					}
					break;
				}

				case 'abstract': {
					const abstract = alphaNum(entryValues.get('abstract') ?? '');
					const abs = abstract.slice(0, 100);
					if (!abs) continue;
					duplicateOf = abstracts.get(abs);
					if (!duplicateOf) {
						abstracts.set(abs, entry);
					} else {
						warning = `Entry ${entry.key} has a similar abstract to entry ${duplicateOf.key}.`;
					}
					break;
				}
			}

			if (duplicateOf && doMerge) {
				duplicateEntries.add(entry);
				mergeEntries(merge, duplicateOf, entry);
			}
			if (warning) {
				warnings.push({
					code: 'DUPLICATE_ENTRY',
					rule,
					message: `Duplicate ${doMerge ? 'removed' : 'detected'}. ${warning}`,
				});
			}
		}
	}

	return { entries: duplicateEntries, warnings };
}

function mergeEntries(
	merge: MergeStrategy | undefined,
	duplicateOf: EntryNode,
	entry: EntryNode,
): void {
	if (!merge) return;
	switch (merge) {
		case 'last':
			duplicateOf.key = entry.key;
			duplicateOf.fields = entry.fields;
			break;

		case 'combine':
		case 'overwrite':
			for (const field of entry.fields) {
				const existing = duplicateOf.fields.find(
					(f) => f.name.toLocaleLowerCase() === field.name.toLocaleLowerCase(),
				);
				if (!existing) {
					duplicateOf.fields.push(field);
				} else if (merge === 'overwrite') {
					existing.value = field.value;
				}
			}
			break;
		// TODO: case 'keep-both'
		case 'first':
			return;
	}
}
