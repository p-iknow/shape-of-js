// 1. 대체 가능성
// 2. 내적 일관성, 내적 동질성

const Parent = class {
	wrap() {
		this.action();
	}

	action() {
		console.log("Parent");
	}
};
const Child = class extends Parent {
	action() {
		console.log("Child");
	}
};

const child = new Child();
console.log(child instanceof Parent);

a.wrap(); // Child

// 프로토 타입 관점에서
// wrap 이 없으니 프로토타입을 타고 올라가서 부모의 wrap 이 호출됨
// 프로토타입을 타더라도 this.context는 여전하기 때문에 this 는 여전히 child 를 가르킴

// 대체 가능성, 내적 일관성, 동질성
// 템플릿 메소드가 성립하는 이유, 태생을 그대로 유지하려는 성격
