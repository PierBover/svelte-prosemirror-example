<script>
	import EditorMenu from './EditorMenu.svelte';
	import {onMount, onDestroy, createEventDispatcher} from 'svelte';
	import {writable} from 'svelte/store';
	import {getActiveMarks, getAvailableBlockTypes} from './prosemirror/index.js';

	import {DOMParser} from "prosemirror-model";
	import {schema} from 'prosemirror-schema-basic';
	import {EditorState, Plugin} from 'prosemirror-state';
	import {EditorView} from 'prosemirror-view';
	import {undo, redo, history} from 'prosemirror-history';
	import {keymap} from 'prosemirror-keymap';
	import {baseKeymap, toggleMark, setBlockType} from 'prosemirror-commands';

	const dispatch = createEventDispatcher();
	const activeMarks = writable([]);

	let prosemirrorNode, editorView, editorState;

	const onUpdatePlugin = new Plugin({
		view() {
			return {
				update (updatedView) {
					activeMarks.set(getActiveMarks(updatedView.state));
				}
			}
		}
	});

	const toggleBold = toggleMark(schema.marks.strong);
	const toggleItalics = toggleMark(schema.marks.em);
	const setBlockH1 = setBlockType(schema.nodes.heading, {level: 1});
	const setBlockH2 = setBlockType(schema.nodes.heading, {level: 2});
	const setBlockH3 = setBlockType(schema.nodes.heading, {level: 3});
	const setBlockParagraph = setBlockType(schema.nodes.paragraph);

	onMount(() => {

		editorState = EditorState.create({
			doc: DOMParser.fromSchema(schema).parse(document.querySelector("#prosemirror-content")),
			schema,
			plugins: [
				history(),
				keymap({
					'Mod-z': undo,
					'Mod-Shift-z': redo,
					'Mod-b': toggleBold,
					'Mod-i': toggleItalics,
					'Mod-Alt-0': setBlockParagraph,
					'Mod-Alt-1': setBlockH1,
					'Mod-Alt-2': setBlockH2,
					'Mod-Alt-3': setBlockH3
				}),
				keymap(baseKeymap),
				onUpdatePlugin
			]
		});

		editorView = new EditorView(prosemirrorNode, {state: editorState})
	});

	onDestroy(() => {
		editorView.destroy();
	})
</script>

<div style="display: none" id="prosemirror-content">
	<h1><strong>The Odyssey</strong></h1>
	<p><em>By Homer</em></p>
	<h2>Book I</h2>
	<p>Tell me, O muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home; but do what he might he could not save his men, for they perished through their own sheer folly in eating the cattle of the Sun-god Hyperion; so the god prevented them from ever reaching home. Tell me, too, about all these things, O daughter of Jove, from whatsoever source you may know them.</p>
	<p>So now all who escaped death in battle or by shipwreck had got safely home except Ulysses, and he, though he was longing to return to his wife and country, was detained by the goddess Calypso, who had got him into a large cave and wanted to marry him. But as years went by, there came a time when the gods settled that he should go back to Ithaca; even then, however, when he was among his own people, his troubles were not yet over; nevertheless all the gods had now begun to pity him except Neptune, who still persecuted him without ceasing and would not let him get home.</p>
</div>

<EditorMenu {toggleBold} {toggleItalics} {setBlockH1} {setBlockH2} {setBlockH3} {setBlockParagraph} {editorView} {activeMarks} />

<div id="prosemirror-editor" bind:this={prosemirrorNode}></div>

<style>
	#prosemirror-editor {
		background-color: white;
	}

	:global(#prosemirror-editor .ProseMirror) {
		color: #444;
		min-height: 20rem;
		padding: 2rem;
		outline: none;
		font-size: 1.2rem;
		font-family: 'Georgia', serif;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	:global(#prosemirror-editor .ProseMirror h1, #prosemirror-editor .ProseMirror h2, #prosemirror-editor .ProseMirror h3) {
		font-weight: normal;
	}
</style>