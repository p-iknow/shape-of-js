
const TRUE = {}, FALSE = {};

const Task = class {
	constructor(title, isComplted = false) {
		this.title = title;
		this.isComplted = false;
	}

	setTitle(title) {
		this.title = title;
		//return new Task(title, this.isComplted);
	}

	toggle() {
		this.isComplted = !this.isComplted;
		//return new Task(this.title, !this.isComplted);
	}

	getInfo() {
		// 외부에 정보를 제공할 때 값(일종의 스냅샷)으로 넘긴다. 객체로 넘기면 사용하는 시점과 넘기는 시정의 싱크가 다른다.
		return { title: this.title, isCompleted: this.isComplted };
	}

};

let isOk = true;
const task = new Task('test1');
isOk = task.getInfo().title == 'test1' && task.getInfo().isCompleted == false;
console.log('test1', isOk);

task.toggle();
isOk = task.getInfo().title == 'test1' && task.getInfo().isCompleted == true;
console.log('test2', isOk);
