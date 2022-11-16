<script lang="ts">
	export let title: string | undefined = undefined;
</script>

<label {title}><slot /></label>

<style>
	label {
		display: block;
		margin: 8px 0;
		padding-left: 28px;
		position: relative;
		width: 100%;
	}
</style>
