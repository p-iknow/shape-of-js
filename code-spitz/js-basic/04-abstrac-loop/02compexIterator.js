const Compx = class {
  constructor(data) {
    this.data = data;
  }
  [Symbol.iterator]() {
    const data = JSON.parse(JSON.stringify(this.data));
    return {
      next() {
        let v;
        while ((v = data.shift())) {
          if (!(v instanceof Object)) return { value: v };
          if (!Array.isArray(v)) v = Object.values(v);
          data.unshift(...v);
        }
        return { done: true };
      },
    };
  }
};
const a = new Compx([{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9]);
console.log([...a]);
console.log([...a]);
