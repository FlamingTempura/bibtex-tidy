<script lang="ts">
import type { Snippet } from "svelte";

type Props = {
	children?: Snippet;
};

let { children }: Props = $props();
</script>

<div class="suboptions">{@render children?.()}</div>

<style>
	.suboptions {
		margin: 0px 0 28px 45px;
		&:last-child {
			margin-bottom: 0;
		}
	}
</style>
