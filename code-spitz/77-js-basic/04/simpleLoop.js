const simpleLoop = {
	[Symbol.iterator]() {
		return this;
	},
	data: [1, 2, 3, 4, 5],
	next() {
		return {
			done: this.data.length === 0,
			value: this.data.shift(),
		};
	},
};
