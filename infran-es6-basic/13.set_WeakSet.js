// Weakeset

const s = new WeakSet() // 참조카운트를 증가시키지 않음

// 참조 카운트가 뭐지?
let o = {}; // 이 객체는 o 라는 메모리에 직접할당 되어있나? 아니다. 객체는 별도로 만들고 o에 주소값을 할당 
// 그래서 참조카운트는 ? o가 {} 요런 객체를 참조합니다. -> 참조카운트가 1이 되었어요.

let o2 = o; // o2도 {} 객체를 참조합니다. -> 참조카운트가 2가 되었어요.

let o2 = null // o2가 더 이상  {}객체를 참조하지 않네요. 참조카운트가 1이 되었어요. 

let o = null // o가 더 이상 {}객체를 참조하지 않네요. 참조카운트가 0이 되었어요. 

// 이제  {}는 아무도 참조 하지 않는 객체가 되었어요. -> Garbage Collector의 수거 대상이 되었어요.


weakset.keys()
weakset.values()
weakset.entries()
weakset.size()
x.forEach()
for (x of weakset)
