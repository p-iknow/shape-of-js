const N2 = class {
	constructor(max) {
		// 배열이 무한 배열이 되는 것을 막기 위한 제어 장치
		this.max = max;
	}
	[Symbol.iterator]() {
		let cursor = 0;
		let max = this.max;
		return {
			done: false,
			next() {
				// 안에서 cursor 와 max는 free variable
				if (cursor > max) {
					this.done = true;
				} else {
					this.value = cursor * cursor;
					cursor++;
				}
				return this;
			},
		};
	}
};

console.log([...new N2(5)]);
// Array(6) [0, 1, 4, 9, 16, 25]
for (const v of new N2(5)) {
	console.log(v);
}
// 0
// 1
// 4
// 9
// 16
// 25
