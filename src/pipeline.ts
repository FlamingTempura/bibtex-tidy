import type { OptionsNormalized } from "./optionUtils";
import { createAbbreviateMonthsTransform } from "./transforms/abbreviateMonths";
import { createDropAllCapsTransform } from "./transforms/dropAllCaps";
import { createEncloseBracesTransform } from "./transforms/encloseBraces";
import { createEncodeUrlsTransform } from "./transforms/encodeUrls";
import { createEscapeCharactersTransform } from "./transforms/escapeCharacters";
import { createFormatPageRangeTransform } from "./transforms/formatPageRange";
import { createGenerateKeysTransform } from "./transforms/generateKeys";
import { createLimitAuthorsTransform } from "./transforms/limitAuthors";
import { createLowercaseEntryTypeTransform } from "./transforms/lowercaseEntryType";
import { createLowercaseFieldsTransform } from "./transforms/lowercaseFields";
import { createMergeEntriesTransform } from "./transforms/mergeEntries";
import { createRemoveSpecifiedFieldsTransform } from "./transforms/removeSpecifiedFields";
import { createPreferCurlyTransform } from "./transforms/preferCurly";
import { createPreferNumericTransform } from "./transforms/preferNumeric";
import { createRemoveBracesTransform } from "./transforms/removeBraces";
import { createRemoveCommentsTransform } from "./transforms/removeComments";
import { createRemoveDuplicateFieldsTransform } from "./transforms/removeDuplicateFields";
import { createRemoveEmptyFieldsTransform } from "./transforms/removeEmptyFields";
import { createSortEntriesTransform } from "./transforms/sortEntries";
import { createSortFieldsTransform } from "./transforms/sortFields";
import { createRemoveEnclosingBracesTransform } from "./transforms/removeEnclosingBraces";
import { createTrimCommentsTransform } from "./transforms/trimComments";
import type { Transform } from "./types";

function sortPipeline(Transforms: Transform[]): Transform[] {
	const sorted: Transform[] = [];
	const visited: Set<string> = new Set();

	const visit = (Transform: Transform) => {
		if (visited.has(Transform.name)) return;
		visited.add(Transform.name);

		for (const dep of Transform.dependencies ?? []) {
			const depTransform = Transforms.find((t) => t.name === dep);
			if (depTransform) visit(depTransform);
		}

		sorted.push(Transform);
	};

	Transforms.forEach(visit);
	return sorted;
}

/**
 * Prepares a Transform based on the provided options.
 * Returns the Transform if it should be applied, or undefined if it should be skipped.
 */
export function generateTransformPipeline(
	options: OptionsNormalized,
): Transform[] {
	const pipeline: Transform[] = [];
	if (options.months) {
		pipeline.push(createAbbreviateMonthsTransform());
	}
	if (options.dropAllCaps) {
		pipeline.push(createDropAllCapsTransform());
	}
	if (options.encodeUrls) {
		pipeline.push(createEncodeUrlsTransform());
	}
	if (options.escape) {
		pipeline.push(createEscapeCharactersTransform());
	}
	pipeline.push(createFormatPageRangeTransform());
	if (options.generateKeys) {
		pipeline.push(createGenerateKeysTransform(options.generateKeys));
	}
	if (options.maxAuthors) {
		pipeline.push(createLimitAuthorsTransform(options.maxAuthors));
	}
	if (options.lowercase) {
		pipeline.push(
			createLowercaseEntryTypeTransform(),
			createLowercaseFieldsTransform(),
		);
	}
	if (options.merge || options.duplicates) {
		pipeline.push(
			createMergeEntriesTransform(options.duplicates, options.merge),
		);
	}
	if (options.omit) {
		pipeline.push(createRemoveSpecifiedFieldsTransform(options.omit));
	}
	if (options.enclosingBraces) {
		pipeline.push(createEncloseBracesTransform(options.enclosingBraces));
	}
	if (options.curly) {
		pipeline.push(createPreferCurlyTransform());
	}
	if (options.numeric) {
		pipeline.push(createPreferNumericTransform());
	}
	if (options.removeBraces) {
		pipeline.push(createRemoveBracesTransform(options.removeBraces));
	}
	if (options.stripComments) {
		pipeline.push(createRemoveCommentsTransform());
	}
	if (options.removeDuplicateFields) {
		pipeline.push(createRemoveDuplicateFieldsTransform());
	}
	if (options.removeEmptyFields) {
		pipeline.push(createRemoveEmptyFieldsTransform());
	}
	if (options.sort) {
		pipeline.push(createSortEntriesTransform(options.sort));
	}
	if (options.sortFields) {
		pipeline.push(createSortFieldsTransform(options.sortFields));
	}
	if (options.stripEnclosingBraces) {
		pipeline.push(createRemoveEnclosingBracesTransform());
	}
	if (options.tidyComments) {
		pipeline.push(createTrimCommentsTransform());
	}
	return sortPipeline(pipeline);
}
