const looper = (n, f, slice = 3) => {
	let limit = 0;
	let i = 0;
	const runner = () => {
		while (i < n) {
			if (limit++ < slice) f(i++);
			else {
				limit = 0;
				requestAnimationFrame(runner);
				break;
			}
		}
	};
	requestAnimationFrame(runner);
};
