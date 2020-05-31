const sum = (n, f) => {
	let sum = 0;
	for (let i = 1; i <= n; i++) {
		sum += i;
	}
	return f(sum);
};

sum(10, console.log);
console.log(124);
// 55 -> 123
