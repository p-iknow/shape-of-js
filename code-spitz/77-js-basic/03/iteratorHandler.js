// 직접 iterator 반복처리기를 구현해보자.

const loop = (iterable, f) => {
	// iterable 검증
	if (!(typeof iterable[Symbol.iterator] === 'function')) return;

	// iterator 검증
	const iterator = iterable[Symbol.iterator]();
	if (typeof iterator?.next != 'function') return;

	do {
		const v = iterator.next();
		if (v.done) return; // 종료 처리
		f(v.value); // 현재 값을 전달해서 함수 실행
	} while (true);
};

const iterable = {
	arr: [1, 2, 3, 4],
	[Symbol.iterator]() {
		return this;
	},
	next() {
		return {
			done: this.arr.length == 0,
			value: this.arr.pop(),
		};
	},
};

loop(iterable, console.log);
