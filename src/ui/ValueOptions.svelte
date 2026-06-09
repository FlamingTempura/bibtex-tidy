<script lang="ts">
import type { OptionsNormalized } from "../optionUtils.ts";
import Checkbox from "./Checkbox.svelte";
import Collapsible from "./Collapsible.svelte";
import Label from "./Label.svelte";
import NumberInput from "./NumberInput.svelte";
import Option from "./Option.svelte";
import TextAreaInput from "./TextAreaInput.svelte";

type Props = {
	options: OptionsNormalized;
	onchange?: (options: OptionsNormalized) => void;
};

let { options, onchange }: Props = $props();

let curly = $derived(options.curly ?? false);
let stripEnclosingBraces = $derived(options.stripEnclosingBraces ?? false);
let numeric = $derived(options.numeric ?? false);
let months = $derived(options.months ?? false);
let dropAllCaps = $derived(options.dropAllCaps ?? false);
let enableEscape = $derived(
	options.escape !== undefined && options.escape !== false,
);
let legacyEscape = $derived(options.escape === true);
let encodeUrls = $derived(options.encodeUrls ?? false);
let removeEmptyFields = $derived(options.removeEmptyFields ?? false);
let removeDuplicateFields = $derived(options.removeDuplicateFields ?? false);

let maxAuthorsChecked = $derived(options.maxAuthors !== undefined);
let maxAuthorsValue = $derived(options.maxAuthors ?? 3);

let enclosingBracesChecked = $derived(
	options.enclosingBraces !== undefined && options.enclosingBraces.length > 0,
);
let enclosingBracesValue = $derived(
	options.enclosingBraces?.join(" ") ?? "title",
);

let removeBracesChecked = $derived(
	options.removeBraces !== undefined && options.removeBraces.length > 0,
);
let removeBracesValue = $derived(options.removeBraces?.join(" ") ?? "title");

const updateOptions = (changes: Partial<OptionsNormalized>): void => {
	onchange?.({ ...options, ...changes });
};

const splitFields = (checked: boolean, value: string): string[] | undefined =>
	checked && value.length > 0 ? value.split(/[\n\t ,]+/) : undefined;
</script>

<Collapsible open={true} title="Values">
	<div id="valueOptions"></div>

	<Option
		option="curly"
		checked={curly}
		onchange={(v) => updateOptions({ curly: v })}
	/>

	<Option
		option="enclosingBraces"
		checked={enclosingBracesChecked}
		onchange={(v) =>
			updateOptions({ enclosingBraces: splitFields(v, enclosingBracesValue) })}
	>
		<label>
			Fields to enclose in double braces:
			<TextAreaInput
				name="enclosingBracesList"
				spellcheck="false"
				value={enclosingBracesValue}
				oninput={(v) =>
					updateOptions({
						enclosingBraces: splitFields(enclosingBracesChecked, v),
					})}
			/>
		</label>
		<p>
			Space delimited, e.g: <code>title journal</code>.
		</p>
	</Option>

	<Option
		option="removeBraces"
		checked={removeBracesChecked}
		onchange={(v) => updateOptions({ removeBraces: splitFields(v, removeBracesValue) })}
	>
		<label>
			Remove braces from values of these fields:
			<TextAreaInput
				name="removeBracesList"
				spellcheck="false"
				value={removeBracesValue}
				oninput={(v) =>
					updateOptions({ removeBraces: splitFields(removeBracesChecked, v) })}
			/>
		</label>
		<p>Space delimited, e.g: <code>title journal</code>.</p>
	</Option>

	<Option
		option="stripEnclosingBraces"
		checked={stripEnclosingBraces}
		onchange={(v) => updateOptions({ stripEnclosingBraces: v })}
	/>

	<Option
		option="numeric"
		checked={numeric}
		onchange={(v) => updateOptions({ numeric: v })}
	/>

	<Option
		option="months"
		checked={months}
		onchange={(v) => updateOptions({ months: v })}
	/>

	<Option
		option="dropAllCaps"
		checked={dropAllCaps}
		onchange={(v) => updateOptions({ dropAllCaps: v })}
	/>

	<Option
		option="escape"
		checked={enableEscape}
		onchange={(v) =>
			updateOptions({ escape: v ? (legacyEscape ? true : "new") : false })}
	>
		<Label
			title="Use the old escape behavior, which may emit macros that require external LaTeX packages instead of leaving unsupported Unicode unchanged with warnings. New mode will become the default in v2; please raise a GitHub issue if you still need legacy behavior."
			inset
		>
			<Checkbox
				name="escapeLegacy"
				checked={legacyEscape}
				onchange={(v) => updateOptions({ escape: v ? true : "new" })}
			/>
			Use legacy package-dependent macros
		</Label>
	</Option>

	<Option
		option="encodeUrls"
		checked={encodeUrls}
		onchange={(v) => updateOptions({ encodeUrls: v })}
	/>

	<Option
		option="removeEmptyFields"
		checked={removeEmptyFields}
		onchange={(v) => updateOptions({ removeEmptyFields: v })}
	/>

	<Option
		option="removeDuplicateFields"
		checked={removeDuplicateFields}
		onchange={(v) => updateOptions({ removeDuplicateFields: v })}
	/>

	<Option
		option="maxAuthors"
		checked={maxAuthorsChecked}
		onchange={(v) => updateOptions({ maxAuthors: v ? maxAuthorsValue : undefined })}
	>
		<label>
			Maximum number of authors:
			<NumberInput
				name="maxAuthorsNum"
				value={maxAuthorsValue}
				oninput={(v) => updateOptions({ maxAuthors: v })}
			/>
		</label>
		<p>Author lists longer than this will be truncated to "and others".</p>
	</Option>
</Collapsible>
