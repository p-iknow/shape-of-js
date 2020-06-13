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
		// body 에서 딱 한번만 나올 수 있는 tag
		this.el = parent.appendChild(el('main'));
		this.el.innerHTML = `
			<nav>
				<input type="text"/>
				<ul></ul>
			</nav>
			<section>
				<header>
					<h2></h2>
					<input type="text"/>
				</header>
				<ul></ul>
			</section>
		`;

		this.el.querySelector('nav').style.cssText = `
			border-rigth: 1px solid #000;
			float: left;
			width: 200px;
		` ;

		this.el.querySelector('section').style.cssText = `
			margin-left: 210px;
		` ;

		const ul = this.el.querySelectorAll('ul');
		this.folder = ul[0];
		this.tasks = ul[1];
		this.currentFolder = null;

		const input = this.el.querySelectorAll('input');

		input[0].addEventListener("keyup", e => {
			if (!(e.keyCode == "13")) return;
			const v = e.target.value.trim();
			if (!v) return;

			const folder = new Folder(v);
			this.app.addFolder(folder);
			e.target.value = '';
			this.render();
		})


		input[1].addEventListener("keyup", e => {
			if (!this.currentFolder || !(e.keyCode == "13")) return;
			const v = e.target.value.trim();
			if (!v) return;

			const task = new Task(v);
			this.currentFolder.addTask(task);
			e.target.value = '';
			this.render();
		})
	}

	_render() {
		const folders = this.app.getFolders();
		if (!this.currentFolder) this.currentFolder = folders[0];

		this.folder.innerHTML = '';
		folders.forEach(folder => {
			const li = el('li');
			li.innerHTML = folder.getTitle();
			// 현재의 나의 currnt 와 일치하면
			li.style.cssText = `
				font-size: ${this.currentFolder == folder ? '20px' : '12px'};
			`
			li.addEventListener('click', () => {
				this.currentFolder = folder;
				this.render();
			})
			this.folder.appendChild(li);
		})

		if (!this.currentFolder) return;

		this.tasks.innerHTML = '';
		this.currentFolder.getTasks().forEach(task => {
			const li = el('li');
			const { title, isCompleted } = task.getInfo();

			li.innerHTML = `${isCompleted ? 'o' : 'x'} ${title}`;
			li.addEventListener('click', () => {
				task.toggle();
				this.render();
			})
			this.tasks.appendChild(li);
		})


	}


}


new DomRenderer(document.body, new App());
