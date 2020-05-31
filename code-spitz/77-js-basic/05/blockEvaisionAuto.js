const looper = (n, f, ms = 5000, i = 0) => {
	let old = performance.now();

	const runner = curr => {
		while (i < n) {
			if (performance.now() - old < ms) f(i++);
			else {
				old = performance.now();
				requestAnimationFrame(runner);
				break;
			}
		}
	};
	requestAnimationFrame(runner);
};
