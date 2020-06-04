const sum = v => {
	let prev = 0;
	while (v > 1) {
		prev += v;
		v--;
	}
	return prev;
};
