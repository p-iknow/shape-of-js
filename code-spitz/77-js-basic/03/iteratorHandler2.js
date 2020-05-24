const loop = (iter, f) => {
	//Iterable이라면 Iterator를 얻음
	if (typeof iter[Symbol.iterator] == 'function') {
		iter = iter[Symbol.iterator]();
	}
	//IteratorObject가 아니라면 건너뜀
	if (typeof iter?.next != 'function') return;

	do {
		const v = iter.next();
		if (v.done) return; //종료처리
		f(v.value); //현재 값을 전달함
	} while (true);
};
const iter = {
	arr: [1, 2, 3, 4],
	[Symbol.iterator]() {
		return this;
	},
	next() {
		return { done: this.arr.length == 0, value: this.arr.pop() };
	},
};
loop(iter, console.log);
//4 //3 //2 //1
