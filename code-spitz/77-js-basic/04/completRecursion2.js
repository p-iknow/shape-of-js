const complexRecursion2 = {
	[Symbol.iterator]() {
		return this;
	},
	data: [{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9],
	next() {
		let v;
		while ((v = this.data.shift())) {
			// Primitive 인 값들
			// property를 기술하지 않으면 undefined 기 때문에 falsy 한 값으로 done 은 true 가 됨
			if (!v || !(v instanceof Object)) return { value: v };
			// 객체 중에 배열이 아닌 경우 -> objsect
			if (!Array.isArray(v)) v = Object.values(v);
			// 객체값도 배열로 변형되어 배열로 떨어지게됨
			// 나머지는 배열
			this.data.unshift(...v);
		}
		return { done: true };
	},
};

console.log([...complexRecursion2]);
