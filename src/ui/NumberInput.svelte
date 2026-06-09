<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";

type Props = Omit<HTMLInputAttributes, "type" | "value" | "oninput"> & {
	value?: number;
	oninput?: (value: number) => void;
};

let { value = 0, oninput, ...props }: Props = $props();
</script>

<input
    {...props}
    type="number"
    {value}
    oninput={(event) => oninput?.(Number(event.currentTarget.value))}
/>

<style>
    input[type="number"] {
        -moz-appearance: textfield;
        margin-left: 8px;
        display: inline-block;
        width: 62px;
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }
</style>
