const Operator = class {
	static factory(v) {
		if (v instanceof Object) {
			if (!Array.isArray(v)) v = Object.values(v);
			return new ArrayOp(v.map(v => Operator.factory(v)));
		} else {
			return typeof v == 'string' ? new StringOp(v) : new PrimeOp(v);
		}
	}

	constructor(v) {
		this.v = v;
	}

	operation(f) {
		throw 'override';
	}
};

const StringOp = class extends Operator {
	constructor(v) {
		super(v);
	}

	operation(f) {
		for (const v of this.v) {
			f(v);
		}
	}
};

const PrimeOp = class extends Operator {
	constructor(v) {
		super(v);
	}

	operation(f) {
		f(this.v);
	}
};

const ArrayOp = class extends Operator {
	constructor(v) {
		super(v);
	}

	operation(f) {
		for (const v of this.v) {
			v.operation(f);
		}
	}
};

Operator.factory([1, 2, 3, { a: 'abc', b: 5 }, 6, 7]).operation(console.log);
