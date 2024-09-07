<script lang="ts">
export let name: string | undefined;
export let group: string;
export let value: string | undefined = undefined;
</script>

<input type="radio" {name} {value} bind:group />

<style>
	input {
		appearance: none;
		-webkit-appearance: none;
		background: transparent;
		margin: 0;
		border: 2px solid var(--light6);
		border-radius: 8.5px;
		width: 17px;
		height: 17px;
		position: relative;
		flex: 0 0 17px;
	}
	input:checked {
		border-color: var(--light-blue);
		background: transparent;
	}
	input:checked:after {
		content: '';
		position: absolute;
		background: var(--light-blue);
		width: 7px;
		height: 7px;
		left: 3px;
		top: 3px;
		border-radius: 10px;
	}
</style>
