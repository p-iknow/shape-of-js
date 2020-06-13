import { err, el } from './util.js';
import Task from './Task.js';
import Folder from './Folder.js';
import App from './App.js';

const Renderer = class {
	constructor(app) {
		this.app = app;
	}
	render() {
		this._render();
	}
	_render() {
		err('must be overrided');
	}
};

const DomRenderer = class extends Renderer {
	constructor(parent, app) {
		super(app);
		this.$tasksMemory = [];

		const [$folders, $tasks] = Array.from(parent.querySelectorAll('ul'));
		this.$folders = $folders;
		this.$tasks = $tasks

		const [load, save] = Array.from(parent.querySelectorAll('button'));
		load.onclick = e => {
			const v = localStorage['todo'];
			if (v) {
				this.app = App.load(JSON.parse(v));
				this.render();
			}


		}
		save.onclick = e => {
			localStorage['todo'] = JSON.stringify(this.app)
		}


		this.currentFolder = null;
		parent.querySelector('nav>input').onkeyup = e => {

			if (!(e.code == "Enter")) return;
			const v = e.target.value.trim();
			if (!v) return;

			const folder = Folder.get(v);
			this.app.addFolder(folder);
			e.target.value = '';
			this.render();
		}


		parent.querySelector('header>input').onkeyup = e => {
			if (!this.currentFolder || !(e.code == "Enter")) return;
			const v = e.target.value.trim();
			if (!v) return;

			const task = Task.get(v);
			this.currentFolder.addTask(task);
			e.target.value = '';
			this.render();
		}
	}

	_render() {
		const folders = this.app.getFolders();
		if (!this.currentFolder) this.currentFolder = folders[0];

		let $moveTask;
		let $oldFolder = this.$folders.firstElementChild;
		let $lastFolder;

		folders.forEach(folder => {
			let $folder;
			if ($oldFolder) {
				$folder = $oldFolder;
				$oldFolder = $oldFolder.nextElementSibling;
			} else {
				$folder = el('li')
				this.$folders.appendChild($folder);
			}
			$lastFolder = $folder;

			$folder.innerHTML = folder.getTitle();
			// 현재의 나의 currnt 와 일치하면
			$folder.style.cssText = `
				font-size: ${this.currentFolder == folder ? '20px' : '12px'};
			`
			$folder.onclick = () => {
				this.currentFolder = folder;
				this.render();
			};
			$folder.ondrop = e => {
				e.preventDefault();
				folder.moveTask($moveTask, this.currentFolder);
				this.render();
			};

			// drag & drop 할 때 항상 받는쪽에서 dragover 이벤트에 e.preventDefault 를 등록해야 drop 이벤트가 발생한다
			$folder.ondragover = e => {
				e.preventDefault();
			};
		})

		if ($lastFolder) while ($oldFolder = $lastFolder.nextElementSibling) {
			this.folder.removeChild($oldFolder);
		}

		// tasks
		if (!this.currentFolder) return;

		let tasks = this.currentFolder.getTasks();
		let $oldTask;
		let $lastTask = null;

		if (tasks.length == 0) {
			while ($oldTask = this.$tasks.firstElementChild) {
				this.$tasks.removeChild($oldTask);
				this.$tasksMemory.push($oldTask);
			}
		} else {
			$oldTask = this.$tasks.firstElementChild;

			this.currentFolder.getTasks().forEach(task => {
				let $task;
				if ($oldTask) {
					$task = $oldTask;
					$oldTask = $oldTask.nextElementSibling;
				} else {
					$task = this.$tasksMemory.length ? this.$tasksMemory.pop() : el('li');
					this.$tasks.appendChild($task);
				}
				$lastTask = $task;
				const { title, isCompleted } = task.getInfo();
				$task.setAttribute('draggable', true);
				$task.innerHTML = `${isCompleted ? 'o' : 'x'} ${title}`;
				$task.ondragstart = e => {

					// closure 를 이용하기
					$moveTask = task;
				}
				$task.onclick = e => {
					task.toggle();
					this.render();
				}

			})

			if ($lastTask) {
				while ($oldTask = $lastTask.nextElementSibling) {
					this.$tasks.removeChild($oldTask);
					this.$tasksMemory.push($oldTask);
				}
			}
		}
	}
}


new DomRenderer(document.querySelector('main'), new App());


//const [folderInput, taskInput] = Array.from(document.querySelectorAll('input'))

//folderInput.value = "할일1";

//const event = new KeyboardEvent('keyup', {
//	key: 'Enter',
//	code: 'Enter'
//});

//const make = input => title => {
//	input.value = title;
//	input.dispatchEvent(event)
//}

//const makeFolder = make(folderInput);
//const makeTask = make(taskInput);

//makeFolder('할일')
//makeFolder('할일1')
//makeFolder('할일2')
//makeFolder('할일3')

//makeTask('수똥이랑 놀기')
//makeTask('수똥이랑 공부하기')
//makeTask('수똥이랑 밥먹기')

//const [folder1, folder2, folder3, folder4] = Array.from(document.querySelectorAll('nav > ul > li'));

//folder2.click();

//makeTask('수똥이랑 놀러가기')
//makeTask('수똥이랑 쇼핑하기')
//makeTask('수똥이랑 물먹기')
