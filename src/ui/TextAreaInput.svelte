<script lang="ts">
import type { HTMLTextareaAttributes } from "svelte/elements";

type Props = Omit<HTMLTextareaAttributes, "value" | "oninput"> & {
	value?: string;
	oninput?: (value: string) => void;
};

let { value = "", oninput, ...props }: Props = $props();
</script>

<textarea
	{...props}
	{value}
	oninput={(event) => oninput?.(event.currentTarget.value)}
></textarea>

<style>
	textarea {
		margin-top: 4px;
		line-height: 1.4em;
		resize: vertical;
		width: 100%;
		height: 100px;
	}
</style>