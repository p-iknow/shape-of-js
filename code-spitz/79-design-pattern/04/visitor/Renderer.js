const el = (tag, attr = {}) => Object.entries(attr).reduce((el, v) => {

	const attrKey = v[0];
	const attrValue = v[1];

	// innerHtml 은 property 니까 value 를 할당하고
	// appendChild 는 function 이니까 value 를 인자로 전달해서 실행시켜준다.

	typeof el[attrKey] == 'function' ? el[attrKey](attrValue) : (el[attrKey] = attrValue);
	return el;
}, document.createElement(tag));

const Renderer = class {
	render({ task, list }) {
		const v = this._folder(task);
		this.subTask(this._parent(v, task), list);
	}
	subTask(parent, list) {
		list.forEach(({ task, list }) => {
			const v = this._task(parent, task);
			if (list.length === 0) return;
			else {
				this.subTask(this._parent(v, this), list);
			}
		})
	}
	_folder(task) {
		throw 'overrided';
	}
	_parent(v, task) {
		throw 'overrided';
	}
	_task(v, task) {
		throw 'overrided';
	}
}

export const DomRenderer = class extends Renderer {
	constructor(parent) {
		super();
		this._p = parent;
	}
	_folder({ _title: title }) {
		const parent = document.querySelector(this._p);
		parent.innerHTML = '';
		parent.appendChild(el('h1', { innerHTML: title }));
		return parent;
	}
	_parent(v, _) {
		return v.appendChild(el('ul'));
	}
	_task(v, { _title: title }) {
		const li = v.appendChild(el('li'));
		li.appendChild(el('div', { innerHTML: title }));
		return li;
	}
}

export const ConsoleRenderer = class extends Renderer {
	constructor() {
		super();
	}
	_folder({ _title: title }) {
		console.log('-----------------------');
		console.log('folder:', title);
		return ' ';
	}
	_parent(v, list) {
		return v;
	}
	_task(v, { _title: title }) {
		console.log(v + title);
		return v + '-';
	}
}
