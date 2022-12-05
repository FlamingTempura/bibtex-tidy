<div class="suboptions"><slot /></div>

<style>
	.suboptions {
		margin: 0px 0 28px 45px;
	}
	.suboptions:last-child {
		margin-bottom: 0;
	}
	.suboptions :global(textarea) {
		resize: vertical;
		width: 100%;
		height: 100px;
	}
	.suboptions :global(input[type='number']) {
		display: inline-block;
		width: 62px;
	}
</style>
