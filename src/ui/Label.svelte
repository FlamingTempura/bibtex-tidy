<script lang="ts">
import type { Snippet } from "svelte";

type Props = {
	children?: Snippet;
	inset?: boolean;
	title?: string;
};

let { children, inset, title }: Props = $props();
</script>

<label {title} class:inset>{@render children?.()}</label>

<style>
	label {
		padding: 8px 12px;
		margin: 12px 0;
		border-radius: 3px;
		display: flex;
		align-items: center;
		gap: 16px;
		cursor: pointer;
		&:hover {
			background: var(--hover-bg);
			box-shadow: 0 0 0 1px var(--border-color);
		}
		&:first-of-type {
			margin-top: 4px;
		}
		&:last-child {
			margin-bottom: 0;
		}
	}
</style>
