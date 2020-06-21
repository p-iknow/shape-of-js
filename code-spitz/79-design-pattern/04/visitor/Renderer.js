const el = (tag, attr = {}) => Object.entries(attr).reduce((el, v) => {

	const attrKey = v[0];
	const attrValue = v[1];

	// innerHtml 은 property 니까 value 를 할당하고
	// appendChild 는 function 이니까 value 를 인자로 전달해서 실행시켜준다.

	typeof el[attrKey] == 'function' ? el[attrKey](attrValue) : (el[attrKey] = attrValue);
	return el;
}, document.createElement(tag));

export const Renderer = class {
	constructor(visitor) {
		this.visitor = visitor;
	}
	render({ task, list }) {
		const v = this.visitor.folder(task);
		this.subTask(this.visitor.parent(v, task), list);
	}
	subTask(parent, list) {
		list.forEach(({ task, list }) => {
			const v = this.visitor.task(parent, task);
			if (list.length === 0) return;
			else {
				this.subTask(this.visitor.parent(v, this), list);
			}
		})
	}
}

const Visitor = class {
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

export const DomVisitor = class extends Visitor {
	constructor(parent) {
		super();
		this._p = parent;
	}
	folder({ _title: title }) {
		const parent = document.querySelector(this._p);
		parent.innerHTML = '';
		parent.appendChild(el('h1', { innerHTML: title }));
		return parent;
	}
	parent(v, _) {
		return v.appendChild(el('ul'));
	}
	task(v, { _title: title }) {
		const li = v.appendChild(el('li'));
		li.appendChild(el('div', { innerHTML: title }));
		return li;
	}
}

export const ConsoleVisitor = class extends Visitor {
	constructor() {
		super();
	}
	folder({ _title: title }) {
		console.log('-----------------------');
		console.log('folder:', title);
		return ' ';
	}
	parent(v, list) {
		return v;
	}
	task(v, { _title: title }) {
		console.log(v + title);
		return v + '-';
	}
}
