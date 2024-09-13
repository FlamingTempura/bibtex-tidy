import { createAbbreviateMonthsTransformation } from "./modifiers/abbreviateMonthsModifier";
import { createDropAllCapsTransformation } from "./modifiers/dropAllCapsModifier";
import { encloseBracesModifier } from "./modifiers/encloseBracesModifier";
import { encodeUrlsModifier } from "./modifiers/encodeUrlsModifier";
import { escapeCharactersModifier } from "./modifiers/escapeCharactersModifier";
import { formatPageRangeModifier } from "./modifiers/formatPageRangeModifier";
import { createGenerateKeysTransformation } from "./modifiers/generateKeysModifier";
import { createLimitAuthorsTransformation } from "./modifiers/limitAuthorsModifier";
import { createLowercaseEntryTypeModifier } from "./modifiers/lowercaseEntryTypeModifier";
import { createLowercaseFieldsModifier } from "./modifiers/lowercaseFieldsModifier";
import { createMergeEntriesTransformation } from "./modifiers/mergeEntriesModifier";
import { createOmitFieldsModifier } from "./modifiers/omitFieldModifier";
import { preferCurlyModifier } from "./modifiers/preferCurlyModifier";
import { preferNumericModifier } from "./modifiers/preferNumericModifier";
import { removeBracesModifier } from "./modifiers/removeBracesModifier";
import { removeCommentsModifier } from "./modifiers/removeCommentsModifier";
import { removeDuplicateFieldsModifier } from "./modifiers/removeDuplicateFieldsModifier";
import { removeEmptyFieldsModifier } from "./modifiers/removeEmptyFieldsModifier";
import { createSortEntriesModifier } from "./modifiers/sortEntriesModifier";
import { createSortFieldsModifier } from "./modifiers/sortFieldsModifier";
import { stripEnclosingBracesModifier } from "./modifiers/stripEnclosingBracesModifier";
import { trimCommentsModifier } from "./modifiers/trimCommentsModifier";
import type { OptionsNormalized } from "./optionUtils";
import type { Transformation } from "./types";

function sortPipeline(transformations: Transformation[]): Transformation[] {
	const sorted: Transformation[] = [];
	const visited: Set<string> = new Set();

	const visit = (transformation: Transformation) => {
		if (visited.has(transformation.name)) return;
		visited.add(transformation.name);

		for (const dep of transformation.dependencies ?? []) {
			const depTransformation = transformations.find((t) => t.name === dep);
			if (depTransformation) visit(depTransformation);
		}

		sorted.push(transformation);
	};

	transformations.forEach(visit);
	return sorted;
}

/**
 * Prepares a transformation based on the provided options.
 * Returns the transformation if it should be applied, or undefined if it should be skipped.
 */
export function generateTransformationPipeline(
	options: OptionsNormalized,
): Transformation[] {
	const pipeline: Transformation[] = [];
	if (options.months) {
		pipeline.push(createAbbreviateMonthsTransformation());
	}
	if (options.dropAllCaps) {
		pipeline.push(createDropAllCapsTransformation());
	}
	if (options.encodeUrls) {
		pipeline.push(encodeUrlsModifier);
	}
	if (options.escape) {
		pipeline.push(escapeCharactersModifier);
	}
	pipeline.push(formatPageRangeModifier);
	if (options.generateKeys) {
		pipeline.push(createGenerateKeysTransformation(options.generateKeys));
	}
	if (options.maxAuthors) {
		pipeline.push(createLimitAuthorsTransformation(options.maxAuthors));
	}
	if (options.lowercase) {
		pipeline.push(
			createLowercaseEntryTypeModifier(),
			createLowercaseFieldsModifier(),
		);
	}
	if (options.merge || options.duplicates) {
		pipeline.push(
			createMergeEntriesTransformation(options.duplicates, options.merge),
		);
	}
	if (options.omit) {
		pipeline.push(createOmitFieldsModifier(options.omit));
	}
	if (options.enclosingBraces) {
		pipeline.push(encloseBracesModifier);
	}
	if (options.curly) {
		pipeline.push(preferCurlyModifier);
	}
	if (options.numeric) {
		pipeline.push(preferNumericModifier);
	}
	if (options.removeBraces) {
		pipeline.push(removeBracesModifier);
	}
	if (options.stripComments) {
		pipeline.push(removeCommentsModifier);
	}
	if (options.removeDuplicateFields) {
		pipeline.push(removeDuplicateFieldsModifier);
	}
	if (options.removeEmptyFields) {
		pipeline.push(removeEmptyFieldsModifier);
	}
	if (options.sort) {
		pipeline.push(createSortEntriesModifier(options.sort));
	}
	if (options.sortFields) {
		pipeline.push(createSortFieldsModifier(options.sortFields));
	}
	if (options.stripEnclosingBraces) {
		pipeline.push(stripEnclosingBracesModifier);
	}
	if (options.tidyComments) {
		pipeline.push(trimCommentsModifier);
	}
	return sortPipeline(pipeline);
}
