const looper = (n, f) => {
	for (let i = 0; i < n; i++) {
		f(i);
	}
};

looper(10, console.log);
// blocking 이 되버림
looper(10000, console.log);
