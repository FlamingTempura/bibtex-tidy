import type { OptionsNormalized } from "./optionUtils.ts";
import { createAbbreviateMonthsTransform } from "./transforms/abbreviateMonths.ts";
import { createAlignValuesTransform } from "./transforms/alignValues.ts";
import { createBlankLinesTransform } from "./transforms/blankLines.ts";
import { createDropAllCapsTransform } from "./transforms/dropAllCaps.ts";
import { createEncloseBracesTransform } from "./transforms/encloseBraces.ts";
import { createEncodeUrlsTransform } from "./transforms/encodeUrls.ts";
import { createEscapeCharactersTransform } from "./transforms/escapeCharacters.ts";
import { createFieldCommasTransform } from "./transforms/fieldCommas.ts";
import { createFormatPageRangeTransform } from "./transforms/formatPageRange.ts";
import { createGenerateKeysTransform } from "./transforms/generateKeys.ts";
import { createIndentFieldsTransform } from "./transforms/indentFields.ts";
import { createLimitAuthorsTransform } from "./transforms/limitAuthors.ts";
import { createLowercaseEntryTypeTransform } from "./transforms/lowercaseEntryType.ts";
import { createLowercaseFieldsTransform } from "./transforms/lowercaseFields.ts";
import { createMergeEntriesTransform } from "./transforms/mergeEntries.ts";
import { createPreferCurlyTransform } from "./transforms/preferCurly.ts";
import { createPreferNumericTransform } from "./transforms/preferNumeric.ts";
import { createRemoveBracesTransform } from "./transforms/removeBraces.ts";
import { createRemoveCommentsTransform } from "./transforms/removeComments.ts";
import { createRemoveDuplicateFieldsTransform } from "./transforms/removeDuplicateFields.ts";
import { createRemoveEmptyFieldsTransform } from "./transforms/removeEmptyFields.ts";
import { createRemoveEnclosingBracesTransform } from "./transforms/removeEnclosingBraces.ts";
import { createRemoveSpecifiedFieldsTransform } from "./transforms/removeSpecifiedFields.ts";
import { createRemoveUrlIfDoiExistsTransform } from "./transforms/removeURLifDOIExists.ts";
import { createResetWhitespaceTransform } from "./transforms/resetWhitespace.ts";
import { createSortEntriesTransform } from "./transforms/sortEntries.ts";
import { createSortFieldsTransform } from "./transforms/sortFields.ts";
import { createWrapValuesTransform } from "./transforms/wrapValues.ts";
import type { Transform } from "./types.ts";

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
	if (options.removeURLifDOIExists) {
		pipeline.push(createRemoveUrlIfDoiExistsTransform());
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
	pipeline.push(createResetWhitespaceTransform(!options.tidyComments));
	const indent = options.tab ? "\t" : " ".repeat(options.space);
	pipeline.push(createIndentFieldsTransform(indent));
	if (options.blankLines) {
		pipeline.push(createBlankLinesTransform());
	}
	pipeline.push(createAlignValuesTransform(options.align));
	pipeline.push(createFieldCommasTransform(options.trailingCommas ?? false));
	pipeline.push(createWrapValuesTransform(indent, options.align, options.wrap));
	return sortPipeline(pipeline);
}
