const sum = (v, prev = 0) => {
	prev += v;
	return v > 1 ? sum(v - 1, prev) : prev;
};
