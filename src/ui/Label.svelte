<script lang="ts">
export let title: string | undefined = undefined;
export let inset: boolean | undefined = undefined;
</script>

<label {title} class:inset><slot /></label>

<style>
	label {
		padding: 8px 12px;
		margin: 12px 0;
		border-radius: 3px;
		display: flex;
		align-items: center;
		gap: 16px;
		cursor: pointer;
	}
	label:hover {
		background: var(--hover-bg);
		box-shadow: 0 0 0 1px var(--border-color);
	}
	label:first-of-type {
		margin-top: 4px;
	}
	label:last-child {
		margin-bottom: 0;
	}
</style>
