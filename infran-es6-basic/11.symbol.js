const x = () => {
  const a = Symbol('a');
  return {
    [a]: 10,
  };
};

const y = x();

y[Symbol(a)]; // 로 접급하면 ReferenceError 뜸
y[Symbol('a')]; //로도 접근안됨
// y를 조회하면 값이 뻔하게 보이지만 접근은 불가


가능한 접근은 a라는 변수에 접근 가능해야함
접근을 가능하게 하기 위해 라는 변수를 담아 함께 리턴
const x = () => {
  const a = Symbol('a');
  return {
    [a]: 10,
    a,
  };
};
y.a // Symbol(a), 접근 가능, 

a라는 변수를 제공하지 않으면, 10에 접근이 불가능하므로 프로퍼티 은닉화 성공 

그러나 우회로가 있음 
const keyArr = Reflect.ownKeys(y)
const bypass = keyArr[1];
y[bypass]  //  10

런타임 환경의 코드에서  Reflect.ownkeys를 써서 접근하는 것은 사실상 어려움
그러므로 은닉화에 성공했다고 보는편임 



// 아래처럼 만들면 누구도 접근할 수 없는 프로퍼티가 생성됨
const obj = {
  [Symbon('a')]: 1
}
// 의미없는 은닉화
obj


// 공유 심볼
Symbol() // 매번 새로운 값을 만들고, 이 값을 정확히 알아야만 접근 가능함
Symbol.for() 
// 인자로 문자열을 반드시 입력해야 하며 없으면 undefined 

const a = Symbol.for("abc"); //식별시에 for 함수의 인자로 전달된 인자값으로 식별함
const b = Symbol.for("abc"); //Symbol.for()로 생성된 심볼들이  모여 저장되는 별도의 전역공간이 존재함

// 해당 전역공간에 이미 같은 인자값으로 전달된 심볼이 존재하면 그 심볼을 가져다 쓰고, 없으면 새로 생성함 
// 그렇기 때문에 아래값이 True 가 됨, 단 해당 값도 Primitive 값임 
a === b // true


// 활용 예제, Redux쪽에서 많이 씀 
const keys = ['ADD_TOD', 'DELETE_TODO'];
const Constants = {};
keys.forEach(v => {Constants[Symbol.for(v)] = v})

//표준 심볼