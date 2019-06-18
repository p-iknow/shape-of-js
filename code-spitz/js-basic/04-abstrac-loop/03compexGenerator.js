const Compx = class {
  constructor(data) {
    this.data = data;
  }
  *gene() {
    const data = JSON.parse(JSON.stringify(this.data));
    let v;
    while ((v = data.shift())) {
      if (!(v instanceof Object)) yield v;
      else {
        if (!Array.isArray(v)) v = Object.values(v);
        data.unshift(...v);
      }
    }
  }
};
const a = new Compx([{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9]);
const b = a.gene();
console.log(b);
