export function getActiveMarks (state) {
	const from = state.selection.from;
	const to = state.selection.to;

	const selectionMarks = new Set();

	state.doc.nodesBetween(from, to, (node) => {
		node.marks.forEach((mark) => {
			selectionMarks.add(mark.type.name);
		});
	});

	return Array.from(selectionMarks);
}