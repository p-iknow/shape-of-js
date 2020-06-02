const loop = function*(n, f, slice = 3) {
	let i = 0;
	let limit = 0;
	while (i < n) {
		if (limit++ < slice) f(i++);
		else {
			limit = 0;
			yield;
		}
	}
};

const executor = iter => {
	const runner = () => {
		if (!iter.next().done) {
			requestAnimationFrame(runner);
		}
	};
	requestAnimationFrame(runner);
};

executor(loop(10, console.log));
