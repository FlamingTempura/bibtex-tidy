import { Cache } from "./cache";
import { formatBibtex } from "./format";
import { abbreviateMonthsModifier } from "./modifiers/abbreviateMonthsModifier";
import { dropAllCapsModifier } from "./modifiers/dropAllCapsModifier";
import { encloseBracesModifier } from "./modifiers/encloseBracesModifier";
import { encodeUrlsModifier } from "./modifiers/encodeUrlsModifier";
import { escapeCharactersModifier } from "./modifiers/escapeCharactersModifier";
import { formatPageRangeModifier } from "./modifiers/formatPageRangeModifier";
import { generateKeysModifier } from "./modifiers/generateKeysModifier";
import { limitAuthorsModifier } from "./modifiers/limitAuthorsModifier";
import { lowercaseEntryTypeModifier } from "./modifiers/lowercaseEntryTypeModifier";
import { lowercaseFieldsModifier } from "./modifiers/lowercaseFieldsModifier";
import { mergeEntriesModifier } from "./modifiers/mergeEntriesModifier";
import { omitFieldModifier } from "./modifiers/omitFieldModifier";
import { preferCurlyModifier } from "./modifiers/preferCurlyModifier";
import { preferNumericModifier } from "./modifiers/preferNumericModifier";
import { removeBracesModifier } from "./modifiers/removeBracesModifier";
import { removeCommentsModifier } from "./modifiers/removeCommentsModifier";
import { removeDuplicateFieldsModifier } from "./modifiers/removeDuplicateFieldsModifier";
import { removeEmptyFieldsModifier } from "./modifiers/removeEmptyFieldsModifier";
import { sortEntriesModifier } from "./modifiers/sortEntriesModifier";
import { sortFieldsModifier } from "./modifiers/sortFieldsModifier";
import { stripEnclosingBracesModifier } from "./modifiers/stripEnclosingBracesModifier";
import { trimCommentsModifier } from "./modifiers/trimCommentsModifier";
import { normalizeOptions } from "./optionUtils";
import type { DuplicateRule, Options } from "./optionUtils";
import {
	type EntryNode,
	type RootNode,
	parseBibTeX,
} from "./parsers/bibtexParser";
import { convertCRLF, isEntryNode } from "./utils";

export type Warning = (
	| { code: "MISSING_KEY" }
	| { code: "DUPLICATE_ENTRY"; rule: DuplicateRule }
) & {
	message: string;
};

export type BibTeXTidyResult = {
	bibtex: string;
	warnings: Warning[];
	count: number;
};

const modifiers = [
	encodeUrlsModifier,
	limitAuthorsModifier,
	escapeCharactersModifier,
	dropAllCapsModifier,
	formatPageRangeModifier,
	abbreviateMonthsModifier,
	stripEnclosingBracesModifier,
	removeBracesModifier,
	omitFieldModifier,
	mergeEntriesModifier,
	preferNumericModifier,
	sortEntriesModifier,
	sortFieldsModifier,
	generateKeysModifier,
	removeDuplicateFieldsModifier,
	removeEmptyFieldsModifier,
	lowercaseFieldsModifier,
	lowercaseEntryTypeModifier,
	removeCommentsModifier,
	trimCommentsModifier,
	preferCurlyModifier,
	encloseBracesModifier,
];

export function tidy(input: string, options_: Options = {}): BibTeXTidyResult {
	const options = normalizeOptions(options_);
	const inputFixed = convertCRLF(input);
	const ast = parseBibTeX(inputFixed);
	const entries = getEntries(ast);

	const warnings: Warning[] = entries
		.filter((entry) => !entry.key)
		.map((entry) => ({
			code: "MISSING_KEY",
			message: `${entry.parent.command} entry does not have a citation key.`,
		}));

	const cache = new Cache(options);

	for (const modifier of modifiers) {
		if (modifier.type === "RootModifier") {
			const params = modifier.condition(options);
			if (!params) continue;
			//@ts-expect-error
			const result = modifier.modifyRoot(ast, cache, params);
			if (result) warnings.push(...result);
		} else {
			for (const entry of entries) {
				for (const field of entry.fields) {
					const params = modifier.condition(
						field.name.toLocaleLowerCase(),
						options,
						entry,
						cache,
					);
					if (!params) continue;
					if (modifier.modifyNode) {
						//@ts-expect-error
						modifier.modifyNode(field, params);
						cache.invalidateEntryValue(entry, field.name);
					}
					for (const node of field.value.concat) {
						if (node.type === "braced" || node.type === "quoted") {
							if (modifier.modifyRenderedValue) {
								const newValue = modifier.modifyRenderedValue(
									node.value,
									//@ts-expect-error
									params,
								);
								if (newValue !== node.value) {
									node.value = newValue;
									cache.invalidateEntryValue(entry, field.name);
								}
							}
						}
					}
				}
			}
		}
	}

	const bibtex = formatBibtex(ast, options);

	return { bibtex, warnings, count: entries.length };
}
export function getEntries(ast: RootNode): EntryNode[] {
	return ast.children.filter(isEntryNode).map((node) => node.block);
}
