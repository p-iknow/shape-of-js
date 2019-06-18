const iterator = {
  [Symbol.iterator]() {
    return this;
  },
  data: [{ a: 7, b: '-' }, [5, 6, 7], 8, 9],
  next() {
    let v;
    while ((v = this.data.shift())) {
      switch (true) {
        case Array.isArray(v):
          this.data.unshift(...v);
          break;
        case v && typeof v == 'object':
          for (var k in v) this.data.unshift(v[k]);
          break;
        default:
          return { value: v, done: false };
      }
    }
    return { done: true };
  },
};

a = iterator.next();

console.log(a);
