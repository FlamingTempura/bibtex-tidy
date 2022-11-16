<script lang="ts">
	export let title: string;
	export let open: boolean = false;
</script>

<details {open}>
	<summary><div class="section-title">{title}</div></summary>
	<slot />
</details>

<style>
	summary {
		font: var(--sans-title);
		font-size: 11px;
		text-transform: uppercase;
		cursor: pointer;
		user-select: none;
		padding: 8px 20px;
		margin: 16px -12px 12px;
		background: var(--header-bg);
		position: relative;
	}
	summary:hover {
		background: rgba(0, 0, 0, 0.15);
	}
	summary .section-title {
		position: absolute;
		left: 40px;
		top: 8px;
	}
</style>
