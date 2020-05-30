const odd = function*(data) {
	for (const v of data) {
		console.log('odd', odd.cnt++);
		if (Math.abs(v) % 2) yield v;
	}
	odd.cnt = 0;
};
odd.cnt = 0;

for (const v of odd([1, 2, 3, 4])) console.log(v);

const take = function*(data, n) {
	for (const v of data) {
		console.log('take', take.cnt++);
		if (n--) yield v;
		else break;
	}
};

const oddRes = odd([1, 2, 3, 4]);

take.cnt = 0;
for (const v of take([1, 2, 3, 4], 2)) console.log(v);
