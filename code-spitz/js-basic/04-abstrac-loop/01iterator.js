const iterator = {
  [Symbol.iterator]() {
    return this;
  },
  data: [{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9],
  next() {
    let v;
    while ((v = this.data.shift())) {
      if (!(v instanceof Object)) return { value: v };
      if (!Array.isArray(v)) v = Object.values(v);
      this.data.unshift(...v);
    }
    return { done: true };
  },
};
