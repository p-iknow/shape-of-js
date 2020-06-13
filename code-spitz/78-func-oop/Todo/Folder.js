import Task from './Task.js';
import { err } from './util.js';


const Folder = class extends Set {
	static get(title) {
		return new Folder(title);
	}

	static load(json) {
		const folder = new Folder(json.title);
		json.tasks.forEach(task => {
			folder.addTask(Task.load(task))
		})
		return folder;
	}

	toJSON() {
		return { title: this.title, tasks: this.getTasks() };
	}

	constructor(title) {
		super();
		this.title = title;
	}

	addTask(task) {
		if (!(task instanceof Task)) err('Invalid Task');
		super.add(task);
	}

	removeTask(task) {
		if (!(task instanceof Task)) err('Invalid Task');
		super.delete(task);
	}

	//drag & drop 으로 구현한다고 가정하면 Src 로 부터 넘어온 Task 를 받아들이는 모양새가 된다.
	moveTask(task, folderSrc) {
		// 원래 내 task 를 나한테 넘기는 거 아니야?
		// 제어 흐름 까지 같이 넣어서 나중에 console 로 바뀌었을 때를 대비하기 위한 조치
		if (super.has(task) || !folderSrc.has(task)) return err('Invalid MoveTask');

		folderSrc.removeTask(task);
		this.addTask(task);
	}

	// 현재의 사본을 보내야 한다
	getTasks() {
		return [...super.values()];
	}

	getTitle() {
		return this.title;
	}
	// 내적 동질성의 원리
	add() {
		err('you can\'t use add, use foler.addTask')
	}
	delete() {
		err('you can\'t use delete, use foler.removeTaske')
	}
	clear() {
		err('you can\'t use clear')
	}
	values() {
		err('you can\'t use values, use folder.getTasks')
	}

};


(() => {
	let isOk = true;
	const task = new Task('task1');
	const folder = new Folder('folder1');

	isOk = folder.getTasks().length == 0;
	console.log('test1', isOk);

	folder.addTask(task);
	isOk = folder.getTasks().length == 1 && folder.getTasks()[0].getInfo().title == 'task1';
	console.log('test2', isOk);

	folder.addTask(task);
	isOk = folder.getTasks().length == 1 && folder.getTasks()[0].getInfo().title == 'task1';
	console.log('test3', isOk);
})

export default Folder;
