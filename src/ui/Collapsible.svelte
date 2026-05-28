<script lang="ts">
import type { Snippet } from "svelte";

type Props = {
	children?: Snippet;
	open?: boolean;
	title: string;
};

let { children, open = false, title }: Props = $props();
</script>

<details {open}>
	<summary>{title}</summary>
	{@render children?.()}
</details>

<style>
	details {
		&[open] {
			padding-bottom: 20px;
			summary {
				&::after {
					content: none;
				}
				&:hover::after {
					content: "▼";
				}
			}
		}
		&:not([open]) summary {
			padding-bottom: 20px;
		}
		summary {
			font: var(--sans-h2);
			margin: 0 -20px;
			cursor: pointer;
			user-select: none;
			padding: 20px 20px 12px 20px;
			border-top: 1px solid var(--border-color);
			display: flex;
			gap: 8px;
			align-items: center;
			&::-webkit-details-marker {
				/* safari */
				display: none;
			}
			&::marker {
				content: none;
			}
			&::after {
				content: "►";
				font-size: 8px;
				color: rgba(255, 255, 255, 0.6);
			}
		}
	}
</style>
