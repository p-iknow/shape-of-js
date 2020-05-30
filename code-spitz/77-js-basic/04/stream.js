const Stream = class {
	static get(v) {
		return new Stream(v);
	}
	constructor(v) {
		this.v = v;
		this.filters = [];
	}
	add(gene, ...arg) {
		this.filters.push(v => gene(v, ...arg));
		return this;
	}
	*gene() {
		let v = this.v;
		for (const f of this.filters) v = f(v);
		yield* v;
	}
};

const odd = function*(data) {
	for (const v of data) {
		if (Math.abs(v) % 2) yield v;
	}
};

const take = function*(data, n) {
	for (const v of data) {
		if (n--) yield v;
		else break;
	}
};

for (const v of Stream.get([1, 2, 3, 4])
	.add(odd)
	.add(take, 2)
	.gene()) {
	console.log(v);
}
