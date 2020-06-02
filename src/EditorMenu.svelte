<script>
	export let toggleBold, toggleItalics, setBlockH1, setBlockH2, setBlockH3, setBlockParagraph, editorView, activeMarks;

	function handler (callback) {
		callback(editorView.state, editorView.dispatch);
	}
</script>

<div id="Menu">
	<div class="button" class:active={$activeMarks.find((mark) => mark === 'strong')} on:mousedown|preventDefault={handler(toggleBold)}>Bold</div>
	<div class="button" class:active={$activeMarks.find((mark) => mark === 'em')} on:mousedown|preventDefault={handler(toggleItalics)}><em>italics</em></div>
	<div class="button" on:mousedown|preventDefault={handler(setBlockH1)}>H1</div>
	<div class="button" on:mousedown|preventDefault={handler(setBlockH2)}>H2</div>
	<div class="button" on:mousedown|preventDefault={handler(setBlockH3)}>H3</div>
	<div class="button" on:mousedown|preventDefault={handler(setBlockParagraph)}>P</div>
</div>

<style>
	#Menu {
		padding: .5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #aaa;
	}

	.button {
		padding: .5rem 1rem;
		margin-right: .5rem;
		border-radius: .3rem;
		cursor: pointer;
		background-color: white;
		transition: all .15s;
	}

	.active {
		color: white;
		background-color: #444;
	}

	.button:hover {
	}

	.button .disabled {
		pointer-events: none;
		color: #aaa;
	}
</style>