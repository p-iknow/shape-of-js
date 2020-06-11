const Test = (() => {
	const field1 = Symbol(),
		field2 = Symbol(),
		method1 = Symbol();
	return class {
		constructor(a, b) {
			this[field1] = a;
			this[field2] = b;
		}
		action(a) {
			this[method]();
			this[field1] = a;
		}
	};
})();

const Test2 = (() => {
	const prop = new WeakMap();
	return class {
		constructor(a, b) {
			const p = prop.set(this, {});
			p.a = a;
			p.b = b;
		}
		action(a) {
			const p = prop.get(this);
			p.a = a;
		}
	};
})();
