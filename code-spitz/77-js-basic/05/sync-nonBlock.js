const sum = n => {
	const result = { isComplete: false };
	requestAnimationFrame(() => {
		let sum = 0;
		for (let i = 1; i <= n; i++) {
			sum += 1;
		}
		result.isComplete = true;
		result.value = sum;
	});
	return result;
};

const result = sum(100);
const checker = () => {
	requestAnimationFrame(() => {
		if (result.isComplete) {
			console.log(result.value);
		} else {
			checker();
		}
	});
};

checker();
