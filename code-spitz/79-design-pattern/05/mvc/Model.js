const Model = class extends Set {
	add() { throw 'overrided' }
	delete() { throw 'overrided' }
	has() { throw 'overrided' }
	constructor(prop) {
		super();
		this._prop = Object.assign(Object.create(null), prop);
	}
	listen() { throw 1; }
	// super 키워들 통해 본래 기본 add, delete 는 막고,
	// 다른 이름으로 부모의 set 메소드를 쓰도록 변환
	addListener(c) { super.add(c); }
	removeListener(c) { super.delete(c); }
	notify() {
		this.forEach(v => v.listen(this));
	}
};

export const Task = class extends Model {
	constructor(title) {
		super({ title, isComplete: false, list: [] });
	}
	listen() { this.notify(); }
	get title() { return this._prop.title; }
	get isComplete() { return this._prop.isComplete; }
	toggle() {
		this._prop.isComplete = !this._prop.isComplete;
		this.notify();
	}
	add(title) {
		const task = new Task(title);
		this._prop.list.push(task);
		task.addListener(this);
		this.notify();
		return task;
	}
	remove(task) {
		const list = this._prop.list;
		if (!list.includes(task)) return;
		list.splice(list.indexOf(task), 1);
		task.removeListener(this);
		this.notify();
	}
	list() {
		const list = this._prop.list.map(task => task.list());
		return { task: this, list };
	}

}
