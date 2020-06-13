import Task from './Task.js';
import { err } from './util.js';


const Folder = class {
	constructor(title) {
		this.title = title;
		this.tasks = new Set();
	}


	//addTask(title) {
	//	this.tasks.add(new Task(title));
	//}

	addTask(task) {
		if (!(task instanceof Task)) err('Invalid Task');
		this.tasks.add(task);
	}

	removeTask(task) {
		if (!(task instanceof Task)) err('Invalid Task');
		this.tasks.delete(task);
	}

	// 현재의 사본을 보내야 한다
	getTasks() {
		return [...this.tasks.values()];
	}

	getTitle() {
		return this.title;
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
