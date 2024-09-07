<script lang="ts">
import { createEventDispatcher } from "svelte";

export let name: string | undefined;
export let checked: boolean | undefined = undefined;

const dispatch = createEventDispatcher<{ change: undefined }>();
</script>

<input
	type="checkbox"
	{name}
	bind:checked
	on:change={() => dispatch("change")}
/>

<style>
	input {
		appearance: none;
		-webkit-appearance: none;
		background: transparent;
		margin: 0;
		border: 2px solid var(--light6);
		border-radius: 3px;
		width: 17px;
		height: 17px;
		position: relative;
	}
	input:checked {
		border-color: var(--light-blue);
		background: var(--light-blue);
	}
	input:checked:before,
	input:checked:after {
		content: "";
		position: absolute;
		background: var(--main-bg);
		width: 2px;
	}
	input:checked:before {
		height: 11px;
		left: 7px;
		top: 1px;
		transform: rotate(45deg);
	}
	input:checked:after {
		height: 5px;
		left: 2px;
		top: 5px;
		transform: rotate(-45deg);
	}
</style>
