<script lang="ts">
import type { OptionsNormalized } from "../optionUtils";
import Collapsible from "./Collapsible.svelte";
import Option from "./Option.svelte";

export let options: OptionsNormalized;

let curly = options.curly ?? false;
let stripEnclosingBraces = options.stripEnclosingBraces ?? false;
let numeric = options.numeric ?? false;
let months = options.months ?? false;
let dropAllCaps = options.dropAllCaps ?? false;
let enableEscape = options.escape ?? false;
let encodeUrls = options.encodeUrls ?? false;
let removeEmptyFields = options.removeEmptyFields ?? false;
let removeDuplicateFields = options.removeDuplicateFields ?? false;

let maxAuthorsChecked = options.maxAuthors !== undefined;
let maxAuthorsValue = options.maxAuthors ?? 3;

let enclosingBracesChecked =
	options.enclosingBraces !== undefined && options.enclosingBraces.length > 0;
let enclosingBracesValue = options.enclosingBraces?.join(" ") ?? "title";

let removeBracesChecked =
	options.removeBraces !== undefined && options.removeBraces.length > 0;
let removeBracesValue = options.enclosingBraces?.join(" ") ?? "title";

$: {
	options.curly = curly;
	options.stripEnclosingBraces = stripEnclosingBraces;
	options.numeric = numeric;
	options.months = months;
	options.dropAllCaps = dropAllCaps;
	options.escape = enableEscape;
	options.encodeUrls = encodeUrls;
	options.removeEmptyFields = removeEmptyFields;
	options.removeDuplicateFields = removeDuplicateFields;
	options.maxAuthors = maxAuthorsChecked ? maxAuthorsValue : undefined;
	options.enclosingBraces =
		enclosingBracesChecked && enclosingBracesValue.length > 0
			? enclosingBracesValue.split(/[\n\t ,]+/)
			: undefined;
	options.removeBraces =
		removeBracesChecked && removeBracesValue.length > 0
			? removeBracesValue.split(/[\n\t ,]+/)
			: undefined;
}
</script>

<Collapsible open={true} title="Values">
	<div id="valueOptions" />

	<Option option="curly" bind:checked={curly} />

	<Option option="enclosingBraces" bind:checked={enclosingBracesChecked}>
		<label>
			Fields to enclose in double braces:
			<textarea
				name="enclosingBracesList"
				spellcheck="false"
				bind:value={enclosingBracesValue}
			/>
		</label>
		<p>
			Space delimited, e.g: <code>title journal</code>.
		</p>
	</Option>

	<Option option="removeBraces" bind:checked={removeBracesChecked}>
		<label>
			Remove braces from values of these fields:
			<textarea
				name="removeBracesList"
				spellcheck="false"
				bind:value={removeBracesValue}
			/>
		</label>
		<p>Space delimited, e.g: <code>title journal</code>.</p>
	</Option>

	<Option option="stripEnclosingBraces" bind:checked={stripEnclosingBraces} />

	<Option option="numeric" bind:checked={numeric} />

	<Option option="months" bind:checked={months} />

	<Option option="dropAllCaps" bind:checked={dropAllCaps} />

	<Option option="escape" bind:checked={enableEscape} />

	<Option option="encodeUrls" bind:checked={encodeUrls} />

	<Option option="removeEmptyFields" bind:checked={removeEmptyFields} />

	<Option option="removeDuplicateFields" bind:checked={removeDuplicateFields} />

	<Option option="maxAuthors" bind:checked={maxAuthorsChecked}>
		<label>
			Maximum number of authors:
			<input name="maxAuthorsNum" type="number" bind:value={maxAuthorsValue} />
		</label>
		<p>Author lists longer than this will be truncated to "and others".</p>
	</Option>
</Collapsible>
