<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";

let {
	checked = false,
	onchange,
	value,
	...props
}: Omit<HTMLInputAttributes, "type" | "checked" | "onchange"> & {
	checked?: boolean;
	onchange?: (value: string) => void;
} = $props();
</script>

<input
	{...props}
	type="radio"
	{value}
	{checked}
	onchange={(event) => {
		if (event.currentTarget.checked) {
			onchange?.(String(value ?? ""));
		}
	}}
/>

<style>
	input {
		appearance: none;
		-webkit-appearance: none;
		background: transparent;
		margin: 0;
		border: 2px solid var(--light6);
		border-radius: 50%;
		width: 17px;
		height: 17px;
		&:checked {
			border-color: var(--light-blue);
			background: var(--light-blue);
			box-shadow: inset 0 0 0 3.3px var(--main-bg);
		}
	}
</style>
