const sum = (n, f) => {
	requestAnimationFrame(_ => {
		let sum = 0;
		for (let 1 = 1; i <= n; i++) {
			sum += i;
		}
		f(sum);
	})
}
sum(10, console.log);
console.log(123);

// 123 -> 55
