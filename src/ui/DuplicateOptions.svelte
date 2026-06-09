<script lang="ts">
import type { MergeStrategy, OptionsNormalized } from "../optionUtils.ts";
import Checkbox from "./Checkbox.svelte";
import Collapsible from "./Collapsible.svelte";
import Label from "./Label.svelte";
import Option from "./Option.svelte";
import Radio from "./Radio.svelte";

type Props = {
	options: OptionsNormalized;
	onchange?: (options: OptionsNormalized) => void;
};

let { options, onchange }: Props = $props();

let duplicateCheckChecked = $derived(options.duplicates !== undefined);
let duplicateCheckKey = $derived(options.duplicates?.includes("key") ?? true);
let duplicateCheckDOI = $derived(options.duplicates?.includes("doi") ?? false);
let duplicateCheckCitation = $derived(
	options.duplicates?.includes("citation") ?? false,
);
let duplicateCheckAbstract = $derived(
	options.duplicates?.includes("abstract") ?? false,
);

let mergeChecked = $derived(options.merge !== undefined);
let mergeValue = $derived<MergeStrategy>(options.merge ?? "combine");

const updateOptions = (changes: Partial<OptionsNormalized>): void => {
	onchange?.({ ...options, ...changes });
};

const getDuplicates = (
	checked: boolean,
	key: boolean,
	doi: boolean,
	citation: boolean,
	abstract: boolean,
): OptionsNormalized["duplicates"] => {
	if (!checked) return undefined;
	const values: NonNullable<OptionsNormalized["duplicates"]> = [];
	if (key) values.push("key");
	if (doi) values.push("doi");
	if (citation) values.push("citation");
	if (abstract) values.push("abstract");
	return values;
};
</script>

<Collapsible title="Duplicates" open={true}>
	<Option
		option="duplicates"
		checked={duplicateCheckChecked}
		onchange={(v) =>
			updateOptions({
				duplicates: getDuplicates(
					v,
					duplicateCheckKey,
					duplicateCheckDOI,
					duplicateCheckCitation,
					duplicateCheckAbstract,
				),
			})}
	>
		<p>What to check:</p>
		<Label>
			<Checkbox
				name="uniqKEY"
				checked={duplicateCheckKey}
				onchange={(v) =>
					updateOptions({
						duplicates: getDuplicates(
							duplicateCheckChecked,
							v,
							duplicateCheckDOI,
							duplicateCheckCitation,
							duplicateCheckAbstract,
						),
					})}
			/>
			Matching Keys
		</Label>
		<Label>
			<Checkbox
				name="uniqDOI"
				checked={duplicateCheckDOI}
				onchange={(v) =>
					updateOptions({
						duplicates: getDuplicates(
							duplicateCheckChecked,
							duplicateCheckKey,
							v,
							duplicateCheckCitation,
							duplicateCheckAbstract,
						),
					})}
			/>
			Matching DOIs
		</Label>
		<Label>
			<Checkbox
				name="uniqCIT"
				checked={duplicateCheckCitation}
				onchange={(v) =>
					updateOptions({
						duplicates: getDuplicates(
							duplicateCheckChecked,
							duplicateCheckKey,
							duplicateCheckDOI,
							v,
							duplicateCheckAbstract,
						),
					})}
			/>
			Similar author and title
		</Label>
		<Label>
			<Checkbox
				name="uniqABS"
				checked={duplicateCheckAbstract}
				onchange={(v) =>
					updateOptions({
						duplicates: getDuplicates(
							duplicateCheckChecked,
							duplicateCheckKey,
							duplicateCheckDOI,
							duplicateCheckCitation,
							v,
						),
					})}
			/>
			Similar abstracts
		</Label>
	</Option>

	<Option
		option="merge"
		checked={mergeChecked}
		onchange={(v) => updateOptions({ merge: v ? mergeValue : undefined })}
	>
		<Label>
			<Radio
				name="mergeStrategy"
				value="combine"
				checked={mergeValue === "combine"}
				onchange={() => updateOptions({ merge: "combine" })}
			/>
			<span>
				<strong>Combine</strong><br />
				<small>
					Keep original entry and merge in fields of duplicates if
					they do not already exist
				</small>
			</span>
		</Label>
		<Label>
			<Radio
				name="mergeStrategy"
				value="overwrite"
				checked={mergeValue === "overwrite"}
				onchange={() => updateOptions({ merge: "overwrite" })}
			/>
			<span>
				<strong>Overwrite</strong><br />
				<small>
					Keep original entry and merge in fields of duplicates,
					overwriting existing fields if they exist
				</small>
			</span>
		</Label>
		<Label>
			<Radio
				name="mergeStrategy"
				value="first"
				checked={mergeValue === "first"}
				onchange={() => updateOptions({ merge: "first" })}
			/>
			<span>
				<strong>First</strong><br />
				<small>Only keep the original entry</small>
			</span>
		</Label>
		<Label>
			<Radio
				name="mergeStrategy"
				value="last"
				checked={mergeValue === "last"}
				onchange={() => updateOptions({ merge: "last" })}
			/>
			<span>
				<strong>Last</strong><br />
				<small>Only keep the last found duplicate</small>
			</span>
		</Label>
	</Option>
</Collapsible>
