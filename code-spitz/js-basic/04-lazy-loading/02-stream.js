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
  let n = 0;
  for (const v of data) {
    console.log('odd', n++);
    if (v % 2) yield v;
  }
};
const take = function*(data, n) {
  let c = 0;
  for (const v of data) {
    console.log('take', c++);
    if (n--) yield v;
    else break;
  }
};

// const a = Stream.get([1, 2, 3, 4]).add(odd);
for (const v of Stream.get([1, 2, 3, 4])
  .add(odd)
  .add(take, 2)
  .gene())
  console.log(v);
