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
		while ((v = this.data.shift())) {
			switch (true) {
				case Array.isArray(v):
					this.data.unshift(...v);
					break;
				case v && typeof v == 'object':
					// for in을 그냥 쓰면 Object 객체가 가지고 있는 내장 프로퍼티가 함께 딸려나온다.
					// hasOwnProperty를 써서 검사를 하던지 아니면 Object.values 를 써서 추출한다.
					//for (let k in v) {
					//	if (v.hasOwnProperty(k)) temp.push(v[k]);
					//}
					this.data.unshift(...Object.values(v));
					break;
				default:
					return { value: v, done: false };
			}
		}
		return { done: true };
	},
};

console.log([...complexRecursion2]);
