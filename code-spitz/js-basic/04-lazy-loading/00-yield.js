const odd = function*(data) {
  for (const v of data) {
    console.log('odd', odd.cnt++);
    if (v % 2) yield v;
  }
};
odd.cnt = 0;
// for (const v of odd([1, 2, 3, 4])) console.log(v);

let a = odd([1, 2, 3, 4]);
console.log(a);
