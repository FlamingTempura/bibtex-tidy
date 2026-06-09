import type { Options, OptionsNormalized } from "../optionUtils.ts";
import { normalizeOptions } from "../optionUtils.ts";

export function getOptionsFromSearch(
	search: string,
	defaults: OptionsNormalized,
): OptionsNormalized | undefined {
	const urlParams = new URLSearchParams(search);
	const optionsJSON = urlParams.get("opt");
	if (!optionsJSON) return;

	const parsedOptions = JSON.parse(optionsJSON) as Partial<Options>;
	const normalizedOptions = normalizeOptions(parsedOptions);
	const explicitOptions = Object.fromEntries(
		Object.keys(parsedOptions).map((key) => [
			key,
			normalizedOptions[key as keyof OptionsNormalized],
		]),
	);

	return {
		...defaults,
		...explicitOptions,
	};
}
