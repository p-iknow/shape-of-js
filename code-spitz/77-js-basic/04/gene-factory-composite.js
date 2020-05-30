const Operator = class {
	static factory(v) {
		if (v instanceof Object) {
			if (!Array.isArray(v)) {
				v = Object.values(v);
			}
			return new ArrayOp(v.map(v => Operator.factory(v)));
		} else {
			return new PrimeOp(v);
		}
	}

	constructor(v) {
		this.v = v;
	}

	*genOperate() {
		throw 'overrid';
	}
};

const PrimeOp = class extends Operator {
	constructor(v) {
		super(v);
	}
	*genOperate() {
		yield this.v;
	}
};

const ArrayOp = class extends Operator {
	constructor(v) {
		super(v);
	}
	*genOperate() {
		for (const v of this.v) {
			// 위임 yield* 문법, * 나온 다음의 iterator 가 모두 해소된 뒤에 다음으로 넘어간다
			yield* v.genOperate();
		}
	}
};

for (const v of Operator.factory([1, 2, 3, { a: 4, b: 5 }, 6, 7]).genOperate())
	console.log(v);
