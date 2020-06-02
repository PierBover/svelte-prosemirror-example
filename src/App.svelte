<script>
	import Editor from './Editor.svelte';
</script>

<div class="wrap">
	<Editor/>
</div>

<style>
	h1 {
		text-align: center;
		margin-top: 0;
		color: tomato;
		font-weight: normal;
	}

	:global(body) {
		margin: 0;
		font-family: sans-serif;
		background-color: #f0f0f0;
	}

	.wrap {
		width: 50rem;
		margin: 2rem auto 0 auto;
	}
</style>