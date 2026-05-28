<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";

let {
	group = $bindable<string | undefined>(),
	value,
	...props
}: Omit<HTMLInputAttributes, "type"> = $props();
</script>

<input {...props} type="radio" {value} bind:group />

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
		&:checked {
			border-color: var(--light-blue);
			background: transparent;
			&::after {
				content: "";
				position: absolute;
				background: var(--light-blue);
				width: 7px;
				height: 7px;
				left: 3px;
				top: 3px;
				border-radius: 10px;
			}
		}
	}
</style>
