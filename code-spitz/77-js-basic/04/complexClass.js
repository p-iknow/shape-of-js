const Complex = class {
	constructor(data) {
		this.data = data;
	}
	[Symbol.iterator]() {
		// 깊은 복사를 하는 방법, parsing 을 C 코드가 하기 때문에 빠름
		const data = [JSON.parse(JSON.stringify(this.data))];
		return {
			next() {
				let v;
				while ((v = data.shift())) {
					// Primitive 인 값들
					// property를 기술하지 않으면 undefined 기 때문에 falsy 한 값으로 done 은 true 가 됨
					if (!v || !(v instanceof Object)) return { value: v };
					// 객체 중에 배열이 아닌 경우 -> objsect
					if (!Array.isArray(v)) v = Object.values(v);
					// 객체값도 배열로 변형되어 배열로 떨어지게됨
					// 나머지는 배열
					data.unshift(...v);
				}
				return { done: true };
			},
		};
	}
};

const a = new Complex([{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9]);
console.log([...a]);
console.log([...a]);

const ComplexGenerator = class {
	constructor(data) {
		this.data = data;
	}
	*gene() {
		const data = JSON.parse(JSON.stringify(this.data));
		let v;
		while ((v = data.shift())) {
			// mandatory 를 더 잘 표현한 코드
			if (!(v instanceof Object)) yield v;
			else {
				if (!Array.isArray(v)) v = Object.values(v);
				data.unshift(...v);
			}
		}
	}
};

const b = new ComplexGenerator([{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9]);
console.log([...b.gene()]);
