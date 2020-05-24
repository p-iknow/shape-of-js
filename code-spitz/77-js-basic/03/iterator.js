const iterator = {
	data: [1, 2, 3, 4],
	next() {
		return { done: this.data.length == 0, value: this.data.pop() };
	},
};
