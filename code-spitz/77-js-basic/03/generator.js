const generator = function*(max) {
	let cursor = 0;
	while (cursor < max) {
		yield cursor * cursor;
		cursor++;
	}
};
