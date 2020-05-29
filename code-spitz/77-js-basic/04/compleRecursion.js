const complexRecursion1 = {
	[Symbol.iterator]() {
		return this;
	},
	data: [{ a: 3, b: '-' }, [5, 6, 7], 8, 9],
	next() {
		let v;
		while ((v = this.data.shift())) {
			switch (true) {
				case Array.isArray(v):
					this.data.unshift(...v);
					break;
				case v && typeof v == 'object':
					for (let k in v) {
						this.data.unshift(v[k]);
					}
					break;
				default:
					return { value: v, done: false };
			}
		}
		return { done: true };
	},
};
console.log([...complexRecursion1]);

const complexRecursion2 = {
	[Symbol.iterator]() {
		return this;
	},
	data: [{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9],
	next() {
		let v;
		let temp = [];
		while ((v = this.data.shift())) {
			switch (true) {
				case Array.isArray(v):
					this.data.unshift(...v);
					break;
				case v && typeof v == 'object':
					for (let k in v) {
						temp.push(v[k]);
					}
					this.data.unshift(...temp);
					temp = [];
					break;
				default:
					return { value: v, done: false };
			}
		}
		return { done: true };
	},
};

console.log([...complexRecursion2]);
