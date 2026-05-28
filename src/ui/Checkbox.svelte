<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";

let { checked = $bindable(), ...props }: HTMLInputAttributes = $props();
</script>

<input type="checkbox" bind:checked {...props} />

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

		&:checked {
			border-color: var(--light-blue);
			background: var(--light-blue);

			&:before,
			&:after {
				content: "";
				position: absolute;
				background: var(--main-bg);
				width: 2px;
			}

			&:before {
				height: 11px;
				left: 7px;
				top: 1px;
				transform: rotate(45deg);
			}

			&:after {
				height: 5px;
				left: 2px;
				top: 5px;
				transform: rotate(-45deg);
			}
		}
	}
</style>
