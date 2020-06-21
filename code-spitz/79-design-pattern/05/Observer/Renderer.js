import { TaskView } from "./TaskView.js";

const el = (tag, attr = {}) => Object.entries(attr).reduce((el, v) => {

	const attrKey = v[0];
	const attrValue = v[1];

	// innerHtml 은 property 니까 value 를 할당하고
	// appendChild 는 function 이니까 value 를 인자로 전달해서 실행시켜준다.

	typeof el[attrKey] == 'function' ? el[attrKey](attrValue) : (el[attrKey] = attrValue);
	return el;
}, document.createElement(tag));

export const Renderer = class {
	constructor(processor) {
		this.processor = processor;
	}
	render({ task, list }) {
		this.processor.folder(task);
		this.processor.parent(task);
		this.subTask(list);
	}
	subTask(list) {
		list.forEach(({ task, list }) => {
			this.processor.task(task);
			if (list.length === 0) return;
			else {
				this.processor.parent(task);
				this.subTask(list);
			}
		})
	}
}

Renderer.Processor = class {
	constructor() {
		this.prop = Object.create(null);
		this._taskView = TaskView.base;
	}
	taskView(...taskViews) {
		taskViews.forEach(taskView => this._taskView = taskView.set(this._taskView));
	}
	taskRender(task) {
		return this._taskView.task(this.prop.parentTask, task);
	}
	folder(task) {
		throw 'overrided';
	}
	parent(v, task) {
		throw 'overrided';
	}
	task(v, task) {
		throw 'overrided';
	}
}

export const Dom = class extends Renderer.Processor {
	constructor(parent) {
		super();
		this._p = parent;
		//this.taskView = TaskView.base;
	}
	folder({ _title: title }) {
		const parent = document.querySelector(this._p);
		parent.innerHTML = '';
		parent.appendChild(el('h1', { innerHTML: title }));
		this.prop.parent = parent;
	}
	parent(task) {
		const ul = el('ul');
		this.prop.parent.appendChild(ul);
		this.prop.parent = ul;
		this.prop.parentTask = task;

	}
	task(task) {
		const li = el('li', { innerHTML: `<div>${this.taskRender(task)}</div>` });
		//li.appendChild(el('div', { innerHTML: title }));
		this.prop.parent.appendChild(li);
		this.prop.parent = li;
	}
}

export const Console = class extends Renderer.Processor {
	constructor() {
		super();
	}
	folder({ _title: title }) {
		console.log('-----------------------');
		console.log('folder:', title);
	}
	parent() {
		if (this.prop.parent) {
			this.prop.parent = this.prop.parent + '-';
		} else {
			this.prop.parent = ' '
		}

	}
	task({ _title: title }) {
		console.log(this.prop.parent + title);
	}
}
