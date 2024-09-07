<script lang="ts">
export let title: string;
export let open = false;
</script>

<details {open}>
	<summary>{title}</summary>
	<slot />
</details>

<style>
	details[open] {
		padding-bottom: 20px;
	}
	details:not([open]) summary {
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
	}
	summary::-webkit-details-marker {
		/* safari */
		display: none;
	}
	summary::marker {
		content: none;
	}
	summary::after {
		content: '►';
		font-size: 8px;
		color: rgba(255, 255, 255, 0.6);
	}
	details[open] summary:after {
		content: none;
	}
	details[open] summary:hover:after {
		content: '▼';
	}
</style>
