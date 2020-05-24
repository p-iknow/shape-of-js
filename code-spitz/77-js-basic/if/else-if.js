const c = 3;

if (c === 3) {
	console.log(3);
} else if (c === 2) {
	console.log(2);
} else if (c === 1) {
	console.log(1);
}

if (c === 3) {
	console.log(3);
} else {
	if (c === 2) {
		console.log(2);
	} else {
		if (c === 1) {
			console.log(1);
		}
	}
}
